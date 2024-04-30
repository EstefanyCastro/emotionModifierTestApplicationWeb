import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolkitService {
  private baseUrl =
    'https://sgzan1udv6.execute-api.us-east-2.amazonaws.com/emotionModifier';

  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    console.error('Error calling Lambda function:', error);
    return throwError('Error calling Lambda function');
  }

  private extractBody(response: any): any {
    if (response && response.statusCode === 200) {
      return response.body;
    } else {
      throw new Error(
        'Error calling Lambda function. Status code: ' + response?.statusCode
      );
    }
  }

  callLambdaFunction(functionPath: string, event: any): Observable<any> {
    const url = `${this.baseUrl}/${functionPath}`;
    return this.http
      .post(url, event)
      .pipe(catchError(this.handleError), map(this.extractBody));
  }

  updateNegativeEmotions(
    emotionalEntity: number[],
    sadness: number,
    fear: number,
    anger: number,
    disgust: number
  ): Observable<any> {
    const event = {
      emotional_entity: emotionalEntity,
      sadness_amount: sadness,
      fear_amount: fear,
      anger_amount: anger,
      disgust_amount: disgust,
    };
    return this.callLambdaFunction('updateNegativeEmotions', event);
  }

  updatePositiveEmotions(
    emotionalEntity: number[],
    happiness: number,
    surprise: number
  ): Observable<any> {
    const event = {
      emotional_entity: emotionalEntity,
      happiness_amount: happiness,
      surprise_amount: surprise,
    };
    return this.callLambdaFunction('updatePositiveEmotions', event);
  }

  private emotionalEntity: number[] = [0, 0, 0, 0, 0, 0];

  caress(): Observable<any> {
    return this.updateNegativeEmotions(
      this.emotionalEntity,
      -5,
      -5,
      -3,
      -1
    ).pipe(
      switchMap((adjustedEmotions) =>
        this.updatePositiveEmotions(adjustedEmotions, 10, 3).pipe(
          tap((adjustedPositiveEmotions) => {
            this.emotionalEntity = adjustedPositiveEmotions;
          })
        )
      )
    );
  }

  indulge(): Observable<any> {
    return this.updateNegativeEmotions(
      this.emotionalEntity,
      -5,
      -2,
      -3,
      -1
    ).pipe(
      switchMap((adjustedEmotions) =>
        this.updatePositiveEmotions(adjustedEmotions, 10, 2).pipe(
          tap((adjustedPositiveEmotions) => {
            this.emotionalEntity = adjustedPositiveEmotions;
          })
        )
      )
    );
  }

  disgust(): Observable<any> {
    return this.updateNegativeEmotions(
      this.emotionalEntity,
      -1,
      -2,
      -1,
      5
    ).pipe(
      switchMap((adjustedEmotions) =>
        this.updatePositiveEmotions(adjustedEmotions, -2, 1).pipe(
          tap((adjustedPositiveEmotions) => {
            this.emotionalEntity = adjustedPositiveEmotions;
          })
        )
      )
    );
  }

  hit(): Observable<any> {
    return this.updateNegativeEmotions(this.emotionalEntity, 5, 4, 8, 2).pipe(
      switchMap((adjustedEmotions) =>
        this.updatePositiveEmotions(adjustedEmotions, -8, 1).pipe(
          tap((adjustedPositiveEmotions) => {
            this.emotionalEntity = adjustedPositiveEmotions;
          })
        )
      )
    );
  }

  leave(): Observable<any> {
    return this.updateNegativeEmotions(this.emotionalEntity, 8, 6, 1, -2).pipe(
      switchMap((adjustedEmotions) =>
        this.updatePositiveEmotions(adjustedEmotions, -5, -5).pipe(
          tap((adjustedPositiveEmotions) => {
            this.emotionalEntity = adjustedPositiveEmotions;
          })
        )
      )
    );
  }

  shame(): Observable<any> {
    return this.updateNegativeEmotions(this.emotionalEntity, 0, 2, 0, 4).pipe(
      switchMap((adjustedEmotions) =>
        this.updatePositiveEmotions(adjustedEmotions, -2, -2).pipe(
          tap((adjustedPositiveEmotions) => {
            this.emotionalEntity = adjustedPositiveEmotions;
          })
        )
      )
    );
  }

  guilty(): Observable<any> {
    return this.updateNegativeEmotions(
      this.emotionalEntity,
      -2,
      5,
      -3,
      -1
    ).pipe(
      switchMap((adjustedEmotions) =>
        this.updatePositiveEmotions(adjustedEmotions, 3, 0).pipe(
          tap((adjustedPositiveEmotions) => {
            this.emotionalEntity = adjustedPositiveEmotions;
          })
        )
      )
    );
  }

  envy(): Observable<any> {
    return this.updateNegativeEmotions(this.emotionalEntity, 5, 0, 6, 1).pipe(
      switchMap((adjustedEmotions) =>
        this.updatePositiveEmotions(adjustedEmotions, -3, 1).pipe(
          tap((adjustedPositiveEmotions) => {
            this.emotionalEntity = adjustedPositiveEmotions;
          })
        )
      )
    );
  }

  alarm(): Observable<any> {
    return this.updateNegativeEmotions(this.emotionalEntity, 1, 7, 2, 1).pipe(
      switchMap((adjustedEmotions) =>
        this.updatePositiveEmotions(adjustedEmotions, -5, 5).pipe(
          tap((adjustedPositiveEmotions) => {
            this.emotionalEntity = adjustedPositiveEmotions;
          })
        )
      )
    );
  }

  nag(): Observable<any> {
    return this.updateNegativeEmotions(this.emotionalEntity, 6, 3, 1, 0).pipe(
      switchMap((adjustedEmotions) =>
        this.updatePositiveEmotions(adjustedEmotions, -3, 2).pipe(
          tap((adjustedPositiveEmotions) => {
            this.emotionalEntity = adjustedPositiveEmotions;
          })
        )
      )
    );
  }
}
