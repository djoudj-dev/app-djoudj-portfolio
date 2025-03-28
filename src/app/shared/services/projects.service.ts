import { Injectable, signal } from '@angular/core';
import { Project } from '../models/project.model';

/**
 * Service for managing projects data
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  /** Projects data */
  private projects = signal<Project[]>([
    {
      id: 1,
      title: 'Portfolio',
      description: 'Portfolio personnel présentant mes compétences, projets et expériences professionnelles. Développé avec Angular, TypeScript et TailwindCSS.',
      technologies: [
        { name: 'Angular', icon: '/icons/logo/angular.svg' },
        { name: 'TypeScript', icon: '/icons/logo/typescript.svg' },
        { name: 'TailwindCSS', icon: '/icons/logo/tailwindcss.svg' }
      ],
      imageUrl: '/images/projets/portfolio.webp',
      githubUrl: 'https://github.com/username/portfolio'
    },
    {
      id: 2,
      title: 'Application de Gestion de Tâches',
      description: 'Application web permettant de gérer des tâches avec fonctionnalités de création, modification et suppression.',
      technologies: [
        { name: 'NestJS', icon: '/icons/logo/nestjs.svg' },
        { name: 'Angular', icon: '/icons/logo/angular.svg' },
        { name: 'MongoDB', icon: '/icons/logo/mongodb.svg' }
      ],
      imageUrl: '/images/projects/task-manager.webp',
      projectUrl: 'https://task-manager.example.com',
      githubUrl: 'https://github.com/username/task-manager'
    },
    {
      id: 3,
      title: 'API REST E-commerce',
      description: 'API REST pour une application e-commerce avec gestion des produits, utilisateurs et commandes.',
      technologies: [
        { name: 'NestJS', icon: '/icons/logo/nestjs.svg' },
        { name: 'PostgreSQL', icon: '/icons/logo/postgresql.svg' },
        { name: 'Docker', icon: '/icons/logo/docker.svg' }
      ],
      imageUrl: '/images/projects/ecommerce-api.webp',
      githubUrl: 'https://github.com/username/ecommerce-api'
    },
    {
      id: 4,
      title: 'Dashboard Analytics',
      description: 'Dashboard interactif pour visualiser des données analytiques avec graphiques et filtres.',
      technologies: [
        { name: 'Angular', icon: '/icons/logo/angular.svg' },
        { name: 'TypeScript', icon: '/icons/logo/typescript.svg' },
        { name: 'Chart.js', icon: '/icons/logo/javascript.svg' }
      ],
      imageUrl: '/images/projects/dashboard.webp',
      projectUrl: 'https://dashboard.example.com'
    }
  ]);

  /**
   * Get all projects
   * @returns Signal with all projects
   */
  getProjects() {
    return this.projects;
  }

  /**
   * Get a project by ID
   * @param id Project ID
   * @returns Project with the specified ID or undefined if not found
   */
  getProjectById(id: number): Project | undefined {
    return this.projects().find(project => project.id === id);
  }

  /**
   * Search projects by term
   * @param term Search term
   * @returns Array of projects matching the search term
   */
  searchProjects(term: string): Project[] {
    const searchTerm = term.toLowerCase();
    if (!searchTerm) return this.projects();

    return this.projects().filter(project =>
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.technologies.some(tech => tech.name.toLowerCase().includes(searchTerm))
    );
  }
}
