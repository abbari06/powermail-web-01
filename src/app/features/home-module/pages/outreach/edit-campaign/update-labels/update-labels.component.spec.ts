import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLabelsComponent } from './update-labels.component';

describe('UpdateLabelsComponent', () => {
  let component: UpdateLabelsComponent;
  let fixture: ComponentFixture<UpdateLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLabelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
