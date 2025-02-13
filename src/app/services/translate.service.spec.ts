import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Language, TranslateService } from './translate.service';

describe('TranslateService', () => {
  let service: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TranslateService,
        { provide: LOCALE_ID, useValue: 'en' }, // Default locale for testing
      ],
    });
    service = TestBed.inject(TranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default language as English', () => {
    expect(service.getCurrentLang().code).toBe('en');
  });

  it('should return available languages', () => {
    const availableLanguages: Language[] = service.getAvailableLanguages();
    expect(availableLanguages.length).toBe(4);
    expect(availableLanguages).toContain({ code: 'en', name: 'English' });
    expect(availableLanguages).toContain({ code: 'ja', name: 'Japanese' });
    expect(availableLanguages).toContain({
      code: 'zh-Hans',
      name: 'Chinese (Simplified)',
    });
    expect(availableLanguages).toContain({ code: 'ko', name: 'Korean' });
  });

  it('should change the current language', () => {
    const japanese: Language = { code: 'ja', name: 'Japanese' };
    service.use(japanese);
    expect(service.getCurrentLang().code).toBe('ja');
  });

  it('should set the correct language based on locale', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        TranslateService,
        { provide: LOCALE_ID, useValue: 'ja' }, // Set locale to Japanese
      ],
    });
    service = TestBed.inject(TranslateService);
    expect(service.getCurrentLang().code).toBe('ja');

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        TranslateService,
        { provide: LOCALE_ID, useValue: 'zh' }, // Set locale to Chinese (Simplified)
      ],
    });
    service = TestBed.inject(TranslateService);
    expect(service.getCurrentLang().code).toBe('zh-Hans');

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        TranslateService,
        { provide: LOCALE_ID, useValue: 'ko' }, // Set locale to Korean
      ],
    });
    service = TestBed.inject(TranslateService);
    expect(service.getCurrentLang().code).toBe('ko');
  });
});
