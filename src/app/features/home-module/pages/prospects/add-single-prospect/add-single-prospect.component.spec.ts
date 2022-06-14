import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSingleProspectComponent } from './add-single-prospect.component';

describe('AddSingleProspectComponent', () => {
  let component: AddSingleProspectComponent;
  let fixture: ComponentFixture<AddSingleProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSingleProspectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSingleProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
