import { Injectable } from '@angular/core';
import { Portfolio } from './portfolio';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  key = 'portfolios';

  constructor() { }

  save(portfolios: Portfolio[]) {
    localStorage.setItem(this.key, JSON.stringify(portfolios));
  }

  load() {
    return JSON.parse(localStorage.getItem(this.key));
  }
}
