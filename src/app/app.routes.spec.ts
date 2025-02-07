import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
import { GameListIdGuard } from './guards/game-list-id.guard';

describe('App Routing Module', () => {
  let router: Router;
  let location: Location;
  let gameListIdGuardSpy: jasmine.SpyObj<GameListIdGuard>;

  beforeEach(async () => {
    gameListIdGuardSpy = jasmine.createSpyObj('GameListIdGuard', [
      'canActivate',
    ]);

    await TestBed.configureTestingModule({
      providers: [
        { provide: GameListIdGuard, useValue: gameListIdGuardSpy },
        provideRouter(routes),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should navigate to "game/:listId" and trigger GameListIdGuard', async () => {
    gameListIdGuardSpy.canActivate.and.returnValue(true);

    await router.navigate(['/game/japan']);
    expect(location.path()).toBe('/game/japan');
    expect(gameListIdGuardSpy.canActivate).toHaveBeenCalled();
  });

  it('should navigate to "about" and load AboutComponent', async () => {
    await router.navigate(['/about']);
    expect(location.path()).toBe('/about');
  });

  it('should navigate to "contact" and load ContactComponent', async () => {
    await router.navigate(['/contact']);
    expect(location.path()).toBe('/contact');
  });

  it('should redirect unknown paths to "/game/japan"', async () => {
    await router.navigate(['/random-path']);
    expect(location.path()).toBe('/game/japan');
  });
});
