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
import { GetstartedComponent } from './getstarted/getstarted.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { CommonModule } from '@angular/common';
import { ManageusersComponent } from './admin/manageusers/manageusers.component';
import { ManagespotsComponent } from './admin/managespots/managespots.component';
import { ManagepostsComponent } from './admin/manageposts/manageposts.component';
import { firebaseConfig } from './firebase-config';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';



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
    GetstartedComponent,
    RegisterComponent,
    VerifyComponent,
    AdminNavComponent,
    ManageusersComponent,
    ManagespotsComponent,
    ManagepostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
