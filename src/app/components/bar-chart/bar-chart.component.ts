import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { EmotionsService } from '../../services/emotions/emotions.service';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  public barChartLegend = true;
  public barChartPlugins = [];
  emotions: number[] | null = null;

  public barChartData: BaseChartDirective<'bar'>['data'] = {
    labels: ['Alegría', 'Tristeza', 'Miedo', 'Enojo', 'Asco', 'Sorpresa'],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0],
        label: 'Cantidad de emoción',
        backgroundColor: [
          '#FFFF00',
          '#0000FF',
          '#800080',
          '#FF0000',
          '#008000',
          '#FFA500',
        ],
      },
    ],
  };

  public barChartOptions: BaseChartDirective<'bar'>['options'] = {
    responsive: false,
  };

  constructor(private emotionsService: EmotionsService) {}

  ngOnInit() {
    console.log('BarChartData en ngOnInit:', this.barChartData);
    this.emotionsService.emotions$.subscribe((emotions) => {
      this.updateChartData(emotions);
    });
  }

  updateChartData(emotions: number[]) {
    console.log('Datos de emociones:', emotions);
    if (this.barChartData && this.barChartData.datasets) {
      this.barChartData.datasets[0].data = emotions;
      this.chart?.update();
    }
  }
}
