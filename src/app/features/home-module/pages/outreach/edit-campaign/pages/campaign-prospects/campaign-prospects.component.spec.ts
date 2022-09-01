import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignProspectsComponent } from './campaign-prospects.component';

describe('CampaignProspectsComponent', () => {
  let component: CampaignProspectsComponent;
  let fixture: ComponentFixture<CampaignProspectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignProspectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignProspectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
