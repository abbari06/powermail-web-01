import { TestBed } from '@angular/core/testing';

import { StorageHelperService } from './storage-helper.service';

describe('StorageHelperService', () => {
  let service: StorageHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
