import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgOptimizedImage, CommonModule } from '@angular/common';

import { ButtonsComponent } from './components/buttons/buttons.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

import { ConexionService } from './services/conexion/conexion.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NgOptimizedImage,
    ButtonsComponent,
    BarChartComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'testApplicationToolkitWeb';
  imageUrl: string | null = null;
  loading: boolean = false;

  constructor(private conexionService: ConexionService) {}

  ngOnInit() {
    this.conexionService.imageUrl$.subscribe((url) => {
      this.imageUrl = url;
    });
  }

  handleLoading(loading: boolean) {
    this.loading = loading;
  }
}
