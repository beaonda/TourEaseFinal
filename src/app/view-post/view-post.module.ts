import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FabComponent } from '../components/fab/fab.component';
import { HeaderComponent } from '../components/header/header.component';
import { HeaderModule } from '../components/header/header.module';
import { FabModule } from '../components/fab/fab.module';




@NgModule({
  declarations: [
    FabComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    
  ]
})
export class ViewPostModule { }
