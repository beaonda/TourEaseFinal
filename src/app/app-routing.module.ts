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

const routes: Routes = [
  
];

@NgModule({
  imports: [RouterModule.forRoot([
      { path: 'admin', component: AdminComponent },
      { path: 'tourist', component: TouristComponent },
      { path: 'home', component:HomeComponent},
      { path: '', component:HomeComponent},
      { path: 'about', component:AboutComponent},
      { path: 'category', component:CategoriesComponent},
      { path: 'view-post', component:ViewPostComponent},
      { path: 'contact', component:ContactComponent},
      { path: 'getstarted', component:GetstartedComponent},
      {path: 'register', component:RegisterComponent},
      {path: 'verify', component:VerifyComponent},
      {path: 'admin/dashboard', component:DashboardComponent},
      {path: 'admin/users', component:ManageusersComponent},
      {path: 'admin/posts', component:ManagepostsComponent},
      {path: 'admin/spots', component:ManagespotsComponent}
    ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
