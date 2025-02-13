import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
      ],
      providers: [provideRouter(routes), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain navigation links with correct routes', () => {
    const links = fixture.debugElement.queryAll(By.css('a[routerLink]'));

    expect(links.length).toBe(3);
    expect(links[0].attributes['routerLink']).toBe('/');
    expect(links[1].attributes['routerLink']).toBe('/about');
    expect(links[2].attributes['routerLink']).toBe('/contact');
  });

  it('should toggle menu visibility when menu button is clicked', () => {
    const menuButton = fixture.debugElement.query(
      By.css('button[mat-icon-button]')
    );

    expect(component.menuOpen).toBeFalse(); // Initially closed

    menuButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.menuOpen).toBeTrue(); // Menu should open

    menuButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.menuOpen).toBeFalse(); // Menu should close
  });

  it('should show navigation links in desktop view and hide menu button', () => {
    const desktopNav = fixture.debugElement.query(By.css('.md\\:flex'));
    const menuButton = fixture.debugElement.query(
      By.css('button[mat-icon-button]')
    );

    expect(desktopNav.nativeElement).not.toHaveClass('invisible'); // Desktop nav should be visible
    expect(menuButton.nativeElement).toHaveClass('md:invisible'); // Menu button should be invisible
  });

  it('should show mobile menu when menu button is clicked', async () => {
    const menuButton = fixture.debugElement.query(
      By.css('button[mat-icon-button]')
    );

    menuButton.nativeElement.click(); // Simulate button click
    fixture.detectChanges(); // Trigger UI update
    await fixture.whenStable(); // Ensure Angular updates the DOM

    const mobileMenu = fixture.debugElement.query(By.css('nav.bg-white'));
    expect(mobileMenu).toBeTruthy(); // Menu should now be visible
  });

  it('should hide mobile menu when menuOpen is false', () => {
    component.menuOpen = false;
    fixture.detectChanges();

    const mobileMenu = fixture.debugElement.query(By.css('nav.bg-white'));
    expect(mobileMenu).toBeNull(); // Menu should not be present
  });
});
