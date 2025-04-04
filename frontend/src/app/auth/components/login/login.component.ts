import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  // Signaux d'état du formulaire
  email = signal('');
  password = signal('');
  rememberMe = signal(false);
  touched = signal<Record<string, boolean>>({
    email: false,
    password: false
  });

  // Signaux d'état de l'interface utilisateur
  isSubmitting = signal(false);
  loginError = signal<string | null>(null);

  constructor(private authService: AuthService, private router: Router) {}

  // Valeurs calculées pour la validation
  emailValid = computed(() => {
    const value = this.email();
    if (!value) return { valid: false, required: true, email: false };

    // Expression régulière simple pour la validation d'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      valid: emailRegex.test(value),
      required: false,
      email: !emailRegex.test(value)
    };
  });

  passwordValid = computed(() => {
    const value = this.password();
    if (!value) return { valid: false, required: true, minlength: false };

    return {
      valid: value.length >= 8,
      required: false,
      minlength: value.length < 8
    };
  });

  formValid = computed(() =>
    this.emailValid().valid && this.passwordValid().valid
  );

  // Marquer le champ comme touché
  markTouched(field: string): void {
    this.touched.update(current => ({ ...current, [field]: true }));
  }

  // Vérifier si le champ a été touché
  isTouched(field: string): boolean {
    return this.touched()[field] || false;
  }

  onSubmit(): void {
    // Marquer tous les champs comme touchés
    this.touched.set({
      email: true,
      password: true
    });

    if (!this.formValid()) {
      return;
    }

    this.isSubmitting.set(true);
    this.loginError.set(null);

    // Utiliser le service d'authentification pour se connecter
    this.authService.login(
      this.email(),
      this.password(),
      this.rememberMe()
    ).then(success => {
      if (success) {
        console.log('Connexion réussie');
        // Rediriger vers la page d'accueil après une connexion réussie
        this.router.navigate(['/']);
      } else {
        this.loginError.set('Email ou mot de passe invalide. Veuillez réessayer.');
      }
      this.isSubmitting.set(false);
    }).catch(error => {
      console.error('Erreur lors de la connexion:', error);
      this.loginError.set('Une erreur est survenue lors de la connexion. Veuillez réessayer.');
      this.isSubmitting.set(false);
    });
  }
}
