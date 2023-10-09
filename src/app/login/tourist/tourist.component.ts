import { Component } from '@angular/core';
import "../../../assets/js/loginMain.js";
import { FireServiceService } from '../../services/fire-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tourist',
  templateUrl: './tourist.component.html',
  styleUrls: ['./tourist.component.css', '../admin/assets/css/style.css']
})
export class TouristComponent {
  email:any;
  pword:any;
  user:any;

  constructor(
    public fireService:FireServiceService,
    public router:Router,
  ){

  }

  login(){
    this.fireService.loginWithEmail({email:this.email, password:this.pword}).then((res:any)=>{
      console.log(res);
      this.user = this.fireService.getCurrentUser();
      if(this.user.emailVerified){
        this.router.navigate(['home']);
      }else if (this.user.emailVerified == false){  
        this.router.navigate(['verify']);
      }else{
        alert("User Error");
      }
      if(res.user.uid){
        this.fireService.getUserDetails({uid:res.user.uid}).subscribe((res:any)=>{
          console.log(res);
  
        }, (err:any)=>{
          console.log(err);
        });
      }
    }, (err:any)=>{
      alert(err.message);
      console.log(err)
    });
  } 

  forgot(){
    alert("hi");
    this.router.navigate(['/forgotpass']);
  }
}
