/**
 * Modèles de données pour le composant About.
 * Ce fichier contient toutes les interfaces utilisées par le composant About.
 */

/**
 * Interface définissant une compétence technique.
 */
export interface Skill {
  name: string;
  icon: string;
  iconWidth?: number;
  iconHeight?: number;
}

/**
 * Interface définissant les données de la section expérience.
 */
export interface Experience {
  main: string;
  details: string;
  skills: Skill[];
}

/**
 * Interface définissant les données de la section reconversion professionnelle.
 */
export interface CareerChange {
  main: string;
  details: string;
  motivations: string[];
}

/**
 * Interface définissant les données de la section citation.
 */
export interface Citation {
  text: string;
  author: string;
}

/**
 * Interface principale regroupant toutes les données du composant About.
 */
export interface AboutData {
  experience: Experience;
  careerChange: CareerChange;
  citation: Citation;
}
