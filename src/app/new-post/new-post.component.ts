import { ChangeDetectorRef, Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { FireServiceService } from '../services/fire-service.service';
import { Router } from '@angular/router';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { TypesenseService } from '../services/typesense.service';
import { FileuploadService } from '../services/fileupload.service';
import { FirebaseStorage, getDownloadURL, uploadBytes } from '@angular/fire/storage';
import { ref } from 'firebase/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { finalize, map } from 'rxjs/operators';
import { FileUpload } from '../models/FileUpload';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoaderService } from '../services/loader.service';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css','../../assets/css/homePages.css']
})
export class NewPostComponent {


  //Children
  @ViewChild(GoogleMap, { static: false }) addMap!: GoogleMap;
  @ViewChild(MapMarker, {static: false}) mapMarker!: MapMarker;

  //Variables
  popups:any;
  center: google.maps.LatLngLiteral = {
    lat: 13.7565,
    lng: 121.0583
  };
  zoom = 10;
  display: any;



  //FIRESERVICE VARIABLES
  post_title:any;
  tourist_spot:any;
  post_body:any;
  rating:any;
  day:any;
  month:any;
  year:any;
  time:any;
  currentUser:any;
  photo:any;
  tspot:any;
  search:any;
  searchResults:any;
  showResults:boolean = false;
  estNameList: string[] = []; 
  searchRaw:any;
  estCityList: string[] = [];
  city:any;
  btnUpPhoto:any;
  minutes:any;

  //Default Functions

  constructor(
    public fireService:FireServiceService,
    public router:Router,
    public typesense:TypesenseService,
    public changeDetector: ChangeDetectorRef,
    private renderer: Renderer2,
    private el:ElementRef,
    public uploadService: FileuploadService,
    public storage: AngularFireStorage,
    public firestore: AngularFirestore, 
    public load: LoaderService
  ){

  }

  ngOnInit(){
    
  }

  
  ngAfterViewInit(){
    var addMap = document.getElementById("addMap");
    var addMarker = document.getElementById("mapMark");

  }

  touristData:any;
  postData:any;

  userCheck(){
    this.load.openLoadingDialog();
    this.currentUser = this.fireService.getCurrentUser();
    console.log(this.currentUser);
    if(this.currentUser == null){
      alert("User must be logged in to be able to post");
      this.router.navigate(['login']);
    }else{
      //console.log(this.currentUser.uid);
      this.fireService.getUnameFromID(this.currentUser.uid).then((res)=>{
        
        this.savePost(res.uname);
      })
      
    }
    
  }



  savePost(uname:any){
    var dateNow = new Date();
    var hour = dateNow.getHours();
    var minutes = dateNow.getMinutes();
    var year = dateNow.getFullYear();
    var date = dateNow.getDate();
    var month = dateNow.getMonth();
    this.fireService.getTspotDocument(this.search)
      .then((doc)=>{
        this.touristData = doc;
        console.log(this.touristData);
        
            this.postData = {
              postID:this.firestore.createId(),
              title:this.post_title,
              location:this.tspot,
              body:this.post_body,
              rating:this.rating,
              user: uname,
              hour: hour,
              mins: minutes,
              date: date,
              month: month,
              year: year,
              tspotID: this.touristData.tourismID,
              category: this.touristData.category,
              coords: this.center,
              views: 0
            }
          
        
        
        this.fireService.addOneUserProfilePost(uname);
        this.postCont();
        console.log(this.postData);
      }).catch(err => {
        this.load.closeLoadingDialog();
        alert(err);
      });

  }

  newNum:any;


  postCont(){
    this.fireService.savePost(this.postData).then(
      res=>{
        console.log(res);
        this.photoData(this.pic, this.blob, this.postData.postID);
        this.upload(this.postData);
        
        //updates the counter
        this.fireService.getDocumentCounter().then((doc)=>{
          if(doc){
            /* this.newNum = 1 + doc.posts;
            let data = {
              recent_users:doc.recent_users,
              tspots : doc.tspots,
              users:doc.users,
              posts: this.newNum
            } */
            doc.posts++;
            this.fireService.updateCount(doc);
            
          }
        });
        
      }, err=>{
        alert(err.message);
        console.log(err);
        this.load.closeLoadingDialog();
      }
    );
  }






  //File Upload Methods//



  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

