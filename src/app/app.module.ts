import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './login/admin/admin.component';
import { TouristComponent } from './login/tourist/tourist.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
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

import { NewPostComponent } from './new-post/new-post.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { FabComponent } from './components/fab/fab.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TrendingComponent } from './components/trending/trending.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FooterComponent } from './components/footer/footer.component';
import { SettingsComponent } from './settings/settings.component';


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
    NewPostComponent,
    AdminNavComponent,
    ManageusersComponent,
    ManagespotsComponent,
    ManagepostsComponent,
    UserProfileComponent,
    ForgotPassComponent,
    FabComponent,
    TrendingComponent,
    FooterComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
