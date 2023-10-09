import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './login/admin/admin.component';
import { TouristComponent } from './login/tourist/tourist.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { SidenavComponent } from './admin/sidenav/sidenav.component';
import { GetstartedComponent } from './getstarted/getstarted.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { NewPostComponent } from './new-post/new-post.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    TouristComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ViewPostComponent,
    CategoriesComponent,
    DashboardComponent,
    NavbarComponent,
    SidenavComponent,
    GetstartedComponent,
    RegisterComponent,
    VerifyComponent,
    NewPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
