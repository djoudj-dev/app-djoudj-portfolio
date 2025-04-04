import { Injectable, signal } from '@angular/core';
import { ContactData, ContactInfo, SocialLink } from '../models/contact.model';
import { ThemeService } from '../../../../shared/services/theme.service';
import { CONTACT_MOCK_DATA } from '../../../../shared/mocks/contact-mock';

/**
 * Service de gestion des données de la page Contact.
 * Fournit des méthodes pour récupérer les informations de contact et les liens vers les réseaux sociaux.
 */
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactData = signal<ContactData>(CONTACT_MOCK_DATA);

  constructor(private themeService: ThemeService) {}

  getContactInfo(): ContactInfo[] {
    return this.contactData().contactInfo;
  }

  getSocialLinks(): SocialLink[] {
    return this.contactData().socialLinks;
  }

  isFormSubmitted(): boolean {
    return this.contactData().formSubmitted;
  }

  isFormSuccess(): boolean {
    return this.contactData().formSuccess;
  }

  updateContactData(data: Partial<ContactData>): void {
    this.contactData.update(current => ({ ...current, ...data }));
  }

  /**
   * Obtient le chemin d'icône approprié en fonction du titre et du thème
   * @param title Titre de l'information de contact
   * @returns Chemin de l'icône correspondante
   */
  getIconPath(title: string): string {
    const isDark = this.themeService.isDarkMode();

    switch (title) {
      case 'Email':
        return isDark ? '/icons/logo/mail-dark.avif' : '/icons/logo/mail-light.avif';
      case 'Téléphone':
        return isDark ? '/icons/logo/phone-dark.avif' : '/icons/logo/phone-light.avif';
      case 'Localisation':
        return isDark ? '/icons/logo/home-dark.avif' : '/icons/logo/home-light.avif';
      case 'Réseaux sociaux':
        return isDark ? '/icons/logo/rs-dark.avif' : '/icons/logo/rs-light.avif';
      default:
        return '/icons/logo/mail-light.avif'; // Fallback
    }
  }

  /**
   * Obtient le chemin d'icône approprié pour un réseau social en fonction de la plateforme et du thème
   * @param socialName Nom du réseau social
   * @returns Chemin de l'icône correspondante
   */
  getSocialIconPath(socialName: string): string {
    const isDark = this.themeService.isDarkMode();

    switch (socialName) {
      case 'GitHub':
        return isDark ? '/icons/logo/github-dark.avif' : '/icons/logo/github-light.avif';
      case 'LinkedIn':
        return '/icons/logo/linkedin.avif'; // No theme-specific icons for LinkedIn yet
      case 'X':
        return '/icons/logo/x.avif'; // No theme-specific icons for X yet
      default:
        return ''; // Fallback
    }
  }
}
