import { Component, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Skill } from './models/about.model';
import { AboutService } from './service/about.service';

/**
 * Composant de la page À propos.
 * Affiche les informations personnelles, l'expérience professionnelle et les motivations.
 */
@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  constructor(private aboutService: AboutService) {}

  /** Accesseurs pour les données du composant */
  experience = computed<string>(() => this.aboutService.getExperience().main);
  experienceDetails = computed<string>(() => this.aboutService.getExperience().details);
  skills = computed<Skill[]>(() => this.aboutService.getSkills());

  careerChange = computed<string>(() => this.aboutService.getCareerChange().main);
  careerChangeDetails = computed<string>(() => this.aboutService.getCareerChange().details);
  motivations = computed<string[]>(() => this.aboutService.getCareerChange().motivations);

  citation = computed<string>(() => this.aboutService.getCitation().text);
  citationAuthor = computed<string>(() => this.aboutService.getCitation().author);
}
