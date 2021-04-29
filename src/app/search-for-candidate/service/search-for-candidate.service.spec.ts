import { TestBed } from '@angular/core/testing';

import { SearchForCandidateService } from './search-for-candidate.service';

describe('SearchForCandidateService', () => {
  let service: SearchForCandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchForCandidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
