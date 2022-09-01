import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-campaign-stats',
  templateUrl: './campaign-stats.component.html',
  styleUrls: ['./campaign-stats.component.scss']
})
export class CampaignStatsComponent implements OnInit {
  canvas: any;
  ctx: any;
  // @ViewChild('mychart') mychart:any;
  constructor() {}

  ngOnInit(): void { 
}
  ngAfterViewInit() {
    this.barchar();
    this.piechart();
  }

  barchar() {
    // this.canvas = this.mychart.nativeElement;
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
          },
        ],
      },
    });
  }

  piechart() {
    console.log('pie');

    this.canvas = document.getElementById('pieChart');
    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
          },
        ],
      },
    });
  }
}