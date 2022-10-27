import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectShowComponent } from './inspect-show.component';

describe('InspectShowComponent', () => {
  let component: InspectShowComponent;
  let fixture: ComponentFixture<InspectShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
