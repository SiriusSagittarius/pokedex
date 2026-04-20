import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
})
export class Footer {
  private router = inject(Router);

  navigateToImprint() {
    this.router.navigateByUrl('/imprint').then(() => {
      window.scrollTo(0, 0);
    });
  }

  navigateToHome() {
    this.router.navigateByUrl('/').then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
