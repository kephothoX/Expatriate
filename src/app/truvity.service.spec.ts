import { TestBed } from '@angular/core/testing';

import { TruvityService } from './truvity.service';

describe('TruvityService', () => {
  let service: TruvityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TruvityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
