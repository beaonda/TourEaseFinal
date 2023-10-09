import { Component } from '@angular/core';
/* import "../../../assets/js/adminMain.js"; */
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../../assets/css/adminPages.css']
})
export class DashboardComponent {

  constructor(){

  }

  ngOnInit(){
    const canv = document.getElementById("chart-1")! as HTMLCanvasElement;
    const ctx1 = canv.getContext("2d")!;
    const myChart = new Chart(ctx1, {
      type: "polarArea",
      data: {
        labels: ["Heritage", "Hikes & Trails", "Resorts"],
        datasets: [
          {
            label: "# of Votes",
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
}
