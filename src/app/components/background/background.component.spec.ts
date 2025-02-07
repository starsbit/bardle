import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AssetService } from '../../services/web/asset.service';
import { BackgroundComponent } from './background.component';

describe('BackgroundComponent', () => {
  let component: BackgroundComponent;
  let fixture: ComponentFixture<BackgroundComponent>;
  let assetServiceSpy: jasmine.SpyObj<AssetService>;

  beforeEach(async () => {
    assetServiceSpy = jasmine.createSpyObj('AssetService', [
      'pickBackgroundOfTheDayLocation',
    ]);

    assetServiceSpy.pickBackgroundOfTheDayLocation.and.returnValue(
      'assets/backgrounds/background1.jpg'
    );

    await TestBed.configureTestingModule({
      providers: [{ provide: AssetService, useValue: assetServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(BackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the background image URL correctly', () => {
    expect(component.backgroundImageUrl).toBe(
      'assets/backgrounds/background1.jpg'
    );
    expect(assetServiceSpy.pickBackgroundOfTheDayLocation).toHaveBeenCalled();
  });

  it('should apply background image correctly via ngStyle', () => {
    const divElement = fixture.debugElement.query(By.css('.content'));

    expect(divElement).toBeTruthy();
    expect(divElement.nativeElement.style.backgroundImage).toContain(
      'url("assets/backgrounds/background1.jpg")'
    );
  });
});
