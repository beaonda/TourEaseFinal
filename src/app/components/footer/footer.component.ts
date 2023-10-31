import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FireServiceService } from 'src/app/services/fire-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css', '../../../assets/css/homePages.css']
})
export class FooterComponent {

  constructor(
    public router:Router,
    public fireservice:FireServiceService,
    private dialog: MatDialog,
    public auth:AngularFireAuth
  ){
    
  }

  nextPage(category:string){
    this.router.navigate(['/category', category]);
  }

  recentPosts:any[] =[];
  recentPhotos:any[] = [];
  getRecentPosts(){
    this.fireservice.getMostRecentPosts().then(docs => {
      if(docs == null){
        console.log("Document not found");
      }
      var i = 0;
      docs.forEach((doc) => {
        // Process each document here.
        this.fireservice.getPhotoDocument(doc.postID).then(res => {
          this.recentPhotos.push(res);
          console.log(this.recentPhotos);
        }).catch(err => {
          console.error(err);
        });
        switch(doc.month){
          case 0:
            doc.month = "JAN";
            break;
          case 1:
            doc.month = "FEB";
            break;
          case 2:
            doc.month = "MAR";
            break;
          case 3:
            doc.month = "APR";
            break;
          case 4:
            doc.month = "MAY";
            break;
          case 5:
            doc.month = "JUN";
            break;
          case 6:
            doc.month = "JUL";
            break;
          case 7:
            doc.month = "AUG";
            break;
          case 8:
            doc.month = "SEPT";
            break;
          case 9:
            doc.month = "OCT";
            break;
          case 10:
            doc.month = "NOV";
            break;
          case 11:
            doc.month = "DEC";
            break;
          /* default:
            this.natureList[i].month = "NO";
            break; */
        } 
        this.recentPosts.push(doc);

        console.log(this.recentPosts);
      });
    }).catch(err => {
      alert(err);
      console.error(err);
    })
  }

}
