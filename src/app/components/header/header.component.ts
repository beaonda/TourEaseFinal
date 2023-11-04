import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FireServiceService } from 'src/app/services/fire-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Confirm2Component } from '../confirm2/confirm2.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as Aos from 'aos';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css','./header.component1.css','./header.component2.css','./header.component4.1.css','./header.component4.2.css','./header.component2.1.css','./header.component.2.2.css', './header.component3.css',  './header.component4.css', '../../../assets/css/homePages.css', '../../../assets/css/homePages1.css', '../../../assets/css/homePages2.css', '../../../assets/css/homePages3.css', '../../../assets/css/homePages4.css', '../../../assets/css/homePages5.css', '../../../assets/css/homePages6.css', '../../../assets/css/homePages7.css', '../../../assets/css/homePages8.css', '../../../assets/css/homePages9.css','../../../assets/css/variables.css']
})
export class HeaderComponent {
  showSideNav: boolean = false;
  showSideNavWeb: boolean = false;
  showDropBool:any = false;
  showBurger:any = true;
  user:any;
  currentUser:any;
  constructor(
    public router:Router,
    public fireservice:FireServiceService,
    private dialog: MatDialog,
    public auth:AngularFireAuth
  ){
    this.auth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  nextPage(category:string){
    this.router.navigate(['category', category]);
  }

  nav(where:any){
    this.router.navigate([where]);
  }

  goProfile(){
    this.fireservice.getUnameFromID(this.user.uid).then(doc => {
      this.currentUser = doc;
      this.router.navigate(['profile', this.currentUser.uname]);
    }).catch(err => {
      console.error(err);
    });
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(Confirm2Component);
  
    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        this.fireservice.signOut();
        this.router.navigate(['login']);
      } else {
        // User clicked "Cancel" or closed the dialog
      }
    });
  }

  showDrop(){
    this.showDropBool = !this.showDropBool;
  }

  
 

  toggleSideNav() {
    this.showSideNav = !this.showSideNav;

  }

  toggleSideNavWeb() {
    this.showSideNavWeb = !this.showSideNavWeb;

  }

 

  


  ngAfterViewInit(){
    
  
  }

  logout(){
    this.openConfirmDialog();
  }

 

  ngOnInit(){

    aos_init();

    function aos_init() {
      Aos.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
      });
    }
    
    /**
   * Mobile nav toggle
   */
   var mobileNav = false;

  const mobileNavToogleButton = document.querySelector('.mobile-nav-toggle');

  if (mobileNavToogleButton) {
    mobileNavToogleButton.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle(mobileNav);
    });
  }

  function mobileNavToogle(mobileNav:any) {
    if(mobileNav){
      document.querySelector('body')!.classList.add('mobile-nav-active');
      mobileNavToogleButton!.classList.add('bi-list');
      mobileNavToogleButton!.classList.add('bi-x');
      mobileNav = true;
    } else {
      document.querySelector('body')!.classList.remove('mobile-nav-active');
      mobileNavToogleButton!.classList.remove('bi-list');
      mobileNavToogleButton!.classList.remove('bi-x');
      mobileNav = false;
    }
   
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if(navbarlink instanceof HTMLAnchorElement){

      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      navbarlink.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle(mobileNav);
        }
      });

    }
  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        el.classList.toggle('active');
        el.nextElementSibling!.classList.toggle('dropdown-active');

        let dropDownIndicator = el.querySelector('.dropdown-indicator');
        dropDownIndicator!.classList.toggle('bi-chevron-up');
        dropDownIndicator!.classList.toggle('bi-chevron-down');
      }
    })
  });

    const selectHeader = document.querySelector('#header');
    if (selectHeader) {
      document.addEventListener('scroll', () => {
        window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
      });
    }


  }
}


