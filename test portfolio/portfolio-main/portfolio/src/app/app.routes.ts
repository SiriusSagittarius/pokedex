import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./layout/main/main').then((m) => m.Main) },
  {
    path: 'imprint',
    loadComponent: () => import('./shared/components/imprint/imprint').then((m) => m.Imprint),
  },
  {
    path: 'privacy',
    loadComponent: () => import('./shared/components/privacy/privacy').then((m) => m.Privacy),
  },
];
