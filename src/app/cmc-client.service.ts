import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CmcClientService {

  constructor(private http: HttpClient) { }

  getListing() {
    return this.http.get('https://dd5jvh69wl.execute-api.eu-west-2.amazonaws.com/dev/listing');
  }

  getQuotes(symbols: string[]) {
    if (!symbols || !symbols.length) {
      throw new Error('Invalid symbols for quotes request');      
    }
    const symbol = symbols.join(',');
    return this.http.get(`https://dd5jvh69wl.execute-api.eu-west-2.amazonaws.com/dev/quotes/${symbol}`);
  }
}
