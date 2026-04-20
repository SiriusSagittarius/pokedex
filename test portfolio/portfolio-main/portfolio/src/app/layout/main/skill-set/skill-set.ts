import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-skill-set',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './skill-set.html',
  styleUrls: ['./skill-set.scss'],
})
export class SkillSet {
  imagePath: string = '/assets/img/icons/skill-set/desktop/';

  hoveredSkill: any = null;

  skillIcons = [
    { icon: 'vuejs.svg', name: 'Vue.js' },
    { icon: 'wordpress.svg', name: 'WordPress' },
    { icon: 'angular.svg', name: 'Angular' },
    { icon: 'api.svg', name: 'Rest-Api' },
    { icon: 'cloud.svg', name: 'Cloud' },
    { icon: 'css.svg', name: 'CSS' },
    { icon: 'django.svg', name: 'Django' },
    { icon: 'docker.svg', name: 'Docker' },
    { icon: 'firebase.svg', name: 'Firebase' },
    { icon: 'flask.svg', name: 'Flask' },
    { icon: 'git.svg', name: 'GIT' },
    { icon: 'typescript.svg', name: 'TypeScript' },
    { icon: 'heroku.svg', name: 'Heroku' },
    { icon: 'html.svg', name: 'HTML' },
    { icon: 'javascript.svg', name: 'JavaScript' },
    { icon: 'linux.svg', name: 'Linux' },
    { icon: 'material.svg', name: 'Material Design' },
    { icon: 'postgresql.svg', name: 'PostgreSQL' },
    { icon: 'python.svg', name: 'Python' },
    { icon: 'redis.svg', name: 'Redis' },
    { icon: 'rxjs.svg', name: 'RxJS' },
    { icon: 'scrum.svg', name: 'Scrum' },
    { icon: 'sql.svg', name: 'SQL' },
    { icon: 'supabase.svg', name: 'Supabase' },
    { icon: 'grow.svg', name: 'Growth\nmindset', hoverIcon: 'hover.svg' },
  ];
}
