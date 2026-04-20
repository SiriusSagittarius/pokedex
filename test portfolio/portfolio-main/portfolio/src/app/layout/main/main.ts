import { Component } from '@angular/core';
import { Contact } from './contact/contact';
import { Header } from '../header/header';
import { Hero } from './hero/hero';
import { MyWork } from './my-work/my-work';
import { References } from "./references/references";
import { SkillSet } from './skill-set/skill-set';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [Header, Hero, SkillSet, MyWork, References, Contact],
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Main {}
