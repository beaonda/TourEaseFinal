import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { FabComponent } from '../components/fab/fab.component';



@NgModule({

  imports: [
    CommonModule,
    FabComponent,
    HeaderComponent
  ],
  declarations: [
  ]
})
export class HomeModule { }
