import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { ThemeService } from '../../../shared/services/theme.service';

/**
 * Interface définissant les informations de contact affichées sur la page.
 */
interface ContactInfo {
  /** Chemin de l'icône (déterminé dynamiquement par getIconPath) */
  icon: string;
  /** Titre de l'information de contact */
  title: string;
  /** Valeur principale de l'information */
  value: string;
  /** Lien optionnel associé à l'information */
  link?: string;
  /** Texte descriptif optionnel */
  text?: string;
}

/**
 * Interface définissant un lien vers un réseau social.
 */
interface SocialLink {
  /** Nom du réseau social */
  name: string;
  /** Chemin de l'icône */
  icon: string;
  /** URL du profil */
  url: string;
}

/**
 * Composant de la page de contact.
 * Gère l'affichage des informations de contact, des liens vers les réseaux sociaux
 * et le formulaire de contact.
 */
@Component({
  selector: 'app-contact-page',
  imports: [ReactiveFormsModule, NgClass, NgOptimizedImage],
  templateUrl: './contact.page.component.html'
})
export class ContactPageComponent {
  /** Formulaire de contact */
  contactForm: FormGroup;
  /** Indique si le formulaire a été soumis */
  formSubmitted = signal<boolean>(false);
  /** Indique si la soumission du formulaire a réussi */
  formSuccess = signal<boolean>(false);

  /** Cartes d'informations de contact */
  contactInfo = signal<ContactInfo[]>([
    {
      icon: '', // Icon is now determined by getIconPath method
      title: 'Email',
      value: 'contact@nedellec-julien.fr',
      link: 'mailto:contact@nedellec-julien.fr',
      text: 'Pour toute opportunité de mission ou proposition de collaboration.'
    },
    {
      icon: '', // Icon is now determined by getIconPath method
      title: 'Téléphone',
      value: '06.22.86.92.79',
      link: 'tel:+33622869279',
      text: 'Disponible en semaine de 9h00 à 16h00'
    },
    {
      icon: '', // Icon is now determined by getIconPath method
      title: 'Localisation',
      value: 'Voisins-Le-Bretonneux, France',
      link: 'https://www.google.com/maps/place/Voisins-Le-Bretonneux,+France',
      text: 'Déplacement autour de ma localisation négociable'
    },
    {
      icon: '', // Icon is now determined by getIconPath method
      title: 'Réseaux sociaux',
      value: 'Suivez-moi'
    }
  ]);

  /** Liens vers les réseaux sociaux */
  socialLinks = signal<SocialLink[]>([
    {
      name: 'LinkedIn',
      icon: '/icons/logo/linkedin.svg',
      url: 'https://www.linkedin.com/in/nedellec-julien/'
    },
    {
      name: 'GitHub',
      icon: '', // Icon is now determined by getSocialIconPath method
      url: 'https://github.com/djoudj-dev'
    },
    {
      name: 'X',
      icon: '/icons/logo/x.svg',
      url: 'https://x.com/djoudj_dev'
    }
  ]);

  constructor(
    private fb: FormBuilder,
    public themeService: ThemeService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(400)]]
    });
  }

  /**
   * Vérifie si le mode sombre est activé
   * @returns Vrai si le mode sombre est activé, faux sinon
   */
  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  /**
   * Soumet le formulaire de contact
   */
  onSubmit(): void {
    this.formSubmitted.set(true);

    if (this.contactForm.valid) {
      // Ici, on enverrait normalement les données du formulaire à un service backend
      console.log('Formulaire soumis:', this.contactForm.value);

      // Simulation d'une soumission réussie
      this.formSuccess.set(true);
      this.contactForm.reset();
      this.formSubmitted.set(false);

      // Réinitialisation du message de succès après 5 secondes
      setTimeout(() => {
        this.formSuccess.set(false);
      }, 5000);
    }
  }

  /**
   * Vérifie si un champ du formulaire a une erreur spécifique
   * @param controlName Nom du champ à vérifier
   * @param errorName Nom de l'erreur à vérifier
   * @returns Vrai si le champ a l'erreur spécifiée, faux sinon
   */
  hasError(controlName: string, errorName: string): boolean {
    const control = this.contactForm.get(controlName);
    return control?.touched && control?.hasError(errorName) || false;
  }

  /**
   * Vérifie si un champ du formulaire est invalide
   * @param controlName Nom du champ à vérifier
   * @returns Vrai si le champ est invalide et a été touché, faux sinon
   */
  isInvalid(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return control?.touched && control?.invalid || false;
  }

  /**
   * Obtient le nombre actuel de caractères dans le champ message
   * @returns Nombre de caractères dans le champ message
   */
  getMessageCharCount(): number {
    const messageControl = this.contactForm.get('message');
    return messageControl?.value?.length || 0;
  }

  /**
   * Obtient le chemin d'icône approprié en fonction du titre et du thème
   * @param title Titre de l'information de contact
   * @returns Chemin de l'icône correspondante
   */
  getIconPath(title: string): string {
    const isDark = this.isDarkMode();

    switch (title) {
      case 'Email':
        return isDark ? '/icons/logo/mail-dark.svg' : '/icons/logo/mail-light.svg';
      case 'Téléphone':
        return isDark ? '/icons/logo/phone-dark.svg' : '/icons/logo/phone-light.svg';
      case 'Localisation':
        return isDark ? '/icons/logo/home-dark.svg' : '/icons/logo/home-light.svg';
      case 'Réseaux sociaux':
        return isDark ? '/icons/logo/rs-dark.svg' : '/icons/logo/rs-light.svg';
      default:
        return '/icons/logo/mail-light.svg'; // Fallback
    }
  }

  /**
   * Obtient le chemin d'icône approprié pour un réseau social en fonction de la plateforme et du thème
   * @param social Objet contenant les informations du réseau social
   * @returns Chemin de l'icône correspondante
   */
  getSocialIconPath(social: SocialLink): string {
    const isDark = this.isDarkMode();

    switch (social.name) {
      case 'GitHub':
        return isDark ? '/icons/logo/github-dark.svg' : '/icons/logo/github-light.svg';
      case 'LinkedIn':
        return social.icon; // No theme-specific icons for LinkedIn yet
      case 'Twitter':
        return social.icon; // No theme-specific icons for Twitter yet
      default:
        return social.icon; // Use the default icon if no theme-specific icon is available
    }
  }
}
