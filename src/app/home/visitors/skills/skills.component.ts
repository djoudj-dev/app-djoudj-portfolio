import { Component, signal } from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { ThemeService } from '../../../shared/services/theme.service';

/**
 * Interface définissant une compétence technique.
 */
interface Skill {
  name: string;
  icon: string;
}

/**
 * Interface définissant une catégorie de compétences techniques.
 */
interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
  icon: string;
}

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
   * Constructeur qui injecte le service de thème
   * @param themeService Service pour gérer les préférences de thème
   */
  constructor(public themeService: ThemeService) {}

  /**
   * Vérifie si le mode sombre est activé
   * @returns Vrai si le mode sombre est activé, faux sinon
   */
  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  /** Compétences frontend */
  frontendSkills = signal<SkillCategory>({
    title: 'Frontend',
    description: 'Technologies et frameworks pour le développement d\'interfaces utilisateur modernes, réactives et accessibles, garantissant une expérience fluide et ergonomique.',
    icon: '/icons/icons_stacks/frontend-light.svg',
    skills: [
      { name: 'Angular', icon: '/icons/logo/angular.svg' },
      { name: 'TypeScript', icon: '/icons/logo/typescript.svg' },
      { name: 'JavaScript', icon: '/icons/logo/javascript.svg' },
      { name: 'TailwindCSS', icon: '/icons/logo/tailwindcss.svg' }
    ]
  });

  /** Compétences backend */
  backendSkills = signal<SkillCategory>({
    title: 'Backend',
    description: 'Frameworks et technologies permettant de concevoir des API performantes, évolutives et sécurisées pour des applications web et mobiles.',
    icon: '/icons/icons_stacks/backend-light.svg',
    skills: [
      { name: 'NestJS', icon: '/icons/logo/nestjs.svg' },
      { name: 'Node.js', icon: '/icons/logo/nodedotjs.svg' },
      { name: 'Spring Boot', icon: '/icons/logo/springboot.svg' },
      { name: 'Java', icon: '/icons/logo/java.svg' },
    ]
  });

  /** Compétences en bases de données */
  databaseSkills = signal<SkillCategory>({
    title: 'Base de données',
    description: 'Solutions de stockage et de gestion des données, relationnelles et non relationnelles, adaptées aux besoins des applications modernes.',
    icon: '/icons/icons_stacks/bdd-light.svg',
    skills: [
      { name: 'MongoDB', icon: '/icons/logo/mongodb.svg' },
      { name: 'MySQL', icon: '/icons/logo/mysql.svg' },
      { name: 'PostgreSQL', icon: '/icons/logo/postgresql.svg' }
    ]
  });

  /** Compétences DevOps et outils */
  devopsSkills = signal<SkillCategory>({
    title: 'DevOps & Outils',
    description: 'Ensemble d\'outils et de technologies facilitant l\'automatisation, le déploiement, la gestion de projet et l\'amélioration des workflows de développement.',
    icon: '/icons/icons_stacks/devops-light.svg',
    skills: [
      { name: 'Docker', icon: '/icons/logo/docker.svg' },
      { name: 'Git', icon: '/icons/logo/git.svg' },
      { name: 'VS Code', icon: '/icons/logo/vscode.svg' },
      { name: 'WebStorm', icon: '/icons/logo/webstorm.svg' },
      { name: 'IntelliJ', icon: '/icons/logo/intellijidea.svg' }
    ]
  });

  /** Tableau de toutes les catégories de compétences pour faciliter l'itération */
  skillCategories = signal<SkillCategory[]>([
    this.frontendSkills(),
    this.backendSkills(),
    this.databaseSkills(),
    this.devopsSkills()
  ]);
}
