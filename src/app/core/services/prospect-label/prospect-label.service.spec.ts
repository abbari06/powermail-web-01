import { TestBed } from '@angular/core/testing';

import { ProspectLabelService } from './prospect-label.service';

describe('ProspectLabelService', () => {
  let service: ProspectLabelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProspectLabelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
