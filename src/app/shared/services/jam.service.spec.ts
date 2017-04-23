import { TestBed, inject } from '@angular/core/testing';

import { JamService } from './jam.service';

describe('JamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JamService]
    });
  });

  it('should ...', inject([JamService], (service: JamService) => {
    expect(service).toBeTruthy();
  }));
});
