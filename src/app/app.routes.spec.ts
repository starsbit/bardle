import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';

describe('App Routing Module', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should navigate to "about" and load AboutComponent', async () => {
    await router.navigate(['/about']);
    expect(location.path()).toBe('/about');
  });

  it('should navigate to "contact" and load ContactComponent', async () => {
    await router.navigate(['/contact']);
    expect(location.path()).toBe('/contact');
  });

  it('should redirect unknown paths to "/"', async () => {
    await router.navigate(['/random-path']);
    expect(location.path()).toBe('');
  });
});
