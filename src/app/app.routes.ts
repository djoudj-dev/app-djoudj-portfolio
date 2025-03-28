import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page.component').then(m => m.HomePageComponent),
    title: 'Portfolio de Djoudj',
    pathMatch: 'full'
  },
];
