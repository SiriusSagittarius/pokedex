import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './layout/footer/footer';
import { Navigation } from './layout/navigation/navigation';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  
  imports: [RouterOutlet, Footer, Navigation, TranslateModule] as const,
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  title = 'Sven Haase';

  constructor(public translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}