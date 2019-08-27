import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../environments/environment';
import { CmcClientService } from './cmc-client.service';

fdescribe('CmcClientService', () => {
  let httpMock: HttpTestingController;
  let service: CmcClientService;
  let listing = {
    data: [
      {
        circulating_supply: 17897737,
        cmc_rank: 1,
        date_added: "2013-04-28T00:00:00.000Z",
        id: 1,
        last_updated: "2019-08-26T09:13:35.000Z",
        max_supply: 21000000,
        name: "Bitcoin",
        num_market_pairs: 7926,
        platform: null,
        quote: {
          USD: {
            last_updated: "2019-08-26T09:13:35.000Z",
            market_cap: 184976054945.17905,
            percent_change_1h: -0.0128234,
            percent_change_7d: -2.53834,
            percent_change_24h: 1.99929,
            price: 10335.164437,
            volume_24h: 18439665569.1783
          }
        },
        slug: "bitcoin",
        symbol: "BTC",
        tags: ["mineable"],
        0: "mineable",
        total_supply: 17897737
      }
    ],
    status: {
      credit_count: 12,
      elapsed: 188,
      error_code: 0,
      error_message: null,
      timestamp: "2019-08-26T09:14:11.723Z",
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(CmcClientService);
    httpMock = TestBed.get(HttpTestingController);
  }
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get listing for USD if no unit provided', () => {

    service.getListing().subscribe((res: any) => {
      expect(res).toEqual(listing);
    });

    const req = httpMock.expectOne(`${environment.apiHost}/listing/USD`);
    expect(req.request.method).toEqual("GET");
    req.flush(listing);

    httpMock.verify();
  });

  it('should get listing for GBP if GBP provided', () => {

    service.getListing('GBP').subscribe((res: any) => {
      expect(res).toEqual(listing);
    });

    const req = httpMock.expectOne(`${environment.apiHost}/listing/GBP`);
    expect(req.request.method).toEqual("GET");
    req.flush(listing);

    httpMock.verify();
  });


  it('should throw error if symbols invalid', () => {

    service.getQuotes(null).subscribe((res: any) => {
      fail();
    }, err => {
      expect(err).toEqual('Invalid symbols for quotes request');
    });
  });
});
