import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderPlotComponent } from './calender-plot.component';

describe('CalenderPlotComponent', () => {
  let component: CalenderPlotComponent;
  let fixture: ComponentFixture<CalenderPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenderPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
