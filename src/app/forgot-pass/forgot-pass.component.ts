import { Component, ViewChild } from '@angular/core';
import { FireServiceService } from '../services/fire-service.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css', '../../assets/css/homePages.css', '../../assets/css/homePages1.css', '../../assets/css/homePages2.css', '../../assets/css/homePages3.css', '../../assets/css/homePages4.css', '../../assets/css/homePages5.css', '../../assets/css/homePages6.css', '../../assets/css/homePages7.css', '../../assets/css/homePages8.css', '../../assets/css/homePages9.css']
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
      this.fireService.resetPassword(this.email);
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
