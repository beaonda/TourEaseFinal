import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FireServiceService } from '../services/fire-service.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css', '../../assets/css/homePages.css']
})
export class CategoriesComponent {

  constructor(
    private route: ActivatedRoute,
    public fireservice:FireServiceService,
    public router:Router,
    public firestore:AngularFirestore
  ){

  }

  category:any;
  raw_categ:any;
  ngOnInit(){
    this.postList = [];
    this.postList = [];
    this.route.paramMap.subscribe(params => {
      this.raw_categ = params.get('category');
      if(this.raw_categ == "sun_and_beach"){
        this.category = "Sun and Beach";
      }else if(this.raw_categ == "leisure"){
        this.category = "Leisure and Entertainment";
      }else if(this.raw_categ == "mice"){
        this.category = "MICE";
      }else if(this.raw_categ == "health"){
        this.category = "Health and Wellness";
      }else if(this.raw_categ == "cruise"){
        this.category = "Cruise and Nautical";
      }else if(this.raw_categ == "diving"){
        this.category = "Diving and Marine Sports";
      }else if(this.raw_categ == "cultural"){
        this.category = "Cultural";
      }else if(this.raw_categ == "nature"){
        this.category = "Nature";
      }else if(this.raw_categ == "industrial"){
        this.category = "Industrial";
      }else{
        this.category = this.raw_categ;
        console.log(this.category);
      }
      // Use this.productId to fetch and display product details
      this.getDocs();
    });
  }

  truncateString(inputString: string, maxLength: number): string {
    if (inputString.length <= maxLength) {
      return inputString;
    } else {
      return inputString.substring(0, maxLength);
    }
  }

  postList:any[] = [];
  photoList:any[] = [];
  getDocs(){
    this.fireservice.getHomeDocuments(this.category).then(res => {
      var i = 0;
      for(var k in res){
        this.postList.push(res[k].data());
        this.postList[i].body = this.truncateString(this.postList[i].body, 160);
        var postID = this.postList[i].postID;
        this.fireservice.getPhotoDocument(postID).then(doc =>{
            this.photoList.push(doc.imageUrl);
            console.log(this.photoList);
        }).catch(err => {
          console.log(err);
        });
        i++;
      }
    
      console.log(this.postList);
    }).catch(err =>{
      console.error(err);
    })
  }

}
