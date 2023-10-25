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


}
