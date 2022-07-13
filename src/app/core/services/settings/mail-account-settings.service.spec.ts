import { TestBed } from '@angular/core/testing';

import { MailAccountSettingsService } from './mail-account-settings.service';

describe('MailAccountSettingsService', () => {
  let service: MailAccountSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailAccountSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
