import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FireServiceService } from '../services/fire-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css', '../../assets/css/homePages.css']
})
export class UserProfileComponent {

  user:any;
  sameUser:boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireservice: FireServiceService
    ) { 
      
    }

  goToSettings() {
      this.router.navigate(['/settings']);
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

 

