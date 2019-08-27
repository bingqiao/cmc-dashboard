import { TestBed } from '@angular/core/testing';

import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: LOCAL_STORAGE}
    ]
  }));

  it('should be created', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });
});
