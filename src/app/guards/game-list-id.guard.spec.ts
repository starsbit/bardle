import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { gameListIdGuard } from './game-list-id.guard';

describe('gameListIdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => gameListIdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
