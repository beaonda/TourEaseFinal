import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  photos = document.querySelectorAll('.zoomable');
  modal = document.getElementById('myModal');
  zoomedImg = document.getElementById('zoomedImg') as HTMLImageElement;
  navigationLinks = document.querySelectorAll("nav ul li a");

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




  ngOnInit(){ 
    this.navigationLinks.forEach((link:any) => {
      link.addEventListener("click", this.handleNavigationClick);
    });
      this.showSection("blogs");
      this.navigationLinks[0].classList.add("active"); 
      this.photos.forEach((photo:any) => {
        photo.addEventListener('click', () => {
            this.modal!.style.display = 'block';
            this.zoomedImg!.src = photo.src;
        });
    });
  }

  }

 

