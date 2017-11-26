import { TestBed, inject } from '@angular/core/testing';

import { BlastLoadService } from './blast-load.service';

describe('BlastLoadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlastLoadService]
    });
  });

  it('should be created', inject([BlastLoadService], (service: BlastLoadService) => {
    expect(service).toBeTruthy();
  }));
});
