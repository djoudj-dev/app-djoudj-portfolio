import { Routes } from '@angular/router';

/**
 * Configuration des routes de l'application.
 * Définit les différentes routes accessibles et les composants associés.
 * Inclut:
 * - La page d'accueil
 * - Des redirections vers les sections de la page d'accueil (à propos, compétences, projets, contact)
 * - Les pages légales (politique de confidentialité, CGU, mentions légales)
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page.component').then(m => m.HomePageComponent),
    title: 'Portfolio de Djoudj',
    pathMatch: 'full'
  },
  {
    path: 'about',
    redirectTo: '/#about',
    pathMatch: 'full'
  },
  {
    path: 'skills',
    redirectTo: '/#skills',
    pathMatch: 'full'
  },
  {
    path: 'projects',
    redirectTo: '/#projects',
    pathMatch: 'full'
  },
  {
    path: 'contact',
    redirectTo: '/#contact',
    pathMatch: 'full'
  },
  {
    path: 'legal/privacy',
    loadComponent: () => import('./legal/privacy/privacy.page.component').then(m => m.PrivacyPageComponent),
    title: 'Politique de Confidentialité'
  },
  {
    path: 'legal/terms',
    loadComponent: () => import('./legal/terms/terms.page.component').then(m => m.TermsPageComponent),
    title: 'Conditions Générales d\'Utilisation'
  },
  {
    path: 'legal/notice',
    loadComponent: () => import('./legal/notice/notice.page.component').then(m => m.NoticePageComponent),
    title: 'Mentions Légales'
  }
];
