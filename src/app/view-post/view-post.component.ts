import { Component,  ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css', '../../assets/css/homePages.css']

})
export class ViewPostComponent {
  rating:any;
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
  zoom = 10;
  display: any;

  moveMap(event: google.maps.MapMouseEvent) {

    if (event.latLng != null) this.center = (event.latLng.toJSON());

  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }


}
