import { TestBed, inject } from '@angular/core/testing';

import { DtlDocumentsService } from './dtl-documents.service';

describe('DtlDocumentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DtlDocumentsService]
    });
  });

  it('should be created', inject([DtlDocumentsService], (service: DtlDocumentsService) => {
    expect(service).toBeTruthy();
  }));
});