  upload(data:any): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.uploadPostPhoto(this.currentFileUpload, data).subscribe(
          percentage => {
           
            /* this.percentage = Math.round(percentage ? percentage : 0); */
          },
          error => {
            this.load.closeLoadingDialog();
            console.log(error);
          }
        );
      }
    }
  }

currentFileUpload?: FileUpload;
selectedFiles?:FileList;
blob:any;
pic:any;
image:any;

chosenPic:any;
async takePicture() {
  try {
    
    if(Capacitor.getPlatform() !='web') await Camera.requestPermissions();
    this.pic = await Camera.getPhoto({
      quality: 90,
      //allowEditing:false,
      source:CameraSource.Photos,
      width:600,
      resultType:CameraResultType.DataUrl
    });
    
    
    this.image=this.pic.dataUrl;
    this.chosenPic = this.image;
    this.blob=this.dataURLtoBlob(this.pic.dataUrl);

    
  } catch(e) {
    console.log(e);
  } 
}

dataURLtoBlob(dataurl:any) {
  var arr = dataurl.split(','), mime=arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n= bstr.length, u8arr =new Uint8Array(n);
  while(n--){
      u8arr[n]=bstr.charCodeAt(n);
  }
  return new Blob([u8arr],{type:mime});
}

async photoData(image:any, blob:any, est_id:any){
  try{
    const url = await this.uploadImage(est_id,blob,image);
  } catch(e) {
    console.log(e);
  }
}

async uploadImage(postID:any, blob: any, imageData:any) {
  try { 
    const currentDate = Date.now();
    const filePath = 'postImages/' + currentDate +'.'+ imageData.format;
    const fileRef =  this.storage.ref(filePath);
    const task = this.storage.upload(filePath, blob);
    let photoData = {
      imageUrl:'',
      postID:'',
      uploadTime: currentDate,
    };
    
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((downloadURL:any) => {
          photoData.imageUrl = downloadURL;
          photoData.postID = postID;
          this.uploadService.savePhoto(photoData);
          this.load.closeLoadingDialog();
          alert("Posted Successfully.");
          this.router.navigate(['home']);
        });
      })
    ).subscribe();
    console.log('task: ', task);
  } catch (e) {
    throw(e);
  } 
}


