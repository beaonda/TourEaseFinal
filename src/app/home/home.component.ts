import { Component } from '@angular/core';
/* import '../../assets/js/homeMain.js'; */
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Swiper from 'swiper';
import { FireServiceService } from '../services/fire-service.service';
import { Conditional } from '@angular/compiler';
import { Router } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../assets/css/homePages.css']
})
export class HomeComponent {

  city: string = 'New York'; // Replace with the desired city
  WeatherData: any;

  constructor(
    public fireservice:FireServiceService,
    public router: Router,
    private weatherService: WeatherService,
    public load: LoaderService
  ){
    this.getNatureList();
    this.getCulturalList();
    this.getBeachList();
    this.getLeisureList();
    this.getWeatherData();
    this.load.closeLoadingDialog();
  }

  getWeatherData(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Batangas,PH&appid=acde409f699e5c16e2b46cbb70e8fd66')
    .then(response=>response.json())
    .then(data=>{
      this.setWeatherData(data);
      console.log(data);
  })

    // let data = JSON.parse('{"coord":{"lon":72.85,"lat":19.01},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],"base":"stations","main":{"temp":297.15,"feels_like":297.4,"temp_min":297.15,"temp_max":297.15,"pressure":1013,"humidity":69},"visibility":3500,"wind":{"speed":3.6,"deg":300},"clouds":{"all":20},"dt":1580141589,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1580089441,"sunset":1580129884},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}');
    // this.setWeatherData(data);
  }

  async setWeatherData(data:any){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
    return this.WeatherData;
  }

  natureList:any[] = [];
  naturePhotos:any[] = [];
  currentPost:any;
  rawPost:any;
  getNatureList(){

    this.fireservice.getHomeDocuments("Nature").then((doc:any) =>{
      var i = 0;
      for(var k in doc){
        this.natureList.push(doc[k].data());
        switch(this.natureList[i].month){
          case 0:
            this.natureList[i].month = "JAN";
            break;
          case 1:
            this.natureList[i].month = "FEB";
            break;
          case 2:
            this.natureList[i].month = "MAR";
            break;
          case 3:
            this.natureList[i].month = "APR";
            break;
          case 4:
            this.natureList[i].month = "MAY";
            break;
          case 5:
            this.natureList[i].month = "JUN";
            break;
          case 6:
            this.natureList[i].month = "JUL";
            break;
          case 7:
            this.natureList[i].month = "AUG";
            break;
          case 8:
            this.natureList[i].month = "SEPT";
            break;
          case 9:
            this.natureList[i].month = "OCT";
            break;
          case 10:
            this.natureList[i].month = "NOV";
            break;
          case 11:
            this.natureList[i].month = "DEC";
            break;
          /* default:
            this.natureList[i].month = "NO";
            break; */
        } 
        i++;
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
      var i = 0;
      for(var k in doc){
        this.culturalList.push(doc[k].data());
        switch(this.culturalList[i].month){
          case 0:
            this.culturalList[i].month = "JAN";
            break;
          case 1:
            this.culturalList[i].month = "FEB";
            break;
          case 2:
            this.culturalList[i].month = "MAR";
            break;
          case 3:
            this.culturalList[i].month = "APR";
            break;
          case 4:
            this.culturalList[i].month = "MAY";
            break;
          case 5:
            this.culturalList[i].month = "JUN";
            break;
          case 6:
            this.culturalList[i].month = "JUL";
            break;
          case 7:
            this.culturalList[i].month = "AUG";
            break;
          case 8:
            this.culturalList[i].month = "SEPT";
            break;
          case 9:
            this.culturalList[i].month = "OCT";
            break;
          case 10:
            this.culturalList[i].month = "NOV";
            break;
          case 11:
            this.culturalList[i].month = "DEC";
            break;
          /* default:
            this.natureList[i].month = "NO";
            break; */
        } 
        i++;
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
      var i = 0;
      for(var k in doc){
        this.beachList.push(doc[k].data());
        switch(this.beachList[i].month){
          case 0:
            this.beachList[i].month = "JAN";
            break;
          case 1:
            this.beachList[i].month = "FEB";
            break;
          case 2:
            this.beachList[i].month = "MAR";
            break;
          case 3:
            this.beachList[i].month = "APR";
            break;
          case 4:
            this.beachList[i].month = "MAY";
            break;
          case 5:
            this.beachList[i].month = "JUN";
            break;
          case 6:
            this.beachList[i].month = "JUL";
            break;
          case 7:
            this.beachList[i].month = "AUG";
            break;
          case 8:
            this.beachList[i].month = "SEPT";
            break;
          case 9:
            this.beachList[i].month = "OCT";
            break;
          case 10:
            this.beachList[i].month = "NOV";
            break;
          case 11:
            this.beachList[i].month = "DEC";
            break;
          /* default:
            this.natureList[i].month = "NO";
            break; */
        } 
        i++;
        this.rawPost3 = doc[k].data();
        this.currentPost3 = this.rawPost3.postID;
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
      var i = 0;
      for(var k in doc){
        this.leisureList.push(doc[k].data());
        switch(this.leisureList[i].month){
          case 0:
            this.leisureList[i].month = "JAN";
            break;
          case 1:
            this.leisureList[i].month = "FEB";
            break;
          case 2:
            this.leisureList[i].month = "MAR";
            break;
          case 3:
            this.leisureList[i].month = "APR";
            break;
          case 4:
            this.leisureList[i].month = "MAY";
            break;
          case 5:
            this.leisureList[i].month = "JUN";
            break;
          case 6:
            this.leisureList[i].month = "JUL";
            break;
          case 7:
            this.leisureList[i].month = "AUG";
            break;
          case 8:
            this.leisureList[i].month = "SEPT";
            break;
          case 9:
            this.leisureList[i].month = "OCT";
            break;
          case 10:
            this.leisureList[i].month = "NOV";
            break;
          case 11:
            this.leisureList[i].month = "DEC";
            break;
          /* default:
            this.natureList[i].month = "NO";
            break; */
        } 
        i++;
        this.rawPost4 = doc[k].data();
        this.currentPost4 = this.rawPost4.postID;
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

  viewAuthor(uname:string){
    this.router.navigate(['/profile', uname]);
  }

  ngAfterViewInit(){

    const swiper = new Swiper(".sliderFeaturedPosts", {
      spaceBetween: 0,
      speed: 5000,
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
