/**
 * Interface for technology used in projects
 */
export interface Technology {
  name: string;
  icon: string;
}

/**
 * Interface for project information
 */
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: Technology[];
  imageUrl: string;
  projectUrl?: string;
  githubUrl?: string;
}
