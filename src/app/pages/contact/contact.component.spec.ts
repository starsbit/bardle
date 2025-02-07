import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
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

  it('should display the correct year', () => {
    const yearElement = fixture.debugElement.query(By.css('footer .year'))
      .nativeElement as HTMLElement;

    expect(yearElement).toBeTruthy();
    expect(yearElement.textContent).toContain(new Date().getFullYear());
  });
});
