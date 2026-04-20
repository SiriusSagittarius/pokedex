import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './references.html',
  styleUrls: ['./references.scss'],
})
export class References {
  currentIndex = 0;
  readonly totalCards = 3;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalCards;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
  }

  setIndex(index: number) {
    this.currentIndex = index;
  }
}
