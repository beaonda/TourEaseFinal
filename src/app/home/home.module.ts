import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { FabComponent } from '../components/fab/fab.component';
import { Component } from '@angular/core';
import { FooterComponent } from '../components/footer/footer.component';



@NgModule({

  imports: [
    CommonModule,
    FabComponent,
    HeaderComponent,
    FooterComponent
  ],
  declarations: [
  ]
})
export class HomeModule { }
