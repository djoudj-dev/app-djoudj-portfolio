/**
 * Modèles de données pour les projets.
 * Ce fichier contient toutes les interfaces utilisées pour la gestion des projets.
 */

/**
 * Interface définissant une technologie utilisée dans les projets.
 */
export interface Technology {
  name: string;
  icon: string;
}

/**
 * Énumération des catégories possibles pour un projet.
 */
export enum ProjectCategory {
  WEB = 'web',
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
  API = 'api',
  LIBRARY = 'library',
  OTHER = 'other'
}

/**
 * Énumération des statuts possibles pour un projet.
 */
export enum ProjectStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in-progress',
  PLANNED = 'planned'
}

/**
 * Interface définissant les informations d'un projet.
 */
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: Technology[];
  imageUrl: string;
  imageWidth?: number;
  imageHeight?: number;
  projectUrl?: string;
  githubUrl?: string;
  date?: string;
  category?: ProjectCategory;
  status?: ProjectStatus;
  features?: string[];
  challenges?: string[];
  solutions?: string[];
}

/**
 * Interface regroupant toutes les données liées aux projets.
 * Utilisée pour structurer les données mockées et les réponses d'API.
 */
export interface ProjectsData {
  projects: Project[];
  metadata?: {
    total?: number;
    page?: number;
    perPage?: number;
    filters?: {
      category?: ProjectCategory;
      status?: ProjectStatus;
      technology?: string;
    };
  };
}
