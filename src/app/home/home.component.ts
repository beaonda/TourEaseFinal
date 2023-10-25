import { Component } from '@angular/core';
/* import '../../assets/js/homeMain.js'; */
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Swiper from 'swiper';
import { FireServiceService } from '../services/fire-service.service';
import { Conditional } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../assets/css/homePages.css']
})
export class HomeComponent {

  constructor(
    public fireservice:FireServiceService,
    public router: Router
  ){
    this.getNatureList();
    this.getCulturalList();
    this.getBeachList();
    this.getLeisureList();
  }

  natureList:any[] = [];
  naturePhotos:any[] = [];
  currentPost:any;
  rawPost:any;
  getNatureList(){
    this.fireservice.getHomeDocuments("Nature").then((doc:any) =>{
      for(var k in doc){
        this.natureList.push(doc[k].data());
        this.rawPost = doc[k].data();
        this.currentPost = this.rawPost.postID;
        if(k == '0' || k == '1' || k == '3'){
          this.fireservice.getPhotoDocument(this.currentPost).then((doc:any) => {
            this.naturePhotos.push(doc.imageUrl);
          }).catch(err => {
            console.log(err);
          });
        }
        
      }
    }).catch(err => {
      console.log(err);
    });
  }

  culturalList:any[] = [];
  culturalPhotos:any[] = [];
  currentPost2:any;
  rawPost2:any;
  getCulturalList(){
    this.fireservice.getHomeDocuments("Cultural").then((doc:any) =>{
      for(var k in doc){
        this.culturalList.push(doc[k].data());
        this.rawPost2 = doc[k].data();
        this.currentPost2 = this.rawPost2.postID;
        if(k == '0' || k == '1' || k == '3'){
          this.fireservice.getPhotoDocument(this.currentPost2).then((doc:any) => {
            this.culturalPhotos.push(doc.imageUrl);
          }).catch(err => {
            console.log(err);
          });
        }      
      }
    }).catch(err => {
      console.log(err);
    });
  }

  beachList:any[] = [];
  beachPhotos:any[] = [];
  currentPost3:any;
  rawPost3:any;
  getBeachList(){
    this.fireservice.getHomeDocuments("Sun and Beach").then((doc:any) =>{
      for(var k in doc){
        this.beachList.push(doc[k].data());
        this.rawPost3 = doc[k].data();
        this.currentPost3 = this.rawPost3.postID;
        console.log(this.currentPost3);
        console.log(' K', k);
        if(k == '0' || k == '3' || k == '4' || k == '5' || k == '6' || k == '7' || k == '8' || k == '9'){
          this.fireservice.getPhotoDocument(this.currentPost3).then((doc:any) => {
            this.beachPhotos.push(doc.imageUrl);
          }).catch(err => {
            console.log(err);
          });
        } 
      }
    }).catch(err => {
      console.log(err);
    });
  }

  leisureList:any[] = [];
  leisurePhotos:any[] = [];
  currentPost4:any;
  rawPost4:any;
  getLeisureList(){
    this.fireservice.getHomeDocuments("Leisure and Entertainment").then((doc:any) =>{
      for(var k in doc){
        this.leisureList.push(doc[k].data());
        this.rawPost4 = doc[k].data();
        this.currentPost4 = this.rawPost4.postID;
        console.log(this.currentPost4);
        console.log(' K', k);
        if(k == '0' || k == '1' || k == '3'){
          this.fireservice.getPhotoDocument(this.currentPost4).then((doc:any) => {
            this.leisurePhotos.push(doc.imageUrl);
          }).catch(err => {
            console.log(err);
          });
        } 
      }
    }).catch(err => {
      console.log(err);
    });
  }


  nextPage(postID:string){
    this.router.navigate(['/view', postID]);
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
