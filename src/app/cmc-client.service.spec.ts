import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CmcClientService } from './cmc-client.service';

describe('CmcClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: CmcClientService = TestBed.get(CmcClientService);
    expect(service).toBeTruthy();
  });
});
