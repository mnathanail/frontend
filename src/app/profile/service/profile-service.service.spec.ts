import { TestBed } from '@angular/core/testing';

import { SummaryMessagesService } from './summary/summary-messages.service';

describe('ProfileServiceService', () => {
  let service: SummaryMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SummaryMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
