import { Component,  ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireServiceService } from '../services/fire-service.service';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css', '../../assets/css/homePages.css']

})
export class ViewPostComponent {
  rating:any;
  postID:any;
  

  

  constructor(
    private route: ActivatedRoute,
    public fireservice:FireServiceService
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
  postPhoto:any

  getPost(){
    this.fireservice.getPostDocument(this.postID).then((doc:any) =>{
      this.postDoc = doc;
      console.log(doc);
      this.center = this.postDoc.coords;
      this.rating = this.postDoc.rating;
      console.log(this.center);
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
