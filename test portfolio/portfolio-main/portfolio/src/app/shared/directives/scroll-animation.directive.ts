import { Directive, ElementRef, OnInit, OnDestroy, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true,
})
export class ScrollAnimationDirective implements OnInit, OnDestroy {
  // Standard-Animation ist 'fade-in-up', kann aber im HTML überschrieben werden
  @Input() appScrollAnimation: string = 'fade-in-up';

  private observer!: IntersectionObserver;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    // Element initial verstecken und Animations-Klasse setzen
    this.renderer.addClass(this.el.nativeElement, 'hidden-animate');
    if (this.appScrollAnimation) {
      this.renderer.addClass(this.el.nativeElement, this.appScrollAnimation);
    }

    // Intersection Observer einrichten
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.el.nativeElement, 'show-animate');
          } else {
            // Entferne diese Zeile, wenn die Animation nur einmal (wie aos-once="true") ablaufen soll
            this.renderer.removeClass(this.el.nativeElement, 'show-animate');
          }
        });
      },
      {
        threshold: 0.1, // Animation startet, wenn das Element zu 10% sichtbar ist
        rootMargin: '0px 0px -50px 0px', // Startet leicht bevor es voll im Bild ist
      },
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
