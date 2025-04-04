import { Injectable, signal } from '@angular/core';
import { Skill, SkillCategory, SkillsData } from '../models/skills.model';

/**
 * Service de gestion des données des compétences.
 * Fournit des méthodes pour récupérer les différentes catégories de compétences.
 */
@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  /** Données des compétences */
  private skillsData = signal<SkillsData>({
    categories: [
      {
        title: 'Frontend',
        description: 'Technologies et frameworks pour le développement d\'interfaces utilisateur modernes, réactives et accessibles, garantissant une expérience fluide et ergonomique.',
        icon: '/icons/icons_stacks/frontend-light.avif',
        skills: [
          { name: 'Angular', icon: '/icons/logo/angular.avif' },
          { name: 'TypeScript', icon: '/icons/logo/typescript.avif' },
          { name: 'JavaScript', icon: '/icons/logo/javascript.avif' },
          { name: 'TailwindCSS', icon: '/icons/logo/tailwindcss.avif' }
        ]
      },
      {
        title: 'Backend',
        description: 'Frameworks et technologies permettant de concevoir des API performantes, évolutives et sécurisées pour des applications web et mobiles.',
        icon: '/icons/icons_stacks/backend-light.avif',
        skills: [
          { name: 'NestJS', icon: '/icons/logo/nestjs.avif' },
          { name: 'Node.js', icon: '/icons/logo/nodedotjs.avif', iconWidth: 48, iconHeight: 29 },
          { name: 'Spring Boot', icon: '/icons/logo/springboot.avif', iconWidth: 48, iconHeight: 42 },
          { name: 'Java', icon: '/icons/logo/java.avif', iconWidth: 36, iconHeight: 48 }
        ]
      },
      {
        title: 'Base de données',
        description: 'Solutions de stockage et de gestion des données, relationnelles et non relationnelles, adaptées aux besoins des applications modernes.',
        icon: '/icons/icons_stacks/bdd-light.avif',
        skills: [
          { name: 'MongoDB', icon: '/icons/logo/mongodb.avif' },
          { name: 'MySQL', icon: '/icons/logo/mysql.avif' },
          { name: 'PostgreSQL', icon: '/icons/logo/postgresql.avif' }
        ]
      },
      {
        title: 'DevOps & Outils',
        description: 'Ensemble d\'outils et de technologies facilitant l\'automatisation, le déploiement, la gestion de projet et l\'amélioration des workflows de développement.',
        icon: '/icons/icons_stacks/devops-light.avif',
        skills: [
          { name: 'Docker', icon: '/icons/logo/docker.avif' },
          { name: 'Git', icon: '/icons/logo/git.avif' },
          { name: 'VS Code', icon: '/icons/logo/vscode.avif' },
          { name: 'WebStorm', icon: '/icons/logo/webstorm.avif' },
          { name: 'IntelliJ', icon: '/icons/logo/intellijidea.avif' }
        ]
      }
    ]
  });

  /**
   * Récupère toutes les catégories de compétences.
   * @returns Signal contenant toutes les catégories de compétences
   */
  getSkillsData() {
    return this.skillsData;
  }

  /**
   * Récupère une catégorie de compétences par son titre.
   * @param title Titre de la catégorie
   * @returns Catégorie de compétences avec le titre spécifié ou undefined si non trouvée
   */
  getCategoryByTitle(title: string): SkillCategory | undefined {
    return this.skillsData().categories.find(category => category.title === title);
  }

  /**
   * Récupère toutes les compétences de toutes les catégories.
   * @returns Tableau de toutes les compétences
   */
  getAllSkills(): Skill[] {
    return this.skillsData().categories.flatMap(category => category.skills);
  }

  /**
   * Met à jour les données des compétences.
   * @param data Nouvelles données pour les compétences
   */
  updateSkillsData(data: Partial<SkillsData>): void {
    this.skillsData.update(current => ({ ...current, ...data }));
  }
}
