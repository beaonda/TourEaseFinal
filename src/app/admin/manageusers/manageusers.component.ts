import { Component } from '@angular/core';
import { FireServiceService } from '../../services/fire-service.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ConfirmationComponent } from 'src/app/components/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
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


  //modal variables
  fullName:any;
  bday:any;
  address:any;
  email:any;
  contact:any;
  registration:any;
  uname:any;
  bio:any;
  profile_photo:any;
  cover_photo:any;



  constructor(
    public fireService:FireServiceService,
    public router:Router,
    private dialog: MatDialog
    ){
      this.retrieveUsers();
  }
  list:any;

  ngOnInit(){
    this.list = document.querySelectorAll(".navigation li");
    this.list[2].classList.add("hovered");
  }

  suspendUser(data:any){
    const dialogRef = this.dialog.open(ConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // User clicked "OK," perform your action
        console.log(data.uid);
    this.fireService.moveDocumentToNewCollection("users", "suspended_users", data.uid);
      } else {
        // User clicked "Cancel" or closed the dialog
      }
    });
    
  }

  showSuspended(){

  }

  userA:any
  viewUser(user:any){
    this.userA = user;
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
