import { Component } from '@angular/core';
/* import "../../../assets/js/adminMain.js"; */
import { Chart } from 'chart.js/auto';
import { FireServiceService } from 'src/app/services/fire-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../../assets/css/adminPages.css']
})
export class DashboardComponent {

  constructor(
    public fireService:FireServiceService
  ){
    this.getCounts();
  }

  counterDoc:any

  getCounts(){
    this.fireService.getDocumentCounter().then((doc)=>{
      if(doc){
        this.counterDoc = doc;
      }
    });
  }

  ngAfterViewInit(){
    const canv = document.getElementById("chart-1")! as HTMLCanvasElement;
    const ctx1 = canv.getContext("2d")!;
    const myChart = new Chart(ctx1, {
      type: "polarArea",
      data: {
        labels: ["Nature", "Cultural", "Industrial", "Sun&Beach", "Leisure&Ent", "Conventions", "Health"],
        datasets: [
          {
            label: "# of Votes",
            data: [300, 800, 1000, 400, 1000, 800, 500],
            backgroundColor: [
              "#37505C",
              "#20696C",
              "#69A4A6",
              "#2D3B3B",
              "#37505C",
              "#20696C",
              "#69A4A6",

            ],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    const canv2 = document.getElementById("chart-2")! as HTMLCanvasElement;
    const ctx2 = canv2.getContext("2d")!;
    const myChart2 = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: ["June", "July", "August"],
        datasets: [
          {
            label: "Users Interaction",
            data: [600, 800, 1000],
            backgroundColor: [
              "#0a8d95",
              "#64c3ca",
              "#0c3d40",
            ],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }
  list:any;

  ngOnInit(){
    /* this.getNumbers();
    this.getCategoryCount(); */
    this.list = document.querySelectorAll(".navigation li");
    this.list[1].classList.add("hovered");

  }




  //functions

  usersCount:any;
  tspotCount:any;
  natureCategCount:any;

  async getNumbers(){
    this.usersCount = await this.fireService.getDocumentCount('users');
    console.log(this.usersCount); 
    this.tspotCount = await this.fireService.getDocumentCount('tourist_spots');
    console.log(this.tspotCount); 
  }

  async getCategoryCount() {
    const collectionName = 'tourist_spots'; // Replace with your collection name
    const fieldName = 'category'; // Replace with the field to filter on
    const condition = '=='; // Replace with your condition (e.g., '>', '<', '==')
    const value = 'Nature'; // Replace with the value to compare against
    
    /* this.natureCategCount = await this.fireService.countDocuments(collectionName, fieldName, condition, value); */
    console.log(`Count of documents matching the condition: ${this.natureCategCount}`);
  }

  
}
