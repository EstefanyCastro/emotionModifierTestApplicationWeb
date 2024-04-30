import { TestBed } from '@angular/core/testing';

import { DalleService } from './dalle.service';

describe('DalleService', () => {
  let service: DalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
