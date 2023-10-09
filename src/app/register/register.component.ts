import { Component } from '@angular/core';
import { FireServiceService } from '../services/fire-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  mname:any;
  fname:any;
  lname:any;
  btnSubmit:any;
  btnReset:any;
  public bday:any;
  public age:any;
  public gender:any;
  public contact:any;
  public email:any;
  public uname:any;
  public pword:any;
  public pword2:any;
  public bdaylbl:any;
  public country:any;
  public province:any;
  public city:any;
  public exact_add:any;
  
  constructor(
    public fireService: FireServiceService,
    public router:Router
  ){

  }

  ngOnInit(){

  }

  signUp(){
    this.fireService.signup({email:this.email, pword:this.pword}).then(
      res=>{
        if(res.user?.uid){
          /* res.user.sendEmailVerification(); */
          let data = {
            uname: this.uname,
            uid: res.user?.uid,
            lname: this.lname,
            fname: this.fname,
            mname: this.mname,
            bday: this.bday,
            gender: this.gender,
            country: this.country,
            province:this.province,
            city: this.city,
            exact_ad:this.exact_add,
            contact: this.contact,
            email: this.email,
          }
          this.fireService.saveDetails(data).then(
            res=>{
              alert("Account Created");
              this.router.navigate(['verify']);
            },   
            err=>{
              console.log(err);}
          );
        }
      }, err=>{
        alert(err.message);
        console.log(err);
      }
    );
  }

}
