import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css', '../../assets/css/homePages.css']
})
export class UserProfileComponent {

 
  constructor(private router: Router) { }

  goToSettings() {
      this.router.navigate(['/settings']);
  }

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
    this.photos = document.querySelectorAll('.zoomable');
    this.modal = document.getElementById('myModal');
    this.zoomedImg = document.getElementById('zoomedImg') as HTMLImageElement;
    this.navigationLinks = document.querySelectorAll("nav ul li a");
     
      this.photos.forEach((photo:any) => {
        photo.addEventListener('click', () => {
            this.modal!.style.display = 'block';
            this.zoomedImg!.src = photo.src;
        });
      });
  }

  }

 

