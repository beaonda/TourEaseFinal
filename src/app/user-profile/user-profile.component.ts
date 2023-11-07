import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FireServiceService } from '../services/fire-service.service';
import { FileuploadService } from '../services/fileupload.service';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FileUpload } from '../models/FileUpload';
import { LoaderService } from '../services/loader.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css', './user-profile.component1.css', '../../assets/css/homePages.css', '../../assets/css/homePages1.css', '../../assets/css/homePages2.css', '../../assets/css/homePages3.css', '../../assets/css/homePages4.css', '../../assets/css/homePages5.css', '../../assets/css/homePages6.css', '../../assets/css/homePages7.css', '../../assets/css/homePages8.css', '../../assets/css/homePages9.css','../../assets/css/variables.css']
})
export class UserProfileComponent {

  user:any;
  sameUser:boolean = false;
  edit_uname:any;
  edit_bio:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireservice: FireServiceService,
    public uploadService: FileuploadService,
    public storage: AngularFireStorage,
    public load: LoaderService
    ) { 
      this.load.openLoadingDialog();
    }

    currentFileUpload?: FileUpload;
    selectedFiles?:FileList;
    blob:any;
    profileBlob:any;
    coverBlob:any;
    pic:any;
    profilePic:any;
    coverPic:any;
    image:any;

    chosenPic:any;
    type:any;

    async takePicture(type:any) {
      try {   
        if(type == 'pfp'){
         
          if(Capacitor.getPlatform() !='web') await Camera.requestPermissions();
          this.profilePic = await Camera.getPhoto({
            quality: 90,
            source:CameraSource.Photos,
            width:600,
            resultType:CameraResultType.DataUrl
          });
          console.log("pfp");
          this.user.profile_photo = this.profilePic.dataUrl;
          this.type = type;
          this.profileBlob=this.dataURLtoBlob(this.profilePic.dataUrl);
        }else if(type == 'cover'){
         
          if(Capacitor.getPlatform() !='web') await Camera.requestPermissions();
          this.coverPic = await Camera.getPhoto({
            quality: 90,
            //allowEditing:false,
            source:CameraSource.Photos,
            width:600,
            resultType:CameraResultType.DataUrl
          });
          console.log("cover");
          this.user.cover_photo = this.coverPic.dataUrl;
          this.type = type;
          this.coverBlob=this.dataURLtoBlob(this.coverPic.dataUrl);
        }else{
          console.log("none");
        }
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
    
    async photoData(image:any, blob:any){
      try{
        const url = await this.uploadImage(blob,image);
      } catch(e) {
        console.log(e);
      }
    }
    
    async uploadImage( blob: any, imageData:any) {
      try { 

        if(this.type == "pfp"){
          const currentDate = Date.now();
          const filePath = 'profile_pictures/' + currentDate +'.'+ imageData.format;
          const fileRef =  this.storage.ref(filePath);
          const task = this.storage.upload(filePath, blob);
          
          task.snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((downloadURL:any) => {
                this.user.profile_photo = downloadURL;
                this.uploadService.saveProfilePhoto(this.user);
                this.load.closeLoadingDialog();
                alert("Saved Successfully.");
                this.showSettings = false;
              });
            })
          ).subscribe();
          console.log('task: ', task);
        }else if(this.type = "cover"){
          const currentDate = Date.now();
          const filePath = 'cover_photos/' + currentDate +'.'+ imageData.format;
          const fileRef =  this.storage.ref(filePath);
          const task = this.storage.upload(filePath, blob);
          
          task.snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((downloadURL:any) => {
                this.user.cover_photo = downloadURL;
                this.uploadService.saveProfilePhoto(this.user);
                this.load.closeLoadingDialog();
                alert("Saved Successfully.");
                this.showSettings = false;
              });
            })
          ).subscribe();
          console.log('task: ', task);
        }
        
      } catch (e) {
        throw(e);
      } 
    }

    showSettings:boolean = false;
  goToSettings() {
      this.showSettings = !this.showSettings;
  }

  truncateString(inputString: string, maxLength: number): string {
    if (inputString.length <= maxLength) {
      return inputString;
    } else {
      return inputString.substring(0, maxLength);
    }
  }



  nextPage(postID:string){
    this.router.navigate(['/view', postID]);
  }

  getUser(){
    this.fireservice.getUnameExisting(this.uname).then(doc => {
      this.user = doc;
      if(this.user.profile_photo == "Not Yet Available"){
        this.user.profile_photo = "../../assets/img/profilepic.png";
      }
      if(this.user.cover_photo == "Not Yet Available"){
        this.user.cover_photo = "../../assets/img/coverpic.png";
      }
      this.currentUser = this.fireservice.getCurrentUser();
      if(this.user.uid == this.currentUser.uid){
        console.log("Same User");
        
        this.sameUser = true;

      }else{
        //Add Profile Visits
        this.fireservice.addOneUserProfileVisit(this.uname);
      }
      console.log(doc);
    }).catch(err => {
      console.log(err);
    });
  }
  postList:any[] = [];
  photoList:any[] = [];
  getPosts(){
    this.fireservice.getUserPosts(this.uname).then((list) =>{
      var i = 0;
      for(var k in list){
        this.postList.push(list[k].data());
        var postID = this.postList[i].postID;
        this.fireservice.getPhotoDocument(postID).then(doc =>{
            this.photoList.push(doc.imageUrl);
            console.log(this.photoList);
        }).catch(err => {
          console.log(err);
        });
        i++;
      }
    
      console.log(this.postList);
    }).catch(err =>{
      console.error(err);
    })
  }

  saveChanges(){
    this.load.openLoadingDialog();
    if(this.profilePic){
      this.photoData(this.profilePic, this.profileBlob);
    }
    if(this.coverPic){
      this.photoData(this.coverPic, this.coverBlob);
    }
    if(this.edit_bio){
      console.log(this.user.bio);
      console.log(this.edit_bio);
      this.user.bio = this.edit_bio;
      this.uploadService.saveProfilePhoto(this.user).then(res => {
        this.load.closeLoadingDialog();
        alert("Updated Successfully");
        this.showSettings = false;
      });
    }
   
  }

  activeSection: string | null = null;

  showSection(sectionId:any) {
    const sections = document.querySelectorAll(".content-section");
    this.navigationLinks.forEach((link:any) => {
      link.classList.remove("active");
    });

    this.activeSection = sectionId;

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

  galleryPhotos:any[] = [];
  getGallery(){
    this.fireservice.getUserPhotos(this.uname).then((doc:any) =>{
      var i = 0;
      for(var k in doc){
        this.galleryPhotos.push(doc[k].data());
 
      }
    }).catch(err => {
      console.log(err);
    });
  }



 ngAfterViewInit(){
  this.showSection("blogs");
  this.navigationLinks[0].classList.add("active"); 
 }
 uname:any;
 currentUser:any;


 everythingLoaded:boolean = false;
  ngOnInit(){ 
    const intervalId = setInterval(() => {
      if(
        this.postList.length > 0 &&
        this.photoList.length > 0 &&
        this.user
        ){
          this.everythingLoaded = true;
          this.load.closeLoadingDialog();
          clearInterval(intervalId);
          
        }
    }, 500);
    this.photos = document.querySelectorAll('.zoomable');
    this.modal = document.getElementById('myModal');
    this.zoomedImg = document.getElementById('zoomedImg') as HTMLImageElement;
    this.navigationLinks = document.querySelectorAll("nav ul li a");
     
      this.photos.forEach((photo:any) => {
        photo.addEventListener('click', () => {
            this.modal!.style.display = 'block';
            this.zoomedImg!.src = photo.src;
        });
      });

      
      this.route.paramMap.subscribe(params => {
        this.uname = params.get('uname');
        this.getUser();
        this.getPosts();
        this.getGallery();
        // Use this.productId to fetch and display product details
      });
  }

  }

 

