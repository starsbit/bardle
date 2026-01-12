import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { environment } from '../../../environments/environment';
import { Language, TranslateService } from '../../services/translate.service';

@Component({
  selector: 'ba-language-selection',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    TitleCasePipe,
  ],
  templateUrl: './language-selection.component.html',
  styleUrl: './language-selection.component.scss',
})
export class LanguageSelectionComponent {
  private translateService = inject(TranslateService);

  selectedLanguage: FormControl<Language | null>;
  languages: Language[] = [];
  baseUrl = environment.baseUrl;

  constructor() {
    this.selectedLanguage = new FormControl<Language | null>(
      this.translateService.getCurrentLang()
    );
    this.languages = this.translateService.getAvailableLanguages();
  }

  onLanguageChange(language: MatSelectChange) {
    this.translateService.use(language.value);
  }
}
