import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-my-work',
  standalone: true,
  imports: [TranslateModule, NgOptimizedImage, ScrollAnimationDirective],
  templateUrl: './my-work.html',
  styleUrls: ['./my-work.scss'],
})
export class MyWork {
  projects = [
    {
      mockup: 'join.webp',
      width: 620,
      height: 393,
      name: 'Join',
      projectLanguage: 'JavaScript | HTML | CSS',
      description: 'join',
      link: 'join-kanban',
      liveTest: 'https://join.svenhaase.de/',
      translatedDescription: '',
    },
    {
      mockup: 'pollo_loco.webp',
      width: 512,
      height: 320,
      name: 'El Pollo Loco',
      projectLanguage: 'JavaScript | HTML | CSS',
      description: 'epl',
      link: 'El_Pollo_Loco',
      liveTest: 'https://epl.svenhaase.de/',
      translatedDescription: '',
    },
    {
      mockup: 'pokedex.webp',
      width: 530,
      height: 334,
      name: 'Pokedex',
      projectLanguage: 'Rest-Api |JavaScript | HTML | CSS',
      description: 'pokedex',
      link: 'Pokedex',
      liveTest: 'https://pokedex.svenhaase.de/',
      translatedDescription: '',
    },
  ];

  private languageChangeSubscription: Subscription | undefined;
  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateProjectDescriptions();
    this.languageChangeSubscription = this.translateService.onLangChange.subscribe(() => {
      this.translateProjectDescriptions();
    });
  }

  ngOnDestroy(): void {
    if (this.languageChangeSubscription) {
      this.languageChangeSubscription.unsubscribe();
    }
  }
  translateProjectDescriptions(): void {
    this.projects.forEach((project) => {
      const translationKey = `myWork.${project.description}`;
      this.translateService.get(translationKey).subscribe((translatedDescription: string) => {
        project.translatedDescription = translatedDescription;
      });
    });
  }

  isEven(index: number): boolean {
    return index % 2 === 0;
  }
}
