import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmotionsService {
  private emotionsSubject = new Subject<number[]>();

  constructor() {}

  emotions$ = this.emotionsSubject.asObservable();

  setEmotions(emotions: number[]) {
    this.emotionsSubject.next(emotions);
  }
}
