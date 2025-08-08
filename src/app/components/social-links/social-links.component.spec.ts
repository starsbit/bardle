import { NgOptimizedImage } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SocialLinksComponent } from './social-links.component';

describe('SocialLinksComponent', () => {
  let component: SocialLinksComponent;
  let fixture: ComponentFixture<SocialLinksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgOptimizedImage],
    }).compileComponents();

    fixture = TestBed.createComponent(SocialLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain social media links', () => {
    const links = fixture.debugElement.queryAll(By.css('a'));

    expect(links.length).toBe(1);
    expect(links[0].nativeElement.href).toContain('https://x.com/starsbit1');
    expect(links[1].nativeElement.href).toContain('https://ko-fi.com/starsbit');
    expect(links[2].nativeElement.href).toContain(
      'https://steamcommunity.com/profiles/76561198162091272'
    );
    expect(links[3].nativeElement.href).toContain(
      'https://github.com/starsbit'
    );
  });

  it('should contain social media images with correct sources', () => {
    const images = fixture.debugElement.queryAll(By.css('img'));

    expect(images.length).toBe(1);
    expect(images[0].nativeElement.getAttribute('ngSrc')).toBe(
      'assets/images/social-logos/x.svg'
    );
    expect(images[1].nativeElement.getAttribute('ngSrc')).toBe(
      'assets/images/social-logos/ko-fi.svg'
    );
    expect(images[2].nativeElement.getAttribute('ngSrc')).toBe(
      'assets/images/social-logos/steam.svg'
    );
    expect(images[3].nativeElement.getAttribute('ngSrc')).toBe(
      'assets/images/social-logos/github.svg'
    );
  });
});
