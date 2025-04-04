import { ContactData } from '../../home/visitors/contact/models/contact.model';

/**
 * Données mockées pour la page Contact.
 * Ce fichier contient les données de contact utilisées par le ContactService.
 */
export const CONTACT_MOCK_DATA: ContactData = {
  contactInfo: [
    {
      icon: '', // Icon is determined by getIconPath method in ContactService
      title: 'Email',
      value: 'contact@nedellec-julien.fr',
      link: 'mailto:contact@nedellec-julien.fr',
      text: 'Pour toute opportunité de mission ou proposition de collaboration.'
    },
    {
      icon: '', // Icon is determined by getIconPath method in ContactService
      title: 'Téléphone',
      value: '06.22.86.92.79',
      link: 'tel:+33622869279',
      text: 'Disponible en semaine de 9h00 à 16h00'
    },
    {
      icon: '', // Icon is determined by getIconPath method in ContactService
      title: 'Localisation',
      value: 'Voisins-Le-Bretonneux, France',
      link: 'https://www.google.com/maps/place/Voisins-Le-Bretonneux,+France',
      text: 'Déplacement autour de ma localisation négociable'
    },
    {
      icon: '', // Icon is determined by getIconPath method in ContactService
      title: 'Réseaux sociaux',
      value: 'Suivez-moi'
    }
  ],
  socialLinks: [
    {
      name: 'LinkedIn',
      icon: '/icons/logo/linkedin.avif',
      url: 'https://www.linkedin.com/in/nedellec-julien/'
    },
    {
      name: 'GitHub',
      icon: '', // Icon is determined by getSocialIconPath method in ContactService
      url: 'https://github.com/djoudj-dev'
    },
    {
      name: 'X',
      icon: '/icons/logo/x.avif',
      url: 'https://x.com/djoudj_dev'
    }
  ],
  formSubmitted: false,
  formSuccess: false
};
