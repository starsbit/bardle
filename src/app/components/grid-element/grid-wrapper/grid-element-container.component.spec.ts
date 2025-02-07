import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GridElementContainerComponent } from './grid-element-container.component';

describe('GridElementContainerComponent', () => {
  let component: GridElementContainerComponent;
  let fixture: ComponentFixture<GridElementContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(GridElementContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply isFlipped class when flipped', fakeAsync(() => {
    component.isFlipped = 'true';
    fixture.detectChanges();
    fixture.whenStable();
    tick(400);

    const gridElement = fixture.debugElement.query(By.css('div.w-14'));
    expect(gridElement.nativeElement.classList).toContain('flip');
  }));

  it('should remove isFlipped class when reset', fakeAsync(() => {
    component.isFlipped = 'true';
    fixture.detectChanges();
    component.ngOnChanges({
      isFlipped: {
        currentValue: 'true',
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    fixture.whenStable();
    tick(400);

    component.isFlipped = '';
    fixture.detectChanges();
    component.ngOnChanges({
      isFlipped: {
        currentValue: '',
        previousValue: 'true',
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    fixture.whenStable();
    tick(400);

    const gridElement = fixture.debugElement.query(By.css('div.w-14'));
    expect(gridElement.nativeElement.classList).not.toContain('flip');
  }));

  it('should apply animation delay correctly', fakeAsync(() => {
    component.animationDelayMs = 500;
    fixture.detectChanges();
    fixture.whenStable();
    tick(500);

    const gridElement = fixture.debugElement.query(By.css('div.w-14'));
    expect(gridElement.nativeElement.style.animationDelay).toBe('500ms');
  }));

  it('should show children after animation delay', fakeAsync(() => {
    component.animationDelayMs = 500;
    fixture.detectChanges();
    fixture.whenStable();
    tick(500);

    // Initially hidden
    let childContainer = fixture.debugElement.query(By.css('div > div > div'));
    expect(childContainer.nativeElement.classList).toContain('hidden');

    // Simulate the timeout delay
    component.ngOnChanges({
      isFlipped: {
        currentValue: 'true',
        previousValue: '',
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    tick(900); // animationDelayMs + 400ms
    fixture.detectChanges();

    // Now should be visible
    childContainer = fixture.debugElement.query(By.css('div > div > div'));
    expect(childContainer.nativeElement.classList).not.toContain('hidden');
  }));

  it('should start win animation when won is true', fakeAsync(() => {
    component.won = true;
    fixture.detectChanges();
    fixture.whenStable();
    tick(400);

    const gridElement = fixture.debugElement.query(By.css('div.w-14'));
    component.onAnimationEnd(new AnimationEvent('animationend'));
    fixture.detectChanges();

    expect(gridElement.nativeElement.classList).toContain('win');
  }));

  it('should not start win animation when won is false', fakeAsync(() => {
    component.won = false;
    fixture.detectChanges();
    fixture.whenStable();
    tick(400);

    const gridElement = fixture.debugElement.query(By.css('div.w-14'));
    component.onAnimationEnd(new AnimationEvent('animationend'));
    fixture.detectChanges();

    expect(gridElement.nativeElement.classList).not.toContain('win');
  }));
});
