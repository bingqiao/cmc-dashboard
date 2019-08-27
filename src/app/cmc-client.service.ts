import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CmcClientService {


  constructor(private http: HttpClient) { }

  getListing(unit?: string) {
    return this.http.get(`${environment.apiHost}/listing/${unit || 'USD'}`);
  }

  getQuotes(symbols: string[]) {
    if (!symbols || !symbols.length) {
      return throwError('Invalid symbols for quotes request');  
    }
    const symbol = symbols.join(',');
    return this.http.get(`${environment.apiHost}/quotes/${symbol}`);
  }
}
