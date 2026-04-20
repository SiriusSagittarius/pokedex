import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgOptimizedImage } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, NgOptimizedImage],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header implements OnInit, OnDestroy, AfterViewInit {
  private scrollListener: (() => void) | null = null;
  private elementRef = inject(ElementRef);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  constructor(public translateService: TranslateService) {}

  ngOnInit(): void {
    this.addScrollAnimation();
    
   
    this.updateMetaTags();

    
    this.translateService.onLangChange.subscribe(() => {
      this.updateMetaTags();
    });
  }

  ngAfterViewInit(): void {
    this.updateHeaderHeight();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateHeaderHeight();
  }

  private updateHeaderHeight(): void {
    
    if (typeof document !== 'undefined') {
      const headerHeight = this.elementRef.nativeElement.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    }
  }

  ngOnDestroy(): void {
    this.removeScrollAnimation();
  }

  /**
   * Adds smooth scroll animation to scroll indicator
   */
  private addScrollAnimation(): void {
    this.scrollListener = () => {
      const scrollLine = document.querySelector(
        '.header-btn-box-scroll-line',
      ) as HTMLElement | null;

      if (scrollLine) {
        const scrollPercent = (window.scrollY / window.innerHeight) * 100;
        scrollLine.style.opacity = Math.max(0, 1 - scrollPercent / 100).toString();

        if (window.scrollY > window.innerHeight) {
          scrollLine.style.display = 'none';
        } else {
          scrollLine.style.display = 'block';
        }
      }
    };

    window.addEventListener('scroll', this.scrollListener);
  }

  
  private removeScrollAnimation(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  
  private updateMetaTags(): void {
    const title = 'Sven Haase | Fullstack Developer';
    
    const description = this.translateService.instant('contact.hero') || 'Angular-Frontend trifft Python-Backend. Ich biete Clean Code und messbaren Mehrwert für Ihre digitale Vision.';

   
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: 'Sven Haase, Fullstack Developer, Angular, Python, Webentwickler, Portfolio, Much' });
    this.metaService.updateTag({ name: 'author', content: 'Sven Haase' });
    
    
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://svenhaase.de/' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://svenhaase.de/assets/img/preview.jpg' });
  }
}
