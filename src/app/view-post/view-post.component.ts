import { Component,  ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FireServiceService } from '../services/fire-service.service';
import { GoogleMap } from '@angular/google-maps';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css', '../../assets/css/homePages.css']

})
export class ViewPostComponent {
  rating:any;
  postID:any;
  comment:any;

  

  constructor(
    private route: ActivatedRoute,
    public fireservice:FireServiceService,
    public router:Router,
    public firestore:AngularFirestore
    ) { 
      
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postID = params.get('postID');
      // Use this.productId to fetch and display product details
      this.navigationLinks.forEach((link:any) => {
        link.addEventListener("click", this.handleNavigationClick);
      });
        this.showSection("blogs");
        this.navigationLinks[0].classList.add("active"); 
    });
  
    

    console.log(this.postID.toString());
    this.getPost();
    
    
  }
  postDoc:any;
  postPhoto:any;
  actualBody:any;

  splitBody(inputText:string){
    this.actualBody = inputText.split('\n');
    this.actualBody = this.actualBody.filter((text:string) => text.trim() !== "");
    console.log(this.actualBody);
  }

  items$: Observable<any[]> = new Observable<any[]>();
  getPost(){
    this.fireservice.addOneView(this.postID);
    this.items$ = this.fireservice.getComments(this.postID);
    this.fireservice.getPostDocument(this.postID).then((doc:any) =>{
      this.postDoc = doc;
      //console.log(doc);
      this.splitBody(this.postDoc.body);
      switch(this.postDoc.month){
        case 0:
          this.postDoc.month = "JAN";
          break;
        case 1:
          this.postDoc.month = "FEB";
          break;
        case 2:
          this.postDoc.month = "MAR";
          break;
        case 3:
          this.postDoc.month = "APR";
          break;
        case 4:
          this.postDoc.month = "MAY";
          break;
        case 5:
          this.postDoc.month = "JUN";
          break;
        case 6:
          this.postDoc.month = "JUL";
          break;
        case 7:
          this.postDoc.month = "AUG";
          break;
        case 8:
          this.postDoc.month = "SEPT";
          break;
        case 9:
          this.postDoc.month = "OCT";
          break;
        case 10:
          this.postDoc.month = "NOV";
          break;
        case 11:
          this.postDoc.month = "DEC";
          break;
        /* default:
          this.natureList[i].month = "NO";
          break; */
      } 
      this.center = this.postDoc.coords;
      this.rating = this.postDoc.rating;
      //console.log(this.center);
    }).catch(err => {
      console.log(err);
    });
    this.fireservice.getPhotoDocument(this.postID).then((doc:any) =>{
      this.postPhoto = doc;
      console.log(doc);
    }).catch(err => {
      console.log(err);
    });
  }

  currentUser:any;

  userCheck(){
    this.currentUser = this.fireservice.getCurrentUser();
    if(this.currentUser == null){
      alert("User must be logged in to be able to leave a comment");
      this.router.navigate(['login']);
    }else{
      //console.log(this.currentUser.uid);
      this.fireservice.getUnameFromID(this.currentUser.uid).then((res)=>{
        this.postComment(res.uname);
      })
    }
  }

  postComment(uname:string){
    var dateNow = new Date();
    var hour = dateNow.getHours();
    var minutes = dateNow.getMinutes();
    var year = dateNow.getFullYear();
    var date = dateNow.getDate();
    var month = dateNow.getMonth();
    let commentData = {
      commentID:this.firestore.createId(),
      content: this.comment,
      hour: hour,
      mins: minutes,
      date: date,
      month: month,
      year: year,
      postID: this.postID,
      user:uname
    }
    this.fireservice.postComment(this.postID, commentData.commentID, commentData).then(res => {
      alert("Commented Successfully");
    }).catch(err => {
      console.error(err);
    })
  }


  @ViewChild(GoogleMap, { static: false }) addMap!: GoogleMap;

  markers:any;
  addMarker() {
    this.markers.push({
      position: this.center,
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    });
  }

  center: google.maps.LatLngLiteral = {
    lat: 13.7565,
    lng: 121.0583
  };
  zoom = 15;
  display: any;

  moveMap(event: google.maps.MapMouseEvent) {

    if (event.latLng != null) this.center = (event.latLng.toJSON());

  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
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



  handleNavigationClick = (event:any) => {
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

  photos = document.querySelectorAll('.zoomable');
  modal = document.getElementById('myModal');
  zoomedImg = document.getElementById('zoomedImg') as HTMLImageElement;
  navigationLinks = document.querySelectorAll("nav ul li a");


}
