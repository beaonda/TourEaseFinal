import { Component,  ElementRef,  ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FireServiceService } from '../services/fire-service.service';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {MapDirectionsService} from '@angular/google-maps';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css', '../../assets/css/homePages.css']

})
export class ViewPostComponent {
  rating:any;
  postID:any;
  comment:any;

  @ViewChild(GoogleMap, { static: false }) loc_map!: GoogleMap;
  @ViewChild(GoogleMap, { static: false }) navMap!: GoogleMap;
  @ViewChild(GoogleMap, { static: false }) emergencyMap!: GoogleMap;
  @ViewChild(MapMarker, { static: false }) nav_marker!: MapMarker;
  


  constructor(
    private route: ActivatedRoute,
    public fireservice:FireServiceService,
    public router:Router,
    public firestore:AngularFirestore,
    public mapDirectionsService: MapDirectionsService
    
    ) { 
      this.getLocation();
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postID = params.get('postID');
      // Use this.productId to fetch and display product details
      this.getPost();
    });
  
    this.navigationLinks.forEach((link:any) => {
        link.addEventListener("click", this.handleNavigationClick);
      });
    this.showSection("blogs");
    this.navigationLinks[0].classList.add("active"); 

    console.log(this.postID.toString());
    
  }

  ngAfterViewInit(){
    
  }


  latitude: number | undefined;
  longitude: number | undefined;
  locCenter!:google.maps.LatLngLiteral;

  truncateString(inputString: string, maxLength: number): string {
    if (inputString.length <= maxLength) {
      return inputString;
    } else {
      return inputString.substring(0, maxLength);
    }
  }

  getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // Get the latitude and longitude from the position object
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.locCenter  = {
          lat: this.latitude,
          lng: this.longitude,
        };
        this.navMap.panTo(this.locCenter);
        this.nav_marker.marker?.setPosition(this.locCenter);
      },
      (error) => {
        console.error('Error getting location:', error);
      });
    } else {
      console.error('Geolocation is not supported in this browser.');
    }
  }


  directionsResults$!: Observable<google.maps.DirectionsResult|undefined>;

  


  postDoc:any;
  postPhoto:any;
  actualBody:any;

  nextPage(category:string){
    this.router.navigate(['/category', category]);
  }


  splitBody(inputText:string){
    this.actualBody = inputText.split('\n');
    this.actualBody = this.actualBody.filter((text:string) => text.trim() !== "");
    console.log(this.actualBody);
  }

  items$: Observable<any[]> = new Observable<any[]>();
  newCenter!: google.maps.LatLngLiteral;
  newMarkerPos!:google.maps.LatLngLiteral;
  getPost(){
    this.fireservice.addOneView(this.postID);
    
    this.items$ = this.fireservice.getComments(this.postID);
    this.fireservice.getPostDocument(this.postID).then((doc:any) =>{
      this.postDoc = doc;
      //console.log(doc);
      this.splitBody(this.postDoc.body);
      this.fireservice.addOneUserProfileView(this.postDoc.user);
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
      this.newCenter = {
        lat: this.postDoc.coords.lat,
        lng: this.postDoc.coords.lng,
      };
      console.log(this.locCenter);

      const request: google.maps.DirectionsRequest = {
        destination: this.newCenter,
        origin: this.locCenter,
        travelMode: google.maps.TravelMode.DRIVING
      };
      this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map((response:any) => response.result));
      
      const request2 = {
        location: this.newCenter,
        radius: 1000, // Adjust the radius as needed (in meters)
        type: 'hospital',
      };

      const map2 = new google.maps.Map(document.getElementById('map')!, {
        center: this.newCenter,
        zoom: this.zoom, // Adjust the zoom level as needed
      });
      const service = new google.maps.places.PlacesService(map2);

        const types = ['hospital', 'pharmacy', 'car_repair']; // Add your desired types here

        types.forEach(type => {
          const request = {
            location: this.newCenter,
            radius: 2000, // Adjust the radius as needed
            type: type, // Use the current type in the request
          };
          
          service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              // Handle the results for the current type
              results!.forEach(result => {
                console.log(result);
                /* this.newMarkerPos = {
                  lat: result.geometry!.location!.lat(),
                  lng: result.geometry!.location!.lng(),
                };
                console.log(this.newMarkerPos);
                this.addMarker(this.newMarkerPos); */
                const marker = new google.maps.Marker({
                  position: result!.geometry!.location,
                  map: map2,
                  title: result.name,
                });
                this.addMarker(result.geometry?.location, result);
                // You can do further processing here
              });
            }
          });
        });
      this.loc_map.panTo(this.newCenter);
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

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  openInfoWindow(marker:any) {
    this.infoWindow.open(marker.title);
  }

  markers:any[] = [];
  addMarker(pos:any, result:any) {
    this.markers.push({
      position: pos,
      label: {
        color: 'blue',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: result.name,
      options: { animation: google.maps.Animation.BOUNCE },
    });
    console.log(this.markers[0].title);
  }

  center: google.maps.LatLngLiteral = {
    lat: 13.7565,
    lng: 121.0583
  };
  zoom = 15;
  display: any;

  
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
