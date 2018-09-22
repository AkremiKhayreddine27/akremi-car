import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtlCalendarComponent } from './dtl-calendar.component';

describe('DtlCalendarComponent', () => {
  let component: DtlCalendarComponent;
  let fixture: ComponentFixture<DtlCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtlCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtlCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
