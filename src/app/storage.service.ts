import { Injectable, Inject } from '@angular/core';
import { Portfolio } from './portfolio';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  key = 'portfolios';

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, ) { }

  save(portfolios: Portfolio[]) {
    this.localStorage.setItem(this.key, JSON.stringify(portfolios));
  }

  load() {
    return JSON.parse(this.localStorage.getItem(this.key));
  }
}