//EO Upload Functions






  //Maps Functions


  moveMap(event: google.maps.MapMouseEvent) {

    if (event.latLng != null) this.center = (event.latLng.toJSON());

  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }


  //End of Map Functions

  searchSpot(){
    this.showResults = true;
    this.estNameList = [];
    this.estCityList = [];
    this.typesense.searchEst(this.search)
      .then((res) => {
        if(res){
          console.log(res);
          
          for(var k in res){
           this.estNameList.push(res[k].estName);
           this.estCityList.push(res[k].city);
          }
        }else{
          console.log("undefined res")
        }
       
      })
      .catch((err:any) => {
        
      });
  }

  selectResult(result: string, i:number) {
    console.log(result);
    this.search = result; // Set the input value to the selected result
    this.showResults = false; // Hide the results
    this.city = this.estCityList[i];
    this.tspot = result + ", " + this.city;
    for(var x in this.batangasCities){
      if(this.city == this.batangasCities[x].name){
        let newCenter: google.maps.LatLngLiteral = {
          lat: this.batangasCities[x].lat,
          lng: this.batangasCities[x].lng
        };
        //this.addMap.panTo(newCenter);
        this.center = newCenter;
        this.mapMarker.marker?.setPosition(newCenter);
        this.zoom = 13;
      }
    }
    
    // You can also perform additional actions based on the selected result.
  }

  loseFocus(){
    this.showResults = false;
  }

  gainFocus(){
    this.showResults = true;
  }
  

  //nested collections
  photos:any;
  comments:any;

  
  

  

  @ViewChild('textArea') textArea!: ElementRef;

  formatText(format: string) {
    const textarea: HTMLTextAreaElement = this.textArea.nativeElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    // Apply formatting based on 'format' parameter
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `<strong>${selectedText}</strong>`;
        break;
      case 'italic':
        formattedText = `<em>${selectedText}</em>`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
    }

    // Replace the selected text with the formatted text
    this.post_body = this.post_body.slice(0, start) + formattedText + this.post_body.slice(end);
  }

 

  textHistory: string[] = []; // Store text history
  currentIndex: number = -1; // Current position in text history

  
  @HostListener('window:keydown.control.z', ['$event'])
  onCtrlZ(event: KeyboardEvent) {
    event.preventDefault(); // Prevent the default browser undo behavior
    this.undo();
  }

  undo() {
    if (this.currentIndex > 0) {
        // Decrement the currentIndex
        this.currentIndex--;

        // Set the text to the previous state in history
        this.post_body = this.textHistory[this.currentIndex];
      }
    }

    plainText: string = '';
    formattedText: string = '';


    // This method is called whenever the text changes
    onTextChanged() {
      // Update the text history with the current text
      this.textHistory.push(this.post_body);
      // Update the currentIndex to the latest history position
      this.currentIndex = this.textHistory.length - 1;
    }


    batangasCities = [
      {
        name: 'Agoncillo',
        lat: 13.91524,
        lng: 120.918746
      },
      {
        name: 'Alitagtag',
        lat: 13.8721,
        lng: 121.0220
      },
      {
        name: 'Balayan',
        lat: 13.9376,
        lng: 120.7005
      },
      {
        name: 'Balete',
        lat: 14.0092,
        lng: 121.1080
      },
      {
        name: 'Batangas City',
        lat: 13.7565,
        lng: 121.0583
      },
      {
        name: 'Bauan',
        lat: 13.7963,
        lng:  120.9762
      },
      {
        name: 'Calaca',
        lat: 13.9509,
        lng: 120.8269
      },
      {
        name: 'Calatagan',
        lat: 13.8646,
        lng: 120.6315
      },
      {
        name: 'Cuenca',
        lat: 13.9041,
        lng: 121.0507
      },
      {
        name: 'Ibaan',
        lat: 13.8220,
        lng: 121.1341
      },
      {
        name: 'Laurel',
        lat: 14.0530,
        lng: 120.9073
      },
      {
        name: 'Lemery',
        lat: 13.9532,
        lng: 120.8843
      },
      {
        name: 'Lian',
        lat: 13.9852,
        lng: 120.6545
      },
      {
        name: 'Lipa',
        lat: 13.9419,
        lng: 121.1644
      },
      {
        name: 'Lobo',
        lat: 13.6750,
        lng: 121.2401
      },
      {
        name: 'Mabini',
        lat: 13.7236,
        lng: 120.9073
      },
      {
        name: 'Malvar',
        lat: 14.0433,
        lng: 121.1587
      },
      {
        name: 'Mataasnakahoy',
        lat: 13.9800,
        lng: 121.0966
      },
      {
        name: 'Nasugbu',
        lat: 14.0940,
        lng: 120.6890
      },
      {
        name: 'Padre Garcia',
        lat: 13.8777,
        lng: 121.2444
      },
      {
        name: 'Rosario',
        lat: 13.8162,
        lng: 121.2741
      },
      {
        name: 'San Jose',
        lat: 13.8831,
        lng: 121.0908
      },
      {
        name: 'San Juan',
        lat: 13.7504,
        lng: 121.3770
      },
      {
        name: 'San Luis',
        lat: 13.8406,
        lng: 120.9532
      },
      {
        name: 'San Nicolas',
        lat: 13.9652,
        lng: 120.9819
      },
      {
        name: 'San Pascual',
        lat: 13.8104,
        lng: 121.0220
      },
      {
        name: 'Santa Teresita',
        lat: 13.8742,
        lng: 120.9704
      },
      {
        name: 'Santo Tomas',
        lat: 14.1262,
        lng: 121.1383
      },
      {
        name: 'Taal',
        lat: 13.8893,
        lng: 120.9360
      },
      {
        name: 'Talisay',
        lat: 14.0487,
        lng: 121.0106
      },
      {
        name: 'Tanauan',
        lat: 14.0835,
        lng:  121.1476
      },
      {
        name: 'Taysan',
        lat: 13.7611,
        lng: 121.2283
      },
      {
        name: 'Tingloy',
        lat: 13.6606,
        lng: 120.8717
      },
      {
        name: 'Tuy',
        lat: 14.0221,
        lng: 120.7284
      }
    ]


}

export interface SearchResult {
  document: {
    estName: string;
    city:string
    // Add other properties if they exist
  };
  // Add other properties if they exist



  

}
