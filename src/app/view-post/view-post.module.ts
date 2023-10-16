import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FabComponent } from '../components/fab/fab.component';
import { HeaderComponent } from '../components/header/header.component';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderComponent,
    FabComponent
  ]
})
export class ViewPostModule { }
