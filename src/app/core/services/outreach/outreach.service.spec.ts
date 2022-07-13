import { TestBed } from '@angular/core/testing';

import { OutreachService } from './outreach.service';

describe('OutreachService', () => {
  let service: OutreachService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutreachService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
