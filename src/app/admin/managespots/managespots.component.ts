import { ChangeDetectorRef, Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Firestore, doc } from 'firebase/firestore';
import { finalize, map } from 'rxjs';
import { FireServiceService } from 'src/app/services/fire-service.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { FileuploadService } from 'src/app/services/fileupload.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { TypesenseService } from 'src/app/services/typesense.service';

@Component({
  selector: 'app-managespots',
  templateUrl: './managespots.component.html',
  styleUrls: ['./managespots.component.css', '../../../assets/css/adminPages.css', '../../../assets/css/homePages.css', '../../../assets/css/adminPages1.css']
})
export class ManagespotsComponent {
  isModalOpen = false;
  popups:any;
  placeName:any;
  city:any;
  category:any;
  status:any;
  description:any = null;
  photo:any;
  destList:any;
  archivedList:any;

  batangasCities = [
    {name: 'Agoncillo'},
    {name: 'Alitagtag'},
    {name: 'Balayan'},
    {name: 'Balete'},
    {name: 'Batangas City'},
    {name: 'Bauan'},
    {name: 'Calaca'},
    {name: 'Calatagan'},
    {name: 'Cuenca'},
    {name: 'Ibaan'},
    {name: 'Laurel'},
    {name: 'Lemery'},
    {name: 'Lian'},
    {name: 'Lipa'},
    {name: 'Lobo'},
    {name: 'Mabini'},
    {name: 'Malvar'},
    {name: 'Mataasnakahoy'},
    {name: 'Nasugbu'},
    {name: 'Padre Garcia'},
    {name: 'Rosario'},
    {name: 'San Jose'},
    {name: 'San Juan'},
    {name: 'San Luis'},
    {name: 'San Nicolas'},
    {name: 'San Pascual'},
    {name: 'Santa Teresita'},
    {name: 'Santo Tomas'},
    {name: 'Taal'},
    {name: 'Talisay'},
    {name: 'Tanauan'},
    {name: 'Taysan'},
    {name: 'Tingloy'},
    {name: 'Tuy'},
  ]

  constructor(
    public fireService:FireServiceService,
    public router:Router,
    public firestore:AngularFirestore,
    public load:LoaderService,
    public uploadService:FileuploadService,
    public storage: AngularFireStorage,
    public typesense:TypesenseService,
    public changeDetector: ChangeDetectorRef,){
      this.retrieveDestinations();
      this.retrieveArchived();
  }

  handleNavigationClick(event:any) {
    const targetId = event.target.getAttribute("data-section");
    if (targetId) {
        this.showSection(targetId);

        // Remove the "active" class from all navigation links
        this.navigationLinks.forEach((link:any) => {
            link.classList.remove("active");
        });

        // Add the "active" class to the clicked link
        event.target.classList.add("active");
    }
  }

  searchResults:any;
  showResults:boolean = false;
  estNameList: string[] = []; 
  searchRaw:any;
  search:any;
  estCityList: string[] = [];

  searchSpot(){
    this.showResults = true;
    this.estNameList = [];
    this.estCityList = [];
    this.typesense.searchEst(this.search)
      .then((res) => {
        if(res){
          /* console.log(res); */
          this.destList = res;
        }else{
          console.log("undefined res")
        }
       
      })
      .catch((err:any) => {
        
      });
  }

