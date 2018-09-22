import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtlContactsComponent } from './dtl-contacts.component';

describe('DtlContactsComponent', () => {
  let component: DtlContactsComponent;
  let fixture: ComponentFixture<DtlContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtlContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtlContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
