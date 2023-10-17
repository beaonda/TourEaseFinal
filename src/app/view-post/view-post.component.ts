import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireServiceService } from '../services/fire-service.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css', '../../assets/css/homePages.css']
})
export class ViewPostComponent {
  rating:any;
  postID:any

  constructor(
    private route: ActivatedRoute,
    public fireservice:FireServiceService
    ) { 
      
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postID = params.get('postID');
      // Use this.productId to fetch and display product details
    });

    console.log(this.postID.toString());
    this.getPost();
  }
  postDoc:any;
  postPhoto:any

  getPost(){
    this.fireservice.getPostDocument(this.postID).then((doc:any) =>{
      this.postDoc = doc;
      console.log(doc);
    }).catch(err => {
      console.log(err);
    });
    this.fireservice.getPhotoDocument(this.postID).then((doc:any) =>{
      this.postPhoto = doc;
      console.log(doc);
    }).catch(err => {
      console.log(err);
    });
  }



}
