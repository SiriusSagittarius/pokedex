import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './imprint.html',
  styleUrls: ['./imprint.scss'],
})
export class Imprint {
  constructor(public translateService: TranslateService) {}
}
