import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtlDocumentsComponent } from './dtl-documents.component';

describe('DtlDocumentsComponent', () => {
  let component: DtlDocumentsComponent;
  let fixture: ComponentFixture<DtlDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtlDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtlDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
