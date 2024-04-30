import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DalleService {
  private openAiUrl = 'https://api.openai.com/v1/images/edits';
  private openAiKey = environment.OpenAIKey;

  constructor(private http: HttpClient) {}

  async generateImage(
    alegria: number,
    tristeza: number,
    miedo: number,
    enojo: number,
    asco: number,
    sorpresa: number
  ): Promise<Observable<any>> {
    const formData = new FormData();

    const prompt = `Perro animado con las siguientes emociones en porcentajes: ${alegria}% alegría, ${tristeza}% tristeza, ${miedo}% miedo, ${enojo}% enojo, ${asco}% asco, ${sorpresa}% sorpresa`;

    const imageUrl = 'assets/images/dog.png';
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], 'dog.png', { type: blob.type });

    const imageUrlM = 'assets/images/mask_dog.png';
    const responseM = await fetch(imageUrlM);
    const blobM = await responseM.blob();
    const fileM = new File([blobM], 'mask_dog.png', { type: blob.type });

    formData.append('model', 'dall-e-2');
    formData.append('image', file);
    formData.append('mask', fileM);
    formData.append('prompt', prompt);
    formData.append('n', '1');
    formData.append('size', '256x256');

    return this.http.post(
      this.openAiUrl,
      formData,
      this.createDefaultOptions()
    );
  }

  private createDefaultOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.openAiKey}`,
      }),
    };
  }
}
