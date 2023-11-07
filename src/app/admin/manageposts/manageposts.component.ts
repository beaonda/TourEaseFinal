import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ConfirmationComponent } from 'src/app/components/confirmation/confirmation.component';
import { FireServiceService } from 'src/app/services/fire-service.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-manageposts',
  templateUrl: './manageposts.component.html',
  styleUrls: ['./manageposts.component.css', '../../../assets/css/adminPages.css', '../../../assets/css/adminPages1.css', '../../../assets/css/homePages1.css', '../../../assets/css/homePages2.css', '../../../assets/css/homePages3.css', '../../../assets/css/homePages4.css', '../../../assets/css/homePages5.css', '../../../assets/css/homePages6.css', '../../../assets/css/homePages7.css', '../../../assets/css/homePages8.css', '../../../assets/css/homePages9.css',]
})
export class ManagepostsComponent {

  constructor(public fireService:FireServiceService, public router:Router, public load:LoaderService, private dialog: MatDialog){
    this.getPosts();
    this.retrieveArchived();
    
  }


  postA:any;
  viewPost(post:any){
    this.router.navigate(['view', post]);
  }

  async archivePost(post:any){
    const dialogRef = this.dialog.open(ConfirmationComponent);
    var reason:string;
    dialogRef.componentInstance.textEntered.subscribe((enteredText:string) => reason = enteredText);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.load.openLoadingDialog;
        this.fireService.moveDocumentToNewCollectionWithReason("posts","archived_posts", post.postID, reason);
        this.fireService.getDocumentCounter().then((doc)=>{
          if(doc){
            /* this.newNum = 1 + doc.posts;
            let data = {
              recent_users:doc.recent_users,
              tspots : doc.tspots,
              users:doc.users,
              posts: this.newNum
            } */
            doc.posts--;
            this.fireService.updateCount(doc);
          }
        });
      } else {
        // User clicked "Cancel" or closed the dialog
      }
    });
   
  }


  archivedList:any;
  retrieveArchived(){
    this.fireService.getArchivedPosts().snapshotChanges().pipe(
      map((changes:any) =>
        changes.map((c:any) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe((data:any) => {
      this.archivedList = data;
    });

  }

  list:any;
  postList:any;

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


  getPosts(){
    this.fireService.getAllPosts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.postList = data;
      /* console.log(this.postList); */
    });
  }



  ngOnInit(){
    this.list = document.querySelectorAll(".navigation li");
    this.list[4].classList.add("hovered");
    this.showSection("blogs");
    
  }

}
