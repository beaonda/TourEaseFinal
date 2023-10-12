import { Component } from '@angular/core';
import { FireServiceService } from '../../services/fire-service.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css', '../../../assets/css/adminPages.css']
})
export class ManageusersComponent {
  usersList:any;
  user:any;
  isModalOpen = false;
  popups:any;
  constructor(
    public fireService:FireServiceService,
    public router:Router
    ){

  }

  ngOnInit(){
    this.retrieveUsers();
  }

  viewUser(){
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

  retrieveUsers(): void {
    this.fireService.getAllUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.usersList = data;
    });
  }


}
