import { ProjectCategory, ProjectStatus, ProjectsData } from '../../home/visitors/projects/models/project.model';

/**
 * Données mockées pour les projets.
 * Ce fichier contient les données des projets utilisées par le ProjectsService.
 */
export const PROJECTS_MOCK_DATA: ProjectsData = {
  projects: [
    {
      id: 1,
      title: 'Portfolio',
      description: 'Portfolio personnel présentant mes compétences, projets et expériences professionnelles. Développé avec Angular, TypeScript et TailwindCSS.',
      technologies: [
        { name: 'Angular', icon: '/icons/logo/angular.avif' },
        { name: 'TypeScript', icon: '/icons/logo/typescript.avif' },
        { name: 'TailwindCSS', icon: '/icons/logo/tailwindcss.avif' }
      ],
      imageUrl: '/images/projets/portfolio.webp',
      imageWidth: 600,
      imageHeight: 314,
      githubUrl: 'https://github.com/username/portfolio',
      date: '2023-12-15',
      category: ProjectCategory.WEB,
      status: ProjectStatus.COMPLETED,
      features: [
        'Présentation des compétences et projets',
        'Mode sombre/clair',
        'Design responsive',
        'Animations et transitions fluides'
      ]
    },
    {
      id: 2,
      title: 'Application de Gestion de Tâches',
      description: 'Application web permettant de gérer des tâches avec fonctionnalités de création, modification et suppression.',
      technologies: [
        { name: 'NestJS', icon: '/icons/logo/nestjs.avif' },
        { name: 'Angular', icon: '/icons/logo/angular.avif' },
        { name: 'MongoDB', icon: '/icons/logo/mongodb.avif' }
      ],
      imageUrl: '/images/projets/task-manager.webp',
      imageWidth: 600,
      imageHeight: 314,
      projectUrl: 'https://task-manager.example.com',
      githubUrl: 'https://github.com/username/task-manager',
      date: '2023-10-20',
      category: ProjectCategory.WEB,
      status: ProjectStatus.COMPLETED,
      features: [
        'Création, modification et suppression de tâches',
        'Filtrage et tri des tâches',
        'Authentification des utilisateurs',
        'Interface responsive et intuitive'
      ]
    },
    {
      id: 3,
      title: 'API REST E-commerce',
      description: 'API REST pour une application e-commerce avec gestion des produits, utilisateurs et commandes.',
      technologies: [
        { name: 'NestJS', icon: '/icons/logo/nestjs.avif' },
        { name: 'PostgreSQL', icon: '/icons/logo/postgresql.avif' },
        { name: 'Docker', icon: '/icons/logo/docker.avif' }
      ],
      imageUrl: '/images/projets/ecommerce-api.webp',
      imageWidth: 600,
      imageHeight: 556,
      githubUrl: 'https://github.com/username/ecommerce-api',
      date: '2023-08-05',
      category: ProjectCategory.API,
      status: ProjectStatus.IN_PROGRESS,
      features: [
        'Gestion des produits et catégories',
        'Gestion des utilisateurs et authentification',
        'Gestion des commandes et paiements',
        'Documentation Swagger'
      ],
      challenges: [
        'Optimisation des requêtes pour de grandes quantités de données',
        'Sécurisation des endpoints et gestion des permissions'
      ],
      solutions: [
        'Mise en place d\'index et de requêtes optimisées',
        'Implémentation de JWT et de guards pour la sécurité'
      ]
    },
    {
      id: 4,
      title: 'Dashboard Analytics',
      description: 'Dashboard interactif pour visualiser des données analytiques avec graphiques et filtres.',
      technologies: [
        { name: 'Angular', icon: '/icons/logo/angular.avif' },
        { name: 'TypeScript', icon: '/icons/logo/typescript.avif' },
        { name: 'Chart.js', icon: '/icons/logo/javascript.avif' }
      ],
      imageUrl: '/images/projets/dashboard.webp',
      imageWidth: 600,
      imageHeight: 400,
      projectUrl: 'https://dashboard.example.com',
      date: '2023-11-10',
      category: ProjectCategory.WEB,
      status: ProjectStatus.COMPLETED,
      features: [
        'Visualisation de données avec graphiques interactifs',
        'Filtres et options de personnalisation',
        'Export des données en différents formats',
        'Thème sombre/clair'
      ]
    }
  ],
  metadata: {
    total: 4,
    page: 1,
    perPage: 10
  }
};