  showSection(sectionId:any) {
    const sections = document.querySelectorAll(".content-section");
    
    sections.forEach((section) => {
      if(section instanceof HTMLElement){
        section.style.display = "none";
      }
    });

    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = "block";
    }

  }

  navigationLinks:any;
  zoomedImg:any;
  modal:any;
  photos:any;

  ngAfterViewInit(){
     
   }

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

  async photoData(image:any, blob:any, tspotData:any){
    try{
      const url = await this.uploadImage(tspotData,blob,image);
    } catch(e) {
      console.log(e);
    }
  }
  
  async uploadImage(tspotData:any, blob: any, imageData:any) {
    try { 
      const currentDate = Date.now();
      const filePath = 'tspotImages/' + currentDate +'.'+ imageData.format;
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
            tspotData.photo = downloadURL;
            this.uploadService.saveTspotPhoto(tspotData);
            this.load.closeLoadingDialog();
          });
        })
      ).subscribe();
      console.log('task: ', task);
    } catch (e) {
      throw(e);
    } 
  }
  

  uploadData(){
    let tourismData = {
      tourismID:this.firestore.createId(),
      estName:this.placeName,
      city:this.city,
      category:this.category,
      desc:this.description,
      photo:"No Photo Yet"
    }
    let counter = 0;

    for(var key in this.destList){
      if(tourismData.estName.toUpperCase() === this.destList[key].estName.toUpperCase()){
        counter++;
        /* console.log(tourismData.estName.toUpperCase() + this.destList[key].estName.toUpperCase()); */
      }
    }
    
    if(counter == 0){
      this.fireService.saveTouristDestion(tourismData).then(
        res=>{
          
          alert("Successfully Added.");
          this.photoData(this.pic, this.blob, tourismData);
          //updates the counter
          this.fireService.getDocumentCounter().then((doc)=>{
            if(doc){
              /* this.newNum = 1 + doc.tspots;
              let data = {
                recent_users:doc.recent_users,
                tspots : this.newNum,
                users:doc.users,
                posts:doc.posts
              } */
              doc.tspots++;
              switch(tourismData.category){
                case "Nature":
                  doc.nature++;
                  break;
                case "Cultural":
                  doc.cultural++;
                  break;
                case "Industrial":
                  doc.industrial++;
                  break;
                case "Sun and Beach":
                  doc.sab++;
                  break;
                case "Leisure and Entertainment":
                  doc.leisure++;
                  break;
                case "MICE":
                  doc.conventions++;
                  break;
                case "Health and Wellness":
                  doc.health++;
                  break;
              }
              
              this.fireService.updateCount(doc).catch(err => {console.error(err)});
            }
          });

          if(this.addM){
            this.resetAdd();
          }else{
            this.closeAdd();
            this.resetAdd();
          }
          
        }, err=>{
          alert(err.message);
          console.log(err);
        }
      );
    }else{
      /* console.log(counter); */
      
      alert("The Name of the Place already exists.")
    }
    
    
  }

  resetAdd(){
    this.placeName = '';
    this.city = '';
    this.category = '';
    this.status = '';
    this.description = '';
  }

  addOne(){
    var addPopUp = document.querySelector("#addPopUp");
    (addPopUp as HTMLElement).style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  addM = false;

  addMany(){
    var addPopUp = document.querySelector("#addPopUp");
    (addPopUp as HTMLElement).style.display = 'block';
    document.body.style.overflow = 'hidden';
    this.addM = true;
  }

  closeAdd(){
    var closeButtons = document.querySelector('.close');
    var viewPopUp = document.querySelector("#addPopUp");
    (viewPopUp as HTMLElement).style.display = 'none';
    document.body.style.overflow = 'auto';
    this.addM = false;
  }

  tspotView:any;
  viewSpot(data:any){
    var popups = document.querySelectorAll('.popup'); 
    var viewPopUp = document.querySelector("#viewPopUp");
    (viewPopUp as HTMLElement).style.display = 'block';
    document.body.style.overflow = 'hidden';
    this.tspotView = data;
  }

  editData:any;
  editTspot(dest:any){
    var viewPopUp = document.querySelector("#editPopUp");
    (viewPopUp as HTMLElement).style.display = 'block';
    document.body.style.overflow = 'hidden';
    this.chosenPic = dest.photo;
    this.editData = dest;
  }

  editTData(){
    this.load.openLoadingDialog();
    this.fireService.updateDocument("tourist_spots", this.editData.tourismID, this.editData).then(() => {
      this.photoData(this.pic, this.blob, this.editData);
      this.load.closeLoadingDialog();
      alert("Updated Successfully");
      this.closeEdit();
    }).catch(err => {
      console.error(err);
    })
  }

  archiveTspot(data:any){
    this.load.openLoadingDialog();
    this.fireService.moveDocumentToNewCollection("tourist_spots", "archived_tourist_spots", data.tourismID);
  }

  retrieveTspot(data:any){
    this.load.openLoadingDialog();
    this.fireService.moveDocumentToNewCollection("archived_tourist_spots","tourist_spots", data.tourismID);
  }

  async featureTspot(data:any){
    this.load.openLoadingDialog();
    try {
      await this.fireService.copyDocumentWithAdditionalFields(
        'tourist_spots',
        data.tourismID,
        'featured_spots'
      );
      this.load.closeLoadingDialog();
    } catch (error) {
      // Handle errors
    }
  }

  closeEdit(){
    var closeButtons = document.querySelector('.close');
    var viewPopUp = document.querySelector("#editPopUp");
    (viewPopUp as HTMLElement).style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  closeView(){
    var closeButtons = document.querySelector('.close');
    var viewPopUp = document.querySelector("#viewPopUp");
    (viewPopUp as HTMLElement).style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  

  newNum:any;
  list:any;

  ngOnInit(){
    this.list = document.querySelectorAll(".navigation li");
    this.list[3].classList.add("hovered");
    this.showSection("blogs");
    
  }

  retrieveDestinations(){
    this.fireService.getAllTouristDestinations().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.destList = data;
    });

  }

  retrieveArchived(){
    this.fireService.getArchivedDestinations().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.archivedList = data;
    });

  }
}


