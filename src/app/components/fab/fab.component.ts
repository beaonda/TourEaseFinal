import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.css']
})
export class FabComponent {

  constructor(public router:Router){

  }
  onFabClick(){
    this.router.navigate(['new_post']);
  }

}
