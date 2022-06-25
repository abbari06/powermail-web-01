import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvMappingComponent } from './csv-mapping.component';

describe('CsvMappingComponent', () => {
  let component: CsvMappingComponent;
  let fixture: ComponentFixture<CsvMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
