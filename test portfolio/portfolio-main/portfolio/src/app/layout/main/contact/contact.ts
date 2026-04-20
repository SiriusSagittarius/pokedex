import { NgOptimizedImage } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, TranslateModule, RouterLink, NgOptimizedImage],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class Contact {
  translateService = inject(TranslateService);
  private router = inject(Router);
  http = inject(HttpClient);

  readOrNot: boolean = false;
  isSuccessMessageVisible = signal(false);

  contactData = {
    name: '',
    email: '',
    message: '',
  };

  post = {
    endPoint: 'https://svenhaase.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
      },
      responseType: 'text' as const,
    },
  };

  navigateToPrivacy() {
    this.router.navigateByUrl('/privacy').then(() => {
      window.scrollTo(0, 0);
    });
  }

  onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted) {
      if (!this.readOrNot) {
        console.error('Please accept the privacy policy');

        return;
      }

      this.http
        .post(this.post.endPoint, this.post.body(this.contactData), this.post.options)
        .subscribe({
          next: (response) => {
            ngForm.resetForm();
            this.showSuccessMessage();
          },
          error: (error) => {
            console.error('Error submitting form:', error);
          },
          complete: () => {},
        });
    }
  }

  private showSuccessMessage() {
    this.isSuccessMessageVisible.set(true);

    setTimeout(() => {
      this.isSuccessMessageVisible.set(false);
    }, 1500);
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  isFormValid(contactForm: NgForm): boolean {
    return contactForm.form.valid && this.readOrNot;
  }
}
