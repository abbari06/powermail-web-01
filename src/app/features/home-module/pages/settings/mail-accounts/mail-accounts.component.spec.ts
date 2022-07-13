import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailAccountsComponent } from './mail-accounts.component';

describe('MailAccountsComponent', () => {
  let component: MailAccountsComponent;
  let fixture: ComponentFixture<MailAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
