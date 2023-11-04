import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Option {
  name: string;
  selected: boolean;
}

interface Section {
  title: string;
  description: string;
  options?: Option[];
}

@Component({
  selector: 'app-getstarted',
  templateUrl: './getstarted.component.html',
  styleUrls: ['./getstarted.component.css','./getstarted.component1.css','./getstarted.component3.css','./getstarted.component4.css']
})
export class GetstartedComponent {

    constructor(
      public router: Router
    ){

    }

    sections: Section[] = [
        {
          title: 'Reason for visiting?',
          description: '"Having a clear itinerary is key to a smooth and unforgettable travel experience. Allow us to assist you in crafting your ideal trip!"',
          options: [
            { name: 'Adventure', selected: false },
            { name: 'Relaxation', selected: false },
            { name: 'Cultural Immersion', selected: false },
            { name: 'Education & Learning', selected: false },
            { name: 'Adventure Sports', selected: false },
            { name: 'Nature & Wildlife', selected: false },
            { name: 'Photography & Arts', selected: false },
            { name: 'Family & Friends', selected: false },
            { name: 'Celebrations', selected: false },
            { name: 'Hobby', selected: false },
            { name: 'Bucket List', selected: false },
            { name: 'Others', selected: false },
          ]
        },
        {
          title: 'Places you want to visit?',
          description: 'We list you some of the most talked municipalities in Batangas when it comes to tourist spots. In which place do you want to start travelling?',
          options: [
            { name: 'Batangas City', selected: false },
            { name: 'Mabini', selected: false },
            { name: 'San Juan', selected: false },
            { name: 'Lobo', selected: false },
            { name: 'Calatagan', selected: false },
            { name: 'Rosario', selected: false },
            { name: 'Lipa', selected: false },
            { name: 'Nasugbu', selected: false },
            { name: 'Tingloy', selected: false },
            { name: 'Taysan', selected: false },
            { name: 'Taal', selected: false },
            { name: 'Others', selected: false },
          ]
        },
        {
          title: 'Which Category of Tourist Spots?',
          description: 'There are lots of tourist spots in Batangas and it\'s now your choice to decide which category you like most.',
          options: [
            { name: 'Beaches & Resorts', selected: false },
            { name: 'Mountains', selected: false },
            { name: 'Island Hopping', selected: false },
            { name: 'Historical Sites', selected: false },
            { name: 'Eco Tourism', selected: false },
            { name: 'Heritage', selected: false },
            { name: 'Landmark', selected: false },
            { name: 'Others', selected: false },
          ]
        },
        {
          title: 'Suggestions',
          description: 'Based on the things you selected here are the lists of tourist spots for you. Not enough? Click explore more.',
        }
      ];

  currentSection = 0;
  progressSteps: boolean[] = [true, false, false, false]; // Initialize the first step as active, others as inactive

  goNext() {
    if (this.currentSection < this.sections.length - 1) {
      this.currentSection++;
      this.progressSteps[this.currentSection] = true;
    }
  }

  nav(where:any){
    this.router.navigate([where]);
  }

  goBack() {
    if (this.currentSection > 0) {
      this.currentSection--;
    }
  }

  toggleOption(option: Option) {
    option.selected = !option.selected;
  }
}
