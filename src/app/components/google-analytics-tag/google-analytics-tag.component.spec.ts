import { ElementRef, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleAnalyticsTagComponent } from './google-analytics-tag.component';

describe('GoogleAnalyticsTagComponent', () => {
  let component: GoogleAnalyticsTagComponent;
  let fixture: ComponentFixture<GoogleAnalyticsTagComponent>;
  let rendererMock: jasmine.SpyObj<Renderer2>;
  let elementRefMock: jasmine.SpyObj<ElementRef>;

  beforeEach(async () => {
    rendererMock = jasmine.createSpyObj('Renderer2', [
      'createElement',
      'appendChild',
      'createText',
    ]);

    elementRefMock = {
      nativeElement: document.createElement('div'),
    } as ElementRef;

    await TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' }, // Default: Simulating Browser
        { provide: Renderer2, useValue: rendererMock },
        { provide: ElementRef, useValue: elementRefMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GoogleAnalyticsTagComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
