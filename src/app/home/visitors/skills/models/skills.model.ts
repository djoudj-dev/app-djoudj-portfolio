/**
 * Modèles de données pour le composant Skills.
 * Ce fichier contient toutes les interfaces utilisées par le composant Skills.
 */

/**
 * Interface définissant une compétence technique.
 */
export interface Skill {
  /** Nom de la compétence */
  name: string;
  /** Chemin de l'icône représentant la compétence */
  icon: string;
}

/**
 * Interface définissant une catégorie de compétences techniques.
 */
export interface SkillCategory {
  /** Titre de la catégorie */
  title: string;
  /** Description détaillée de la catégorie */
  description: string;
  /** Liste des compétences dans cette catégorie */
  skills: Skill[];
  /** Chemin de l'icône représentant la catégorie */
  icon: string;
}

/**
 * Interface principale regroupant toutes les données du composant Skills.
 */
export interface SkillsData {
  /** Catégories de compétences */
  categories: SkillCategory[];
}
