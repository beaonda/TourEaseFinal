import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FireServiceService } from '../services/fire-service.service';

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
    public fireservice: FireServiceService
    ) { 
      
    }

    showSettings:boolean = false;
  goToSettings() {
      this.showSettings = !this.showSettings;
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
      this.currentUser = this.fireservice.getCurrentUser();
      if(this.user.uid == this.currentUser.uid){
        console.log("Same User");
        
        this.sameUser = true;
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

  handleNavigationClick(event:any) {
    this.navigationLinks = document.querySelectorAll("nav ul li a");
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
  this.showSection("blogs");
  this.navigationLinks[0].classList.add("active"); 
 }
 uname:any;
 currentUser:any;

  ngOnInit(){ 
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
        // Use this.productId to fetch and display product details
      });
  }

  }

 

