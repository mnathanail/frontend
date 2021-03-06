import { TestBed } from '@angular/core/testing';

import { CanActivateChildAuthorizationGuard } from './can-activate-child-authorization.guard';

describe('CanActivateChildAuthorizationGuard', () => {
  let guard: CanActivateChildAuthorizationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActivateChildAuthorizationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
