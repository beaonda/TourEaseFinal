import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Firestore, doc } from 'firebase/firestore';
import { map } from 'rxjs';
import { FireServiceService } from 'src/app/services/fire-service.service';

@Component({
  selector: 'app-managespots',
  templateUrl: './managespots.component.html',
  styleUrls: ['./managespots.component.css', '../../../assets/css/adminPages.css']
})
export class ManagespotsComponent {
  isModalOpen = false;
  popups:any;
  placeName:any;
  city:any;
  category:any;
  status:any;
  description:any;
  photo:any;
  destList:any;

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
    public firestore:AngularFirestore){

  }

  

  uploadData(){
    let tourismData = {
      tourismID:this.firestore.createId(),
      estName:this.placeName,
      city:this.city,
      category:this.category,
      status:this.status,
      desc:"No Description Yet",
      photo:"No Photo Yet"
    }
    let counter = 0;

    for(var key in this.destList){
      if(tourismData.estName.toUpperCase() === this.destList[key].estName.toUpperCase()){
        counter++;
        console.log(tourismData.estName.toUpperCase() + this.destList[key].estName.toUpperCase());
      }
    }
    
    if(counter == 0){
      this.fireService.saveTouristDestion(tourismData).then(
        res=>{
          console.log(res);
          alert("Successfully Added.");
          if(this.addM){
            this.resetAdd();
          }else{
            this.closeAdd();
          }
          
        }, err=>{
          alert(err.message);
          console.log(err);
        }
      );
    }else{
      console.log(counter);
      
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

  viewSpot(){
    var popups = document.querySelectorAll('.popup'); 
    var viewPopUp = document.querySelector("#viewPopUp");
    (viewPopUp as HTMLElement).style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  closeView(){
    var closeButtons = document.querySelector('.close');
    var viewPopUp = document.querySelector("#viewPopUp");
    (viewPopUp as HTMLElement).style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  ngOnInit(){
    this.retrieveDestinations();
    
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
}
