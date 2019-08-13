import { TestBed } from '@angular/core/testing';

import { CmcClientService } from './cmc-client.service';

describe('CmcClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CmcClientService = TestBed.get(CmcClientService);
    expect(service).toBeTruthy();
  });
});
