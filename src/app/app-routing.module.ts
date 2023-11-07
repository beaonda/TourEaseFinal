import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './login/admin/admin.component';
import { TouristComponent } from './login/tourist/tourist.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { ContactComponent } from './contact/contact.component';
import { GetstartedComponent } from './getstarted/getstarted.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ManageusersComponent } from './admin/manageusers/manageusers.component';
import { ManagepostsComponent } from './admin/manageposts/manageposts.component';
import { ManagespotsComponent } from './admin/managespots/managespots.component';
import { NewPostComponent } from './new-post/new-post.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { SettingsComponent } from './settings/settings.component';
import { SuspendedComponent } from './suspended/suspended.component';


const routes: Routes = [
  
];

@NgModule({
  imports: [RouterModule.forRoot([
      { path: 'admin', component: AdminComponent },
      { path: 'login', component: TouristComponent},
      { path: 'tourist', component: TouristComponent },
      { path: 'home', component:HomeComponent},
      { path: '', component:HomeComponent},
      { path: 'about', component:AboutComponent},
      { path: 'category/:category', component:CategoriesComponent},
      { path: 'view/:postID', component:ViewPostComponent},
      { path: 'contact', component:ContactComponent},
      { path: 'getstarted', component:GetstartedComponent},
      {path: 'register', component:RegisterComponent},
      {path: 'verify', component:VerifyComponent},
      {path: 'admin/dashboard', component:DashboardComponent},
      {path: 'admin/users', component:ManageusersComponent},
      {path: 'admin/posts', component:ManagepostsComponent},
      {path: 'admin/spots', component:ManagespotsComponent},
      {path: 'profile/:uname', component:UserProfileComponent},
      {path: 'retrieve_account', component:ForgotPassComponent},
      {path: 'settings/:uname', component:SettingsComponent},
      {path: 'suspended', component:SuspendedComponent},
      {path: 'new_post', component:NewPostComponent},
      {path: 'new_post/:reviewId', component:NewPostComponent}
    ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
