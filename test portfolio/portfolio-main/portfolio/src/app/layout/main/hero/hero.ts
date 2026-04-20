import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslateModule, NgOptimizedImage],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
})
export class Hero {
  constructor(public translateService: TranslateService) {}

  changeLanguage(langCode: string) {
    this.translateService.use(langCode);
  }
}
