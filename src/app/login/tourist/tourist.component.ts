import { Component } from '@angular/core';
import "../../../assets/js/loginMain.js";
import { FireServiceService } from '../../services/fire-service.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from "firebase/compat/app";
import "firebase/auth";
import { GoogleAuthProvider } from 'firebase/auth';
import { LoaderService } from '../../services/loader.service';

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
    public fireAuth:AngularFireAuth,
    public load:LoaderService
  ){

  }

  containsEmail() {
    // Define a regular expression for matching email addresses
    const emailRegex = /\S+@\S+\.\S+/;
    // Use the test method to check if the text contains an email
    return emailRegex.test(this.email);
  }

  login(){
    this.load.openLoadingDialog();
    if(this.containsEmail()){
      this.fireService.loginWithEmail({email:this.email, password:this.pword}).then((res:any)=>{
        console.log(res);
        this.user = this.fireService.getCurrentUser();
        console.log(this.user.uid);
        this.fireService.collectionExists("users/" + this.user.uid, "suspension").subscribe(exists => {
          if (exists) {
            this.load.closeLoadingDialog();
            this.router.navigate(['suspended']);
          } else {
              if(this.user.emailVerified){
                this.load.closeLoadingDialog();
                this.router.navigate(['home']);
                

              }else if (this.user.emailVerified == false){  
                this.load.closeLoadingDialog();
                this.router.navigate(['verify']);
                
              }else{
                this.load.closeLoadingDialog();
                alert("User Error");
                
              }
          }
        });
      
      }, (err:any)=>{
        this.load.closeLoadingDialog();
        alert(err.message);
        console.log(err)
      });
    }else{
      this.fireService.getUnameExisting(this.email).then(res => {
        if(res == null){
          alert("User with username or password doesn't exist.");
        } else {
          console.log(res);
          this.fireService.loginWithEmail({email:res.email, password:this.pword}).then((res:any)=>{
            console.log(res);
            this.user = this.fireService.getCurrentUser();
            if(this.user.emailVerified){
              this.load.closeLoadingDialog();
              this.router.navigate(['home']);
            }else if (this.user.emailVerified == false){  
              this.load.closeLoadingDialog();
              this.router.navigate(['verify']);
            }else{
              this.load.closeLoadingDialog();
              alert("User Error");
            }
          }, (err:any)=>{
            this.load.closeLoadingDialog();
            alert(err.message);
            console.log(err)
          });
        }
      }).catch(err => {
        this.load.closeLoadingDialog();
        console.log("error");
      });
    }
    
    
  } 

  forgot(){
    alert("hi");
    this.router.navigate(['/forgotpass']);
  }
}
