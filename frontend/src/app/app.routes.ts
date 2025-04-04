import { Routes } from '@angular/router';
import { authGuardFn, adminGuardFn } from './auth/guards/auth.guard';

/**
 * Configuration des routes de l'application.
 * Définit les différentes routes accessibles et les composants associés.
 * Inclut:
 * - La page d'accueil
 * - Des redirections vers les sections de la page d'accueil (à propos, compétences, projets, contact)
 * - Les pages légales (politique de confidentialité, CGU, mentions légales)
 * - La page de connexion
 * - Des routes protégées (tableau de bord, profil) accessibles uniquement aux utilisateurs authentifiés
 * - Des routes d'administration accessibles uniquement aux administrateurs
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
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
    loadComponent: () => import('./legal/privacy/privacy.component').then(m => m.PrivacyComponent),
    title: 'Politique de Confidentialité'
  },
  {
    path: 'legal/terms',
    loadComponent: () => import('./legal/terms/terms.component').then(m => m.TermsComponent),
    title: 'Conditions Générales d\'Utilisation'
  },
  {
    path: 'legal/notice',
    loadComponent: () => import('./legal/notice/notice.component').then(m => m.NoticeComponent),
    title: 'Mentions Légales'
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/components/login/login.component').then(m => m.LoginComponent),
    title: 'Connexion'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent), // Placeholder, remplacer par le vrai composant
    title: 'Tableau de bord',
    canActivate: [authGuardFn]
  },
  {
    path: 'profile',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent), // Placeholder, remplacer par le vrai composant
    title: 'Mon profil',
    canActivate: [authGuardFn]
  },
  {
    path: 'admin',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent), // Placeholder, remplacer par le vrai composant
    title: 'Administration',
    canActivate: [adminGuardFn]
  }
];
