import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterWithOptionsComponent } from './filter-with-options.component';

describe('FilterWithOptionsComponent', () => {
  let component: FilterWithOptionsComponent;
  let fixture: ComponentFixture<FilterWithOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterWithOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterWithOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
