import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import {Scrollbar} from 'smooth-scrollbar/scrollbar';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    SidenavComponent
  ]
})
export class SidenavModule { 

  ngOnInit(){
    var win = navigator.platform.indexOf('Win') > -1;
    if (win && document.querySelector('#sidenav-scrollbar')) {
      var options = {
        damping: '0.5'
      }
   /*    Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options); */
      
    }
  }
}
