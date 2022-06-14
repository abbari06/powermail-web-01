import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUserProfilesComponent } from './all-user-profiles.component';

describe('AllUserProfilesComponent', () => {
  let component: AllUserProfilesComponent;
  let fixture: ComponentFixture<AllUserProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllUserProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUserProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
