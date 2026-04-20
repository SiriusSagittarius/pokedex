import { CommonModule, NgOptimizedImage, DOCUMENT } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.scss'],
})
export class Navigation {
  isImprintPage: boolean = false;
  showBackButton: boolean = false;
  isChecked: boolean = false;
  isEnActive: boolean = true;
  isDeActive: boolean = false;
  showOverlay: boolean = false;
  mobileNavImage = 'assets/img/icons/logo.webp';
  isScrolled: boolean = false;

  public translateService = inject(TranslateService);
  private router = inject(Router);
  private document = inject(DOCUMENT);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isImprintPage = event.url === '/imprint' || event.url === '/privacy';
        this.showBackButton = event.url === '/imprint' || event.url === '/privacy';
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 1;
  }
  changeLanguage(langCode: string) {
    this.translateService.use(langCode);

    // Aktualisiert <html lang="..."> für Screenreader & Lighthouse
    this.document.documentElement.lang = langCode;

    if (langCode === 'en') {
      this.isEnActive = true;
      this.isDeActive = false;
    } else if (langCode === 'de') {
      this.isEnActive = false;
      this.isDeActive = true;
    }
  }

  toggle() {
    this.isChecked = !this.isChecked;
    this.showOverlay = this.isChecked;

    if (this.isChecked) {
      this.mobileNavImage = 'assets/img/icons/logo.webp';
    } else {
      this.mobileNavImage = 'assets/img/icons/logo.webp';
    }
  }

  closeMenu() {
    this.isChecked = false;
    this.showOverlay = false;

    this.mobileNavImage = 'assets/img/icons/logo-white.svg';
  }

  scrollToTop() {
    this.router.navigate(['/']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
