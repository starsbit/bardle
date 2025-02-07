import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { BackgroundComponent } from './components/background/background.component';
import { GoogleAnalyticsTagComponent } from './components/google-analytics-tag/google-analytics-tag.component';
import { NavigationComponent } from './components/navigation/navigation.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the GoogleAnalyticsTagComponent', () => {
    const gaTag = fixture.debugElement.query(
      By.directive(GoogleAnalyticsTagComponent)
    );
    expect(gaTag).toBeTruthy();
  });

  it('should render the BackgroundComponent', () => {
    const background = fixture.debugElement.query(
      By.directive(BackgroundComponent)
    );
    expect(background).toBeTruthy();
  });

  it('should render the NavigationComponent inside the BackgroundComponent', () => {
    const background = fixture.debugElement.query(
      By.directive(BackgroundComponent)
    );
    const navigation = background.query(By.directive(NavigationComponent));
    expect(navigation).toBeTruthy();
  });

  it('should contain a RouterOutlet for dynamic content', () => {
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).toBeTruthy();
  });
});
