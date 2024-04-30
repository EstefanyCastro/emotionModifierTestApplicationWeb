import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConexionService {
  private imageUrlSubject = new Subject<string>();

  constructor() {}

  imageUrl$ = this.imageUrlSubject.asObservable();

  setImageUrl(url: string) {
    this.imageUrlSubject.next(url);
  }
}
