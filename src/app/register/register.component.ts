import { Component } from '@angular/core';
import { FireServiceService } from '../services/fire-service.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../../assets/css/homePages.css']
})
export class RegisterComponent {
  mname:any;
  fname:any;
  lname:any;
  btnSubmit:any;
  btnReset:any;
  public bday:any;
  public age:any;
  public gender:any = null;
  public contact:any;
  public email:any;
  public uname:any;
  public pword:any;
  public pword2:any;
  public bdaylbl:any;
  public country:any;
  public province:any;
  public city:any;
  public exact_add:any = null;
  newNum:any;
  newNum2:any;
  
  constructor(
    public fireService: FireServiceService,
    public router:Router,
    public load:LoaderService
  ){

  }

  ngOnInit(){

  }

  hasSpecialCharacters(text:string) {
    // Define a regular expression pattern that allows only letters, numbers, and underscores
    const pattern = /^[a-zA-Z0-9_]+$/;
  
    // Use the test method to check if the text matches the pattern
    return !pattern.test(text);
  }

  reset(){
    this.fname = "";
    this.mname = "";
    this.lname = "";
    this.gender = null;
    this.bday = "";
    this.contact = "";
    this.email = "";
    this.country = "";
    this.province = "";
    this.city = "";
    this.exact_add = "";
    this.uname = "";
    this.pword = "";
    this.pword2 = "";
  }

  isMoreThan13YearsFromNow(date:any) {
    // Create a Date object representing the current date
    const currentDate = new Date();
    const givenDate = new Date(date);

    // Calculate a Date object representing the date 13 years ago
    const thirteenYearsAgo = new Date(currentDate);
    thirteenYearsAgo.setFullYear(currentDate.getFullYear() - 13);
  
    // Compare the given date with the date 13 years ago
    return givenDate < thirteenYearsAgo;
  }

  isStrongPassword(text: string): boolean {
    // Check if the text is at least 8 characters long
    if (text.length < 8) {
      return false;
    }
  
    // Check if the text contains a number
    const numberRegex = /[0-9]/;
    if (!numberRegex.test(text)) {
      return false;
    }
  
    // Check if the text contains at least one capital letter
    const capitalLetterRegex = /[A-Z]/;
    if (!capitalLetterRegex.test(text)) {
      return false;
    }
  
    // If all criteria are met, the password is considered strong
    return true;
  }

  checkUsername(){
    this.load.openLoadingDialog();
    if(this.fname == '' || this.mname == '' || this.lname == '' || this.gender == null || this.bday == '' || this.country == '' || this.province == '' || this.city == '' || this.uname == '' || this.pword == '' || this.pword2 == ''){
      alert("Please fill up all the required fields");
      this.load.closeLoadingDialog();
      return;
    }
    if(!this.isMoreThan13YearsFromNow(this.bday)){
      alert("User should atleast be 13 years old to register an account.");
      this.load.closeLoadingDialog();
      this.reset();
      return;
    }
    if(this.hasSpecialCharacters(this.uname)){
      alert("Username should only contain letters, numbers and underscores");
      this.load.closeLoadingDialog();
    }else{
      this.fireService.getUnameExisting(this.uname).then(res => {
        if(res == null){
          if(this.isStrongPassword(this.pword)){
            if(this.pword != this.pword2){
            console.log(this.pword + this.pword2);
            alert("Passwords must match");
            this.load.closeLoadingDialog();
            } else {
              this.signUp();
            }
          }else{
            alert("Your password should atleast be 8 characters long and contains atleast one of the following: A capital letter and a number");
          }
          
        }else{
          alert("Username is already taken");
          this.load.closeLoadingDialog();
        }
      }).catch(err => {
        console.error(err);
        this.load.closeLoadingDialog();
      });
    }
    
  }

