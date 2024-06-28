import { TestBed } from '@angular/core/testing';

import { AlretsService } from './alrets.service';

describe('AlretsService', () => {
  let service: AlretsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlretsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
