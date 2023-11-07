import { Component } from '@angular/core';
import { FireServiceService } from '../services/fire-service.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import * as Aos from 'aos';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css', '../../assets/css/homePages.css', '../../assets/css/homePages1.css', '../../assets/css/homePages2.css', '../../assets/css/homePages3.css', '../../assets/css/homePages4.css', '../../assets/css/homePages5.css', '../../assets/css/homePages6.css', '../../assets/css/homePages7.css', '../../assets/css/homePages8.css', '../../assets/css/homePages9.css' ,'../../assets/css/variables.css']
})
export class VerifyComponent {
  email:any;
  user:any;
  constructor(
    public router:Router, 
    public fireService:FireServiceService,
    public load:LoaderService
  ) {
    this.user = this.fireService.getCurrentUser();
    console.log(this.user);
    this.load.closeLoadingDialog();
  }

  link:any;
  ngOnInit() {
    console.log(this.user.email);
    this.email = this.user.email;
    if(this.user.emailVerified == false){
      this.user.sendEmailVerification();
    } else {
      this.router.navigate(['home']);
    }
    aos_init();

    function aos_init() {
      Aos.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
      });
    }

  /*   this.link = document.getElementById("click")?.addEventListener('click', this.clickHere); */
  }

  ngAfterViewInit(){
    
  }

  clickHere(){
    this.user.sendEmailVerification();
    alert("Email Sent");
  }
}
