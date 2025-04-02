/**
 * Modèles de données pour le composant Contact.
 * Ce fichier contient toutes les interfaces utilisées par le composant Contact.
 */

/**
 * Interface définissant les informations de contact affichées sur la page.
 */
export interface ContactInfo {
  icon: string;
  title: string;
  value: string;
  link?: string;
  text?: string;
}

/**
 * Interface définissant un lien vers un réseau social.
 */
export interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

/**
 * Interface définissant les données du formulaire de contact.
 */
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Interface principale regroupant toutes les données du composant Contact.
 */
export interface ContactData {
  contactInfo: ContactInfo[];
  socialLinks: SocialLink[];
  formSubmitted: boolean;
  formSuccess: boolean;
}
