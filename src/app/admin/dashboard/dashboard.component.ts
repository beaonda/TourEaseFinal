import { Component } from '@angular/core';
import {Chart} from 'chart.js/auto';
import '../../../assets/js/adminMain.js';
import loadScript from 'load-script';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.css',
    '../../../assets/css/adminPages.css']
})
export class DashboardComponent {

  constructor(){

  }

  ngOnDestroy(){
    document.body.classList.remove('g-sidenav-show');
    document.body.classList.remove('bg-gray-100');
  }

  ngOnInit(){
    this.loadExternalScript('https://kit.fontawesome.com/42d5adcbca.js')
      .then(() => {
        // The external script has been loaded successfully.
        // You can now use any functions or variables defined by the script.
        this.initializeExternalScript();
      })
      .catch(error => {
        console.error('Error loading external script:', error);
      });
      this.loadExternalScript('https://buttons.github.io/buttons.js')
      .then(() => {
        // The external script has been loaded successfully.
        // You can now use any functions or variables defined by the script.
        this.initializeExternalScript();
      })
      .catch(error => {
        console.error('Error loading external script:', error);
      });
    document.body.classList.add('g-sidenav-show');
    document.body.classList.add('bg-gray-100');
  var canvas1 = document.getElementById('pie-chart') as HTMLCanvasElement;
  if(canvas1){
    const ctx = canvas1.getContext('2d');
     // Pie chart data
    var data = {
      labels: ['Heritages', 'Hikes and Trails', 'Resorts'],
      datasets: [{
        data: [30, 50, 20], // Example data values
        backgroundColor: ['#64c3ca', '#0c3d40', '#0a8d95'], // Example colors
      }],
    };

    // Pie chart options
    var options = {
      responsive: true,
      maintainAspectRatio: false,
    };

    // Create a new pie chart
    if(ctx){
      var pieChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: options,
    });
    }
    
  } else {
    console.error('Canvas element not found');
  }
  
  
  var canvas2 = document.getElementById("chart-line") as HTMLCanvasElement;
  if(canvas2){
    const ctx1 = canvas2.getContext("2d");
    if(ctx1){
      var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

      gradientStroke1.addColorStop(1, 'rgba(94, 114, 228, 0.2)');
      gradientStroke1.addColorStop(0.2, 'rgba(94, 114, 228, 0.0)');
      gradientStroke1.addColorStop(0, 'rgba(94, 114, 228, 0)');
      new Chart(ctx1, {
        type: "line",
        data: {
          labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [{
            label: "Mobile apps",
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: "#0a8d95",
            backgroundColor: gradientStroke1,
            fill: true,
            data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
            
    
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            }
          },
          interaction: {
            intersect: false,
            mode: 'index',
          },
          scales: {
            y: {
              grid: {
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
              },
              ticks: {
                display: true,
                padding: 10,
                color: '#fbfbfb',
                font: {
                  size: 11,
                  family: "Open Sans",
                  style: 'normal',
                  lineHeight: 2
                },
              }
            },
            x: {
              grid: {
  
                display: false,
                drawOnChartArea: false,
                drawTicks: false,

              },
              ticks: {
                display: true,
                color: '#ccc',
                padding: 20,
                font: {
                  size: 11,
                  family: "Open Sans",
                  style: 'normal',
                  lineHeight: 2
                },
              }
            },
          },
        },
      });
    }
  }else{
    console.log("Canvas not found.");
  }
  

  
  }

  loadExternalScript(scriptUrl: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      loadScript(scriptUrl, (error, script) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  initializeExternalScript() {
    // This is where you can use functions or variables defined by the external script.
    // For example:
    // externalFunction();
  }
}
