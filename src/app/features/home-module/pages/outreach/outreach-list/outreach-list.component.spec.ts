import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutreachListComponent } from './outreach-list.component';

describe('OutreachListComponent', () => {
  let component: OutreachListComponent;
  let fixture: ComponentFixture<OutreachListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutreachListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutreachListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
