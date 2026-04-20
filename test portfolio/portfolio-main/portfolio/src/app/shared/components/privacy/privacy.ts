import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './privacy.html',
  styleUrls: ['./privacy.scss'],
})
export class Privacy {}