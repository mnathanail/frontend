import { TestBed } from '@angular/core/testing';

import { CanActivateAuthorizationGuard } from './can-activate-authorization.guard';

describe('CanActivateAuthorizationGuard', () => {
  let guard: CanActivateAuthorizationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActivateAuthorizationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
