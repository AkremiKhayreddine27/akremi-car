import { TestBed, inject } from '@angular/core/testing';

import { DistinctUiService } from './distinct-ui.service';

describe('DistinctUiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistinctUiService]
    });
  });

  it('should be created', inject([DistinctUiService], (service: DistinctUiService) => {
    expect(service).toBeTruthy();
  }));
});
