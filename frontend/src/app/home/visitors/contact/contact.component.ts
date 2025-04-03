import { Component, computed } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { ThemeService } from '../../../shared/services/theme.service';
import { ContactInfo, SocialLink } from './models/contact.model';
import { ContactService } from './service/contact.service';

/**
 * Composant de la page de contact.
 * Gère l'affichage des informations de contact, des liens vers les réseaux sociaux
 * et le formulaire de contact.
 */
@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, NgClass, NgOptimizedImage],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  /** Formulaire de contact */
  contactForm: FormGroup;

  /** Accesseurs pour les données du composant */
  contactInfo = computed<ContactInfo[]>(() => this.contactService.getContactInfo());
  socialLinks = computed<SocialLink[]>(() => this.contactService.getSocialLinks());
  formSubmitted = computed<boolean>(() => this.contactService.isFormSubmitted());
  formSuccess = computed<boolean>(() => this.contactService.isFormSuccess());

  constructor(
    private fb: FormBuilder,
    public themeService: ThemeService,
    private contactService: ContactService
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
    this.contactService.updateContactData({ formSubmitted: true });

    if (this.contactForm.valid) {
      // Ici, on enverrait normalement les données du formulaire à un service backend
      console.log('Formulaire soumis:', this.contactForm.value);

      // Simulation d'une soumission réussie
      this.contactService.updateContactData({ formSuccess: true, formSubmitted: false });
      this.contactForm.reset();

      // Réinitialisation du message de succès après 5 secondes
      setTimeout(() => {
        this.contactService.updateContactData({ formSuccess: false });
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
    return this.contactService.getIconPath(title);
  }

  /**
   * Obtient le chemin d'icône approprié pour un réseau social en fonction de la plateforme et du thème
   * @param social Objet contenant les informations du réseau social
   * @returns Chemin de l'icône correspondante
   */
  getSocialIconPath(social: SocialLink): string {
    return this.contactService.getSocialIconPath(social.name);
  }
}
