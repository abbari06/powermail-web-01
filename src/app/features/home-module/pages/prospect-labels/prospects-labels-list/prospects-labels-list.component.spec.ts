import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectsLabelsListComponent } from './prospects-labels-list.component';

describe('ProspectsLabelsListComponent', () => {
  let component: ProspectsLabelsListComponent;
  let fixture: ComponentFixture<ProspectsLabelsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectsLabelsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectsLabelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
