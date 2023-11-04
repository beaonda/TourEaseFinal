import { Component } from '@angular/core';
import { FireServiceService } from '../../services/fire-service.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ConfirmationComponent } from 'src/app/components/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from 'src/app/services/loader.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css', '../../../assets/css/adminPages.css', '../../../assets/css/homePages.css','../../../assets/css/homePages1.css', '../../../assets/css/homePages2.css', '../../../assets/css/homePages3.css', '../../../assets/css/homePages4.css', '../../../assets/css/homePages5.css', '../../../assets/css/homePages6.css', '../../../assets/css/homePages7.css', '../../../assets/css/homePages8.css', '../../../assets/css/homePages9.css', '../../../assets/css/adminPages1.css']
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
    private dialog: MatDialog,
    public load:LoaderService,
    public firestore:AngularFirestore
    ){
      this.retrieveUsers();
      this.getSuspendedList();
  }
  list:any;

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


  ngOnInit(){
    this.list = document.querySelectorAll(".navigation li");
    this.list[2].classList.add("hovered");
  }

  suspendedUsers:any;
  getSuspendedList(){
    this.fireService.getUsersWithSuspendedSubcollection()
    .then((users) => {
      this.suspendedUsers = users;
      console.log(this.suspendedUsers);
    })
    .catch((error) => {
      // Handle errors, e.g., display an error message
      console.error('Error fetching users with suspended subcollection:', error);
    });
  }

 
  suspendUser(data:any){
    const dialogRef = this.dialog.open(ConfirmationComponent);
    var reason:string;
    var dateNow = new Date();
    const day = String(dateNow.getDate()).padStart(2, '0');
    const month = String(dateNow.getMonth() + 1).padStart(2, '0'); // Note: Month is 0-based.
    const year = dateNow.getFullYear();
    dialogRef.componentInstance.textEntered.subscribe((enteredText:string) => reason = enteredText);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // User clicked "OK," perform your action
        this.load.openLoadingDialog();
        console.log(data.uid);
        const suspendData = {
          reason:reason,
          day: day,
          month: month,
          year: year,
          id: this.firestore.createId(),
        }
        this.fireService.suspendUser(data, suspendData).then(res =>{
          this.load.closeLoadingDialog();
          alert("Suspended Successfully");
        }).catch(err => {
          console.error(err);
        })
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
    this.fireService.getUsersWithoutSuspendedSubcollection()
    .then((users) => {
      this.usersList = users;
      console.log(this.suspendedUsers);
    })
    .catch((error) => {
      // Handle errors, e.g., display an error message
    });
  }

  unsuspend(udata:any){
    this.load.openLoadingDialog();
    this.fireService.deleteSubcollection("users", udata.uid, "suspension").then(() => {
      console.log('User Suspension Lifted');
      this.load.closeLoadingDialog();
    })
    .catch((error) => {
      this.load.closeLoadingDialog();
      console.error('Error deleting subcollection:', error);
    });
  }


}
