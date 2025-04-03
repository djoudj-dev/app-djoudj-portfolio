import { Component, computed } from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { ThemeService } from '../../../shared/services/theme.service';
import { SkillsService } from './service/skills.service';
import { SkillCategory } from './models/skills.model';

/**
 * Composant de la page des compétences.
 * Affiche les différentes catégories de compétences techniques organisées par domaine.
 */
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgOptimizedImage, NgClass],
  templateUrl: './skills.component.html',
  styles: `
    .frontend-dark-icon {
      content: url('/icons/icons_stacks/frontend-dark.svg');
    }
    .frontend-light-icon {
      content: url('/icons/icons_stacks/frontend-light.svg');
    }
    .backend-dark-icon {
      content: url('/icons/icons_stacks/backend-dark.svg');
    }
    .backend-light-icon {
      content: url('/icons/icons_stacks/backend-light.svg');
    }
    .bdd-dark-icon {
      content: url('/icons/icons_stacks/bdd-dark.svg');
    }
    .bdd-light-icon {
      content: url('/icons/icons_stacks/bdd-light.svg');
    }
    .devops-dark-icon {
      content: url('/icons/icons_stacks/devops-dark.svg');
    }
    .devops-light-icon {
      content: url('/icons/icons_stacks/devops-light.svg');
    }
  `
})
export class SkillsComponent {
  /**
   * Constructeur qui injecte les services requis
   * @param themeService Service pour gérer les préférences de thème
   * @param skillsService Service pour gérer les données des compétences
   */
  constructor(
    public themeService: ThemeService,
    private skillsService: SkillsService
  ) {}

  /**
   * Vérifie si le mode sombre est activé
   * @returns Vrai si le mode sombre est activé, faux sinon
   */
  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  /** Toutes les catégories de compétences */
  skillCategories = computed(() => this.skillsService.getSkillsData()().categories);

  /** Compétences frontend */
  frontendSkills = computed(() =>
    this.skillsService.getCategoryByTitle('Frontend') as SkillCategory
  );

  /** Compétences backend */
  backendSkills = computed(() =>
    this.skillsService.getCategoryByTitle('Backend') as SkillCategory
  );

  /** Compétences en bases de données */
  databaseSkills = computed(() =>
    this.skillsService.getCategoryByTitle('Base de données') as SkillCategory
  );

  /** Compétences DevOps et outils */
  devopsSkills = computed(() =>
    this.skillsService.getCategoryByTitle('DevOps & Outils') as SkillCategory
  );
}
