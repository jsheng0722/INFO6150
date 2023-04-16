import { TestBed } from '@angular/core/testing';

import { GlobaltaskService } from './globaltask.service';

describe('GlobaltaskService', () => {
  let service: GlobaltaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobaltaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
