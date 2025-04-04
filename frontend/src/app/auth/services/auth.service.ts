import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Signal pour stocker l'utilisateur courant
  private currentUserSignal = signal<User | null>(null);

  // Signal calculé pour vérifier si l'utilisateur est authentifié
  isAuthenticated = computed(() => !!this.currentUserSignal());

  // Signal calculé pour exposer l'utilisateur courant
  currentUser = computed(() => this.currentUserSignal());

  // Utilisateur de test pour la démonstration
  private mockUser: User = {
    id: '1',
    email: 'admin@mail.com',
    password: 'admin123',
    role: 'admin',
    token: 'mock-jwt-token'
  };

  constructor(private router: Router) {
    // Vérifier si un utilisateur est déjà stocké dans le localStorage
    this.checkStoredUser();
  }

  /**
   * Vérifie si un utilisateur est déjà stocké dans le localStorage
   * et met à jour le signal currentUser si c'est le cas
   */
  private checkStoredUser(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        // Vérifier que l'utilisateur a les propriétés requises
        if (user && user.id && user.email && user.role) {
          this.currentUserSignal.set(user);
        } else {
          console.error('Utilisateur stocké invalide:', user);
          localStorage.removeItem('currentUser');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur stocké:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }

  /**
   * Authentifie un utilisateur avec son email et mot de passe
   * @param email Email de l'utilisateur
   * @param password Mot de passe de l'utilisateur
   * @param rememberMe Si true, stocke l'utilisateur dans le localStorage
   * @returns Promise<boolean> True si l'authentification réussit, false sinon
   */
  login(email: string, password: string, rememberMe: boolean = false): Promise<boolean> {
    return new Promise((resolve) => {
      // Simulation d'un délai réseau
      setTimeout(() => {
        // Vérification des identifiants avec l'utilisateur de test
        if (email === this.mockUser.email && password === 'admin123') {
          // Créer une copie de l'utilisateur sans le mot de passe
          const userWithoutPassword = { ...this.mockUser };
          delete userWithoutPassword.password;

          // Mettre à jour le signal avec l'utilisateur sans mot de passe
          this.currentUserSignal.set(userWithoutPassword);

          // Stocker l'utilisateur dans le localStorage si rememberMe est true
          if (rememberMe) {
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
          }

          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  }

  /**
   * Déconnecte l'utilisateur courant
   */
  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  /**
   * Vérifie si l'utilisateur a un rôle spécifique
   * @param role Le rôle à vérifier
   * @returns boolean True si l'utilisateur a le rôle spécifié, false sinon
   */
  hasRole(role: 'admin' | 'user'): boolean {
    const user = this.currentUserSignal();
    return !!user && user.role === role;
  }
}
