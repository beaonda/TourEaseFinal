import { Component } from '@angular/core';
/* import '../../assets/js/homeMain.js'; */
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../assets/css/homePages.css']
})
export class HomeComponent {

  constructor(){
  }

  ngAfterViewInit(){

    const swiper = new Swiper(".sliderFeaturedPosts", {
      spaceBetween: 0,
      speed: 500,
      centeredSlides: true,
      loop: true,
      slideToClickedSlide: true,
      modules: [Pagination, Autoplay, Navigation],
      autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      },
      pagination: {
      el: ".swiper-pagination",
      clickable: true,
      },
      navigation: {
      nextEl: ".custom-swiper-button-next",
      prevEl: ".custom-swiper-button-prev",
      },
    });

    
    
  }
  
  ngOnInit(){


    const selectHeader = document.querySelector('#header');
    if (selectHeader) {
      document?.addEventListener('scroll', () => {
      window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
      });
    }

    
  
	/**
	 * Scroll top button
	 */
	const scrollTop = document.querySelector('.scroll-top');
	if (scrollTop) {
	  const togglescrollTop = function() {
		window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
	  }
	  window?.addEventListener('load', togglescrollTop);
	  document?.addEventListener('scroll', togglescrollTop);
	  scrollTop!.addEventListener('click', (event: Event) =>{
      window.scrollTo({
		  top: 0,
		  behavior: 'smooth'
	  });
    } );
	}
    
  }

  
}
