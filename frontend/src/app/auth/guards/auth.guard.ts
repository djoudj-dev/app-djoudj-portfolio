import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard qui protège les routes nécessitant une authentification.
 * Redirige vers la page de connexion si l'utilisateur n'est pas authentifié.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Vérifie si l'utilisateur peut accéder à une route protégée.
   * @returns boolean|UrlTree True si l'utilisateur est authentifié, sinon redirige vers la page de connexion
   */
  canActivate(): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    return this.router.createUrlTree(['/login']);
  }
}

/**
 * Fonction factory pour le guard d'authentification.
 * Utilisée dans la configuration des routes.
 */
export const authGuardFn: CanActivateFn = () => {
  return inject(AuthGuard).canActivate();
};

/**
 * Fonction factory pour le guard d'administration.
 * Vérifie si l'utilisateur est authentifié et a le rôle d'administrateur.
 */
export const adminGuardFn: CanActivateFn = () => {
  inject(AuthGuard);
  const authService = inject(AuthService);
  const router = inject(Router);

  // Vérifier d'abord si l'utilisateur est authentifié
  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  // Vérifier ensuite si l'utilisateur a le rôle d'administrateur
  if (authService.hasRole('admin')) {
    return true;
  }

  // Rediriger vers la page d'accueil si l'utilisateur n'a pas le rôle d'administrateur
  return router.createUrlTree(['/']);
};
