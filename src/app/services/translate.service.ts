import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private static readonly AVAILABLE_LANGUAGES: Language[] = [
    {
      code: 'en',
      name: $localize`:English|Label for English language@@EnglishLanguageLabel:English`,
    },
    {
      code: 'ja',
      name: $localize`:Japanese|Label for Japanese language@@JapaneseLanguageLabel:Japanese`,
    },
    {
      code: 'zh-Hans',
      name: $localize`:Chinese (Simplified)|Label for Chinese (Simplified) language@@ChineseSimplifiedLanguageLabel:Chinese (Simplified)`,
    },
    {
      code: 'ko',
      name: $localize`:Korean|Label for Korean language@@KoreanLanguageLabel:Korean`,
    },
  ];

  selectedLocale: Language = TranslateService.AVAILABLE_LANGUAGES[0];

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private router: Router
  ) {
    switch (locale) {
      case 'ja':
        this.selectedLocale = TranslateService.AVAILABLE_LANGUAGES[1];
        break;
      case 'zh':
        this.selectedLocale = TranslateService.AVAILABLE_LANGUAGES[2];
        break;
      case 'ko':
        this.selectedLocale = TranslateService.AVAILABLE_LANGUAGES[3];
        break;
      default:
        this.selectedLocale = TranslateService.AVAILABLE_LANGUAGES[0];
    }
  }

  getCurrentLang() {
    return this.selectedLocale;
  }

  use(lang: Language) {
    this.selectedLocale = lang;
  }

  getAvailableLanguages() {
    return TranslateService.AVAILABLE_LANGUAGES;
  }
}

export interface Language {
  code: string;
  name: string;
}
