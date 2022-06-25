import { TestBed } from '@angular/core/testing';

import { ProspectesService } from './prospectes.service';

describe('ProspectesService', () => {
  let service: ProspectesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProspectesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
