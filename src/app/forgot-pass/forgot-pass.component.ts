import { Component, ViewChild } from '@angular/core';
import { FireServiceService } from '../services/fire-service.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent {

  @ViewChild('#send') btnSend: any;
  @ViewChild('#resend') btnResend: any;
  isButtonDisabled:boolean = true;

  constructor(public fireService:FireServiceService){

  }
  email:any;
  clickHere(){
    if(this.email != null){

    }
  }

  retrieveAcc(){
    if(this.email != null){
      this.fireService.resetPassword(this.email).then(() => {
        alert("Email was sent successfully");
        setTimeout(() => {
          this.isButtonDisabled = false;
        }, 60000); // 5000 milliseconds = 5 seconds
      }).catch((error) => {
        alert(error);
      });
      
    }
  }
}
