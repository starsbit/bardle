import { TitleCasePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Language, TranslateService } from '../../services/translate.service';
import { LanguageSelectionComponent } from './language-selection.component';

describe('LanguageSelectionComponent', () => {
  let component: LanguageSelectionComponent;
  let fixture: ComponentFixture<LanguageSelectionComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [TranslateService, TitleCasePipe],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the current language', () => {
    const currentLang = translateService.getCurrentLang();
    expect(component.selectedLanguage.value).toEqual(currentLang);
  });

  it('should display available languages', () => {
    const availableLanguages: Language[] =
      translateService.getAvailableLanguages();
    expect(component.languages).toEqual(availableLanguages);
  });

  it('should change the language when a new language is selected', () => {
    const newLanguage: Language = { code: 'ja', name: 'Japanese' };
    component.onLanguageChange({
      source: undefined as unknown as MatSelect,
      value: newLanguage,
    });
    expect(translateService.getCurrentLang()).toEqual(newLanguage);
  });

  it('should update the form control value when the language is changed', () => {
    const newLanguage: Language = { code: 'ja', name: 'Japanese' };
    component.selectedLanguage.setValue(newLanguage);
    expect(component.selectedLanguage.value).toEqual(newLanguage);
  });
});
