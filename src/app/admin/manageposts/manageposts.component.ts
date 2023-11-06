import { Component } from '@angular/core';
import { map } from 'rxjs';
import { FireServiceService } from 'src/app/services/fire-service.service';

@Component({
  selector: 'app-manageposts',
  templateUrl: './manageposts.component.html',
  styleUrls: ['./manageposts.component.css', '../../../assets/css/adminPages.css', '../../../assets/css/adminPages1.css', '../../../assets/css/homePages1.css', '../../../assets/css/homePages2.css', '../../../assets/css/homePages3.css', '../../../assets/css/homePages4.css', '../../../assets/css/homePages5.css', '../../../assets/css/homePages6.css', '../../../assets/css/homePages7.css', '../../../assets/css/homePages8.css', '../../../assets/css/homePages9.css',]
})
export class ManagepostsComponent {

  constructor(public fireService:FireServiceService){
    this.getPosts();
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
      console.log(this.postList);
    });
  }



  ngOnInit(){
    this.list = document.querySelectorAll(".navigation li");
    this.list[4].classList.add("hovered");
    this.showSection("blogs");
    
  }

}
