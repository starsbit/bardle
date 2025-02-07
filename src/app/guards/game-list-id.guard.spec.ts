import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { StudentList } from '../models/student-list';
import { GameListIdGuard } from './game-list-id.guard';

describe('GameListIdGuard', () => {
  let guard: GameListIdGuard;
  let routerSpy: jasmine.SpyObj<Router>;
  let mockRoute: jasmine.SpyObj<ActivatedRouteSnapshot>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);
    mockRoute = jasmine.createSpyObj('ActivatedRouteSnapshot', [], {
      paramMap: new Map<string, string>(),
    });

    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerSpy }],
    });

    guard = TestBed.inject(GameListIdGuard);
  });

  it('should create the guard', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation if listId is valid', () => {
    const validListId = StudentList.JAPAN.toLowerCase();
    mockRoute.paramMap.get = jasmine.createSpy().and.returnValue(validListId);

    const result = guard.canActivate(mockRoute);
    expect(result).toBeTrue();
  });

  it('should redirect to "/game/japan" if listId is invalid', () => {
    mockRoute.paramMap.get = jasmine
      .createSpy()
      .and.returnValue('invalid-list');

    const expectedUrlTree = {} as unknown as UrlTree;
    routerSpy.createUrlTree.and.returnValue(expectedUrlTree);

    const result = guard.canActivate(mockRoute);
    expect(routerSpy.createUrlTree).toHaveBeenCalledWith([
      '/game',
      StudentList.JAPAN.toLowerCase(),
    ]);
    expect(result).toBe(expectedUrlTree);
  });

  it('should redirect to "/game/japan" if listId is missing', () => {
    mockRoute.paramMap.get = jasmine.createSpy().and.returnValue(null);

    const expectedUrlTree = {} as unknown as UrlTree;
    routerSpy.createUrlTree.and.returnValue(expectedUrlTree);

    const result = guard.canActivate(mockRoute);
    expect(routerSpy.createUrlTree).toHaveBeenCalledWith([
      '/game',
      StudentList.JAPAN.toLowerCase(),
    ]);
    expect(result).toBe(expectedUrlTree);
  });
});
