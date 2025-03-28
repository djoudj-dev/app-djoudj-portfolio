import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { ThemeService } from '../../../shared/services/theme.service';

interface ContactInfo {
  icon: string;
  title: string;
  value: string;
  link?: string;
  text?: string;
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-contact-page',
  imports: [ReactiveFormsModule, NgClass, NgOptimizedImage],
  templateUrl: './contact.page.component.html',
  styleUrl: './contact.page.component.css'
})
export class ContactPageComponent {
  contactForm: FormGroup;
  formSubmitted = signal<boolean>(false);
  formSuccess = signal<boolean>(false);

  // Contact information cards
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

  // Social media links
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
   * Check if dark mode is enabled
   * @returns True if dark mode is enabled, false otherwise
   */
  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  // Submit form
  onSubmit(): void {
    this.formSubmitted.set(true);

    if (this.contactForm.valid) {
      // Here you would typically send the form data to a backend service
      console.log('Form submitted:', this.contactForm.value);

      // Simulate successful submission
      this.formSuccess.set(true);
      this.contactForm.reset();
      this.formSubmitted.set(false);

      // Reset success message after 5 seconds
      setTimeout(() => {
        this.formSuccess.set(false);
      }, 5000);
    }
  }

  // Form validation helpers
  hasError(controlName: string, errorName: string): boolean {
    const control = this.contactForm.get(controlName);
    return control?.touched && control?.hasError(errorName) || false;
  }

  isInvalid(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return control?.touched && control?.invalid || false;
  }

  // Get current character count for message field
  getMessageCharCount(): number {
    const messageControl = this.contactForm.get('message');
    return messageControl?.value?.length || 0;
  }

  // Get the appropriate icon path based on the title and theme
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

  // Get the appropriate social icon path based on the social media platform and theme
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
