import { Component } from '@angular/core';
import { FireServiceService } from '../../services/fire-service.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css', '../../../assets/css/adminPages.css']
})
export class ManageusersComponent {
  usersList:any;
  user:any;
  constructor(
    public fireService:FireServiceService,
    public router:Router
    ){

  }

  ngOnInit(){
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.fireService.getAllUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.usersList = data;
    });
  }


}
