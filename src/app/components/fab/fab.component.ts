import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.css']
})
export class FabComponent {

  @Input() dataFromParent: any; 
  constructor(public router:Router){

  }
  onFabClick(){
    if(this.dataFromParent){
      this.router.navigate(['new_post', this.dataFromParent]);
    }else{
      this.router.navigate(['new_post']);
    }
    
  }

}
