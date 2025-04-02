import { Injectable, signal, computed } from '@angular/core';
import { Project, ProjectCategory, ProjectStatus, ProjectsData } from '../models/project.model';
import { PROJECTS_MOCK_DATA } from '../../../../shared/mocks/projects-mock';

/**
 * Service de gestion des données des projets.
 * Fournit des méthodes pour récupérer, filtrer et rechercher les projets.
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  /** Données complètes des projets */
  private projectsData = signal<ProjectsData>(PROJECTS_MOCK_DATA);

  /** Liste des projets */
  private projects = computed(() => this.projectsData().projects);

  /**
   * Récupère tous les projets.
   * @returns Signal contenant la liste des projets
   */
  getProjects() {
    return this.projects;
  }

  /**
   * Recherche des projets par terme de recherche.
   * @param term Terme de recherche
   * @returns Liste des projets correspondant au terme de recherche
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

  /**
   * Récupère les métadonnées des projets.
   * @returns Métadonnées des projets ou undefined si non disponibles
   */
  getMetadata() {
    return computed(() => this.projectsData().metadata);
  }

  /**
   * Filtre les projets par catégorie.
   * @param category Catégorie à filtrer
   * @returns Liste des projets de la catégorie spécifiée
   */
  filterByCategory(category: ProjectCategory): Project[] {
    return this.projects().filter(project => project.category === category);
  }

  /**
   * Filtre les projets par statut.
   * @param status Statut à filtrer
   * @returns Liste des projets avec le statut spécifié
   */
  filterByStatus(status: ProjectStatus): Project[] {
    return this.projects().filter(project => project.status === status);
  }

  /**
   * Récupère un projet par son ID.
   * @param id ID du projet
   * @returns Projet correspondant ou undefined si non trouvé
   */
  getProjectById(id: number): Project | undefined {
    return this.projects().find(project => project.id === id);
  }

  /**
   * Met à jour les données des projets.
   * @param data Nouvelles données pour les projets
   */
  updateProjectsData(data: Partial<ProjectsData>): void {
    this.projectsData.update(current => ({ ...current, ...data }));
  }
}
