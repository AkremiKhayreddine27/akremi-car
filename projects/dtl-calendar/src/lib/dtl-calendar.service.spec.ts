import { TestBed, inject } from '@angular/core/testing';

import { DtlCalendarService } from './dtl-calendar.service';

describe('DtlCalendarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DtlCalendarService]
    });
  });

  it('should be created', inject([DtlCalendarService], (service: DtlCalendarService) => {
    expect(service).toBeTruthy();
  }));
});
