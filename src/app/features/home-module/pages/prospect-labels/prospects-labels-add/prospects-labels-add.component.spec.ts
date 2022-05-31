import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectsLabelsAddComponent } from './prospects-labels-add.component';

describe('ProspectsLabelsAddComponent', () => {
  let component: ProspectsLabelsAddComponent;
  let fixture: ComponentFixture<ProspectsLabelsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectsLabelsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectsLabelsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
