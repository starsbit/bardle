import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAnalyticsTagComponent } from './google-analytics-tag.component';

describe('GoogleAnalyticsTagComponent', () => {
  let component: GoogleAnalyticsTagComponent;
  let fixture: ComponentFixture<GoogleAnalyticsTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleAnalyticsTagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleAnalyticsTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
