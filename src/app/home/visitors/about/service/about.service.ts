import { Injectable, signal } from '@angular/core';
import { AboutData, Skill } from '../models/about.model';
import { ABOUT_MOCK_DATA } from '../../../../shared/mocks/about-mock';

/**
 * Service de gestion des données de la page À propos.
 * Fournit des méthodes pour récupérer les informations personnelles, l'expérience professionnelle et les motivations.
 */
@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private aboutData = signal<AboutData>(ABOUT_MOCK_DATA);

  getExperience() {
    return this.aboutData().experience;
  }

  getCareerChange() {
    return this.aboutData().careerChange;
  }

  getCitation() {
    return this.aboutData().citation;
  }

  getSkills(): Skill[] {
    return this.aboutData().experience.skills;
  }
}
