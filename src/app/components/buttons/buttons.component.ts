import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';

import { ToolkitService } from '../../services/toolkit/toolkit.service';
import { DalleService } from '../../services/dalle/dalle.service';
import { ConexionService } from '../../services/conexion/conexion.service';
import { EmotionsService } from '../../services/emotions/emotions.service';

declare const bootstrap: any;

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
})
export class ButtonsComponent {
  imageUrl: string | null = null;

  constructor(
    private toolkitService: ToolkitService,
    private dalleService: DalleService,
    private conexionService: ConexionService,
    private emotionsService: EmotionsService,
    private appComponent: AppComponent
  ) {}

  ngAfterViewInit(): void {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  async handleButtonClick(action: () => Promise<any>) {
    this.appComponent.handleLoading(true);
    try {
      const adjustPositiveEmotions = await action();
      this.emotionsService.setEmotions(adjustPositiveEmotions);
      console.log('Positive emotions response:', adjustPositiveEmotions);
      const respuesta = await this.dalleService.generateImage(
        adjustPositiveEmotions[0],
        adjustPositiveEmotions[1],
        adjustPositiveEmotions[2],
        adjustPositiveEmotions[3],
        adjustPositiveEmotions[4],
        adjustPositiveEmotions[5]
      );
      respuesta.subscribe(
        (response) => {
          this.imageUrl = response.data[0].url;
          console.log(this.imageUrl);
          if (this.imageUrl !== null) {
            this.conexionService.setImageUrl(this.imageUrl);
          }
          this.appComponent.handleLoading(false);
        },
        (error) => {
          console.error('Error generating image:', error);
          this.appComponent.handleLoading(false);
        }
      );
    } catch (error) {
      console.error('Error updating emotions:', error);
      this.appComponent.handleLoading(false);
    }
  }

  onCaressButtonClick() {
    this.handleButtonClick(() => this.toolkitService.caress().toPromise());
  }

  onIndulgeButtonClick() {
    this.handleButtonClick(() => this.toolkitService.indulge().toPromise());
  }

  onDisgustButtonClick() {
    this.handleButtonClick(() => this.toolkitService.disgust().toPromise());
  }

  onHitButtonClick() {
    this.handleButtonClick(() => this.toolkitService.hit().toPromise());
  }

  onLeaveButtonClick() {
    this.handleButtonClick(() => this.toolkitService.leave().toPromise());
  }

  onShameButtonClick() {
    this.handleButtonClick(() => this.toolkitService.shame().toPromise());
  }

  onGuiltyButtonClick() {
    this.handleButtonClick(() => this.toolkitService.guilty().toPromise());
  }

  onEnvyButtonClick() {
    this.handleButtonClick(() => this.toolkitService.envy().toPromise());
  }

  onAlarmButtonClick() {
    this.handleButtonClick(() => this.toolkitService.alarm().toPromise());
  }

  onNagButtonClick() {
    this.handleButtonClick(() => this.toolkitService.nag().toPromise());
  }
}
