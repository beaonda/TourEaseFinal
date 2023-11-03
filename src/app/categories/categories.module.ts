import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FabComponent } from '../components/fab/fab.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderComponent,
    FabComponent,
    FooterComponent,
    ButtonsModule
  ]
})
export class CategoriesModule { }
