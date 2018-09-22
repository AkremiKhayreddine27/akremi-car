import { TestBed, inject } from '@angular/core/testing';

import { DtlContactsService } from './dtl-contacts.service';

describe('DtlContactsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DtlContactsService]
    });
  });

  it('should be created', inject([DtlContactsService], (service: DtlContactsService) => {
    expect(service).toBeTruthy();
  }));
});
