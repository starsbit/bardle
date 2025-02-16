import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load the image correctly', () => {
    const imgElement = fixture.debugElement.query(By.css('footer img'))
      .nativeElement as HTMLImageElement;

    expect(imgElement).toBeTruthy();
    expect(imgElement.src).toContain('assets/images/logos/starsbit-black.png'); // Checks the image path
    expect(imgElement.alt).toBe('starsbit logo'); // Ensures correct alt text
  });

  it('should display the correct copyright year', () => {
    const currentYear = new Date().getFullYear();
    const copyrightText = fixture.debugElement.query(By.css('footer p'))
      .nativeElement.textContent;

    expect(copyrightText).toContain(`© ${currentYear} - starsbit`);
  });
});
