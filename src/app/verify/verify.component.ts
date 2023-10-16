import { Component } from '@angular/core';
import { FireServiceService } from '../services/fire-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  email:any;
  user:any;
  constructor(
    public router:Router, 
    public fireService:FireServiceService
  ) {

  }

  link:any;
  ngOnInit() {
    this.user = this.fireService.getCurrentUser();
    console.log(this.user);
    this.email = '' + this.user.email;

    if(this.user.emailVerified == false){
      this.user.sendEmailVerification();
    } else {
      this.router.navigate(['home']);
    }

  /*   this.link = document.getElementById("click")?.addEventListener('click', this.clickHere); */
  }

  clickHere(){
    this.user.sendEmailVerification();
    alert("Email Sent");
  }
}
