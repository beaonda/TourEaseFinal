import { Component } from '@angular/core';
import { map } from 'rxjs';
import { FireServiceService } from 'src/app/services/fire-service.service';

@Component({
  selector: 'app-manageposts',
  templateUrl: './manageposts.component.html',
  styleUrls: ['./manageposts.component.css', '../../../assets/css/adminPages.css', '../../../assets/css/adminPages1.css']
})
export class ManagepostsComponent {

  constructor(public fireService:FireServiceService){
    this.getPosts();
  }

  list:any;
  postList:any;

  getPosts(){
    this.fireService.getAllPosts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.postList = data;
      /* console.log(this.postList); */
    });
  }

  ngOnInit(){
    this.list = document.querySelectorAll(".navigation li");
    this.list[4].classList.add("hovered");
  }
}
