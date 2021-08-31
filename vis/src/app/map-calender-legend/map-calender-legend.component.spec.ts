import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCalenderLegendComponent } from './map-calender-legend.component';

describe('MapCalenderLegendComponent', () => {
  let component: MapCalenderLegendComponent;
  let fixture: ComponentFixture<MapCalenderLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapCalenderLegendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapCalenderLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
