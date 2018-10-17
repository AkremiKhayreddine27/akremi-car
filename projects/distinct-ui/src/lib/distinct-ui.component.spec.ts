import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistinctUiComponent } from './distinct-ui.component';

describe('DistinctUiComponent', () => {
  let component: DistinctUiComponent;
  let fixture: ComponentFixture<DistinctUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistinctUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistinctUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
