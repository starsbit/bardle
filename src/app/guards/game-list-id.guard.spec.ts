import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { GameListIdGuard } from './game-list-id.guard';

describe('GameListIdGuard', () => {
  let guard: GameListIdGuard;
  let routerSpy: jasmine.SpyObj<Router>;
  let route: ActivatedRouteSnapshot;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);
    guard = new GameListIdGuard(routerSpy);
    route = jasmine.createSpyObj('ActivatedRouteSnapshot', [], {
      paramMap: new Map(),
    });
  });

  it('should activate for valid listId', () => {
    (route.paramMap as any) = new Map([['listId', 'japan']]);
    expect(guard.canActivate(route)).toBeTrue();
  });

  it('should redirect for invalid listId', () => {
    (route.paramMap as any) = new Map([['listId', 'invalid']]);
    routerSpy.createUrlTree.and.returnValue('redirectUrl' as any);
    expect(guard.canActivate(route)).toBe('redirectUrl' as any);
  });
});
