import { Component } from '@angular/core';
import '../../../assets/js/homeMain.js';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../../assets/css/homePages.css']
})
export class HeaderComponent {
  showSideNav: boolean = false;
  showSideNavWeb: boolean = false;
  showDropBool:any = false;
  showBurger:any = true;

  showDrop(){
    this.showDropBool = !this.showDropBool;
  }
 

  toggleSideNav() {
    this.showSideNav = !this.showSideNav;

  }

  toggleSideNavWeb() {
    this.showSideNavWeb = !this.showSideNavWeb;

  }

 

  constructor(){
    
  }


  ngAfterViewInit(){
    
  
  }

 

  ngOnInit(){
    
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
