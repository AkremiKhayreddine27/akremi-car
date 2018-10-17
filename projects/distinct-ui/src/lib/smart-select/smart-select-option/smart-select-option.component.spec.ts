import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartSelectOptionComponent } from './smart-select-option.component';

describe('SmartSelectOptionComponent', () => {
  let component: SmartSelectOptionComponent;
  let fixture: ComponentFixture<SmartSelectOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartSelectOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartSelectOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
