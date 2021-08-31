import { ComponentFixture, TestBed } from '@angular/core/testing';

import { USmapComponent } from './usmap.component';

describe('USmapComponent', () => {
  let component: USmapComponent;
  let fixture: ComponentFixture<USmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ USmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(USmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
