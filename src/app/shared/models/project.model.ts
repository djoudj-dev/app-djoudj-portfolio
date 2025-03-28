/**
 * Interface définissant une technologie utilisée dans les projets.
 */
export interface Technology {
  /** Nom de la technologie */
  name: string;
  /** Chemin de l'icône représentant la technologie */
  icon: string;
}

/**
 * Interface définissant les informations d'un projet.
 */
export interface Project {
  /** Identifiant unique du projet */
  id: number;
  /** Titre du projet */
  title: string;
  /** Description détaillée du projet */
  description: string;
  /** Liste des technologies utilisées dans le projet */
  technologies: Technology[];
  /** URL de l'image représentant le projet */
  imageUrl: string;
  /** URL optionnelle vers le projet déployé */
  projectUrl?: string;
  /** URL optionnelle vers le dépôt GitHub du projet */
  githubUrl?: string;
}