  signUp(){
    
    var dateNow = new Date();
    var hour = dateNow.getHours();
    var minutes = dateNow.getMinutes();
    var year = dateNow.getFullYear();
    var date = dateNow.getDate();
    var month = dateNow.getMonth();
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
            hour: hour,
            mins: minutes,
            date: date,
            month: month,
            year: year,
            registered: dateNow,
            profile_photo: "Not Yet Available",
            cover_photo: "Not Yet Available",
            bio: "No bio yet",
            posts: 0,
            views: 0
          }
          this.fireService.saveDetails(data).then(
            res=>{
              alert("Account Created");
              this.load.closeLoadingDialog();
              //updates the counter
              this.fireService.getDocumentCounter().then((doc)=>{
                if(doc){
                  console.log(doc);
                  /* this.newNum = 1 + doc.users;
                  this.newNum2 = 1 + doc.recent_users;
                  let data = {
                    recent_users:this.newNum2,
                    tspots : doc.tspots,
                    users:this.newNum,
                    posts:doc.posts
                  } */
                  if(this.country == "Philippines"){
                    doc.local_users++;
                  }else{
                    doc.foreign_users++;
                  }
                  doc.users++;
                  doc.recent_users++;
                  console.log(data);
                  this.fireService.updateCount(doc).catch(err => {console.error(err)});
                }
              });
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






  countries = [
    {"name": "Afghanistan"},
    {"name": "Albania"},
    {"name": "Algeria"},
    {"name": "Andorra"},
    {"name": "Angola"},
    {"name": "Antigua and Barbuda"},
    {"name": "Argentina"},
    {"name": "Armenia"},
    {"name": "Australia"},
    {"name": "Austria"},
    {"name": "Azerbaijan"},
    {"name": "Bahamas"},
    {"name": "Bahrain"},
    {"name": "Bangladesh"},
    {"name": "Barbados"},
    {"name": "Belarus"},
    {"name": "Belgium"},
    {"name": "Belize"},
    {"name": "Benin"},
    {"name": "Bhutan"},
    {"name": "Bolivia"},
    {"name": "Bosnia and Herzegovina"},
    {"name": "Botswana"},
    {"name": "Brazil"},
    {"name": "Brunei"},
    {"name": "Bulgaria"},
    {"name": "Burkina Faso"},
    {"name": "Burundi"},
    {"name": "Côte d'Ivoire"},
    {"name": "Cabo Verde"},
    {"name": "Cambodia"},
    {"name": "Cameroon"},
    {"name": "Canada"},
    {"name": "Central African Republic"},
    {"name": "Chad"},
    {"name": "Chile"},
    {"name": "China"},
    {"name": "Colombia"},
    {"name": "Comoros"},
    {"name": "Congo (Congo-Brazzaville)"},
    {"name": "Costa Rica"},
    {"name": "Croatia"},
    {"name": "Cuba"},
    {"name": "Cyprus"},
    {"name": "Czechia"},
    {"name": "Democratic Republic of the Congo (Congo-Kinshasa)"},
    {"name": "Denmark"},
    {"name": "Djibouti"},
    {"name": "Dominica"},
    {"name": "Dominican Republic"},
    {"name": "Ecuador"},
    {"name": "Egypt"},
    {"name": "El Salvador"},
    {"name": "Equatorial Guinea"},
    {"name": "Eritrea"},
    {"name": "Estonia"},
    {"name": "Eswatini (fmr. 'Swaziland')"},
    {"name": "Ethiopia"},
    {"name": "Fiji"},
    {"name": "Finland"},
    {"name": "France"},
    {"name": "Gabon"},
    {"name": "Gambia"},
    {"name": "Georgia"},
    {"name": "Germany"},
    {"name": "Ghana"},
    {"name": "Greece"},
    {"name": "Grenada"},
    {"name": "Guatemala"},
    {"name": "Guinea"},
    {"name": "Guinea-Bissau"},
    {"name": "Guyana"},
    {"name": "Haiti"},
    {"name": "Holy See"},
    {"name": "Honduras"},
    {"name": "Hungary"},
    {"name": "Iceland"},
    {"name": "India"},
    {"name": "Indonesia"},
    {"name": "Iran"},
    {"name": "Iraq"},
    {"name": "Ireland"},
    {"name": "Israel"},
    {"name": "Italy"},
    {"name": "Jamaica"},
    {"name": "Japan"},
    {"name": "Jordan"},
    {"name": "Kazakhstan"},
    {"name": "Kenya"},
    {"name": "Kiribati"},
    {"name": "Kuwait"},
    {"name": "Kyrgyzstan"},
    {"name": "Laos"},
    {"name": "Latvia"},
    {"name": "Lebanon"},
    {"name": "Lesotho"},
    {"name": "Liberia"},
    {"name": "Libya"},
    {"name": "Liechtenstein"},
    {"name": "Lithuania"},
    {"name": "Luxembourg"},
    {"name": "Madagascar"},
    {"name": "Malawi"},
    {"name": "Malaysia"},
    {"name": "Maldives"},
    {"name": "Mali"},
    {"name": "Malta"},
    {"name": "Marshall Islands"},
    {"name": "Mauritania"},
    {"name": "Mauritius"},
    {"name": "Mexico"},
    {"name": "Micronesia"},
    {"name": "Moldova"},
    {"name": "Monaco"},
    {"name": "Mongolia"},
    {"name": "Montenegro"},
    {"name": "Morocco"},
    {"name": "Mozambique"},
    {"name": "Myanmar (formerly Burma)"},
    {"name": "Namibia"},
    {"name": "Nauru"},
    {"name": "Nepal"},
    {"name": "Netherlands"},
    {"name": "New Zealand"},
    {"name": "Nicaragua"},
    {"name": "Niger"},
    {"name": "Nigeria"},
    {"name": "North Korea"},
    {"name": "North Macedonia (formerly Macedonia)"},
    {"name": "Norway"},
    {"name": "Oman"},
    {"name": "Pakistan"},
    {"name": "Palau"},
    {"name": "Palestine State"},
    {"name": "Panama"},
    {"name": "Papua New Guinea"},
    {"name": "Paraguay"},
    {"name": "Peru"},
    {"name": "Philippines"},
    {"name": "Poland"},
    {"name": "Portugal"},
    {"name": "Qatar"},
    {"name": "Romania"},
    {"name": "Russia"},
    {"name": "Rwanda"},
    {"name": "Saint Kitts and Nevis"},
    {"name": "Saint Lucia"},
    {"name": "Saint Vincent and the Grenadines"},
    {"name": "Samoa"},
    {"name": "San Marino"},
    {"name": "Sao Tome and Principe"},
    {"name": "Saudi Arabia"},
    {"name": "Senegal"},
    {"name": "Serbia"},
    {"name": "Seychelles"},
    {"name": "Sierra Leone"},
    {"name": "Singapore"},
    {"name": "Slovakia"},
    {"name": "Slovenia"},
    {"name": "Solomon Islands"},
    {"name": "Somalia"},
    {"name": "South Africa"},
    {"name": "South Korea"},
    {"name": "South Sudan"},
    {"name": "Spain"},
    {"name": "Sri Lanka"},
    {"name": "Sudan"},
    {"name": "Suriname"},
    {"name": "Sweden"},
    {"name": "Switzerland"},
    {"name": "Syria"},
    {"name": "Tajikistan"},
    {"name": "Tanzania"},
    {"name": "Thailand"},
    {"name": "Timor-Leste"},
    {"name": "Togo"},
    {"name": "Tonga"},
    {"name": "Trinidad and Tobago"},
    {"name": "Tunisia"},
    {"name": "Turkey"},
    {"name": "Turkmenistan"},
    {"name": "Tuvalu"},
    {"name": "Uganda"},
    {"name": "Ukraine"},
    {"name": "United Arab Emirates"},
    {"name": "United Kingdom"},
    {"name": "United States of America"},
    {"name": "Uruguay"},
    {"name": "Uzbekistan"},
    {"name": "Vanuatu"}
]

}
