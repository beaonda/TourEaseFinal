import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FireServiceService } from '../services/fire-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css', '../../assets/css/homePages.css', '../user-profile/user-profile.component.css']
})
export class SettingsComponent implements AfterViewInit {

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireservice: FireServiceService
  ){
    
  }

  uname:any;
  user:any;
  

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.uname = params.get('uname');
      this.getUser();
      // Use this.productId to fetch and display product details
    });
  }

  getUser(){
    this.fireservice.getUnameExisting(this.uname).then(doc => {
      this.user = doc;
      if(this.user.profile_photo == "Not Yet Available"){
        this.user.profile_photo = "../../assets/img/profilepic.png";
      }
      console.log(doc);
    }).catch(err => {
      console.log(err);
    });
  }

  ngAfterViewInit() {
    if (this.fileInput) {
      this.fileInput.nativeElement.addEventListener('change', this.handleFileUpload.bind(this));
    }
  }

  triggerFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  handleFileUpload(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];
    if (file) {
      // Handle the uploaded file
    }
  }
}
