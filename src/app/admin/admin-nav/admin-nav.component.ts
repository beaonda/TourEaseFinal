import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css', '../../../assets/css/adminPages.css', '../../../assets/css/adminPages1.css']
})
export class AdminNavComponent {
  list:any;

  constructor(
    public router: Router
  ){

  }

  ngOnInit(){
    
    
  }

  nav(where:any){
    this.router.navigate([where]);
  }

}

