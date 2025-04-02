import { AboutData } from '../../home/visitors/about/models/about.model';

/**
 * Données mockées pour la page À propos.
 * Ce fichier contient les données de la page À propos utilisées par le AboutService.
 */
export const ABOUT_MOCK_DATA: AboutData = {
  experience: {
    main: 'Grâce à ma reconversion dans le développement web, j\'ai développé des compétences en conception de solutions modernes, en appliquant les meilleures pratiques pour garantir un code structuré, performant et maintenable.',
    details: 'Mon parcours m\'a permis de renforcer mes compétences en architecture logicielle, optimisation du code et développement full-stack, en intégrant des approches et technologies adaptées aux exigences actuelles.',
    skills: [
      { name: 'Angular', icon: '/icons/logo/angular.svg' },
      { name: 'NestJS', icon: '/icons/logo/nestjs.svg' },
      { name: 'TailwindCSS', icon: '/icons/logo/tailwindcss.svg' }
    ]
  },
  careerChange: {
    main: 'Ancien professionnel en métallurgie, j\'ai toujours eu un attrait pour le développement web. J\'ai entrepris une reconversion vers ce domaine et aujourd\'hui, je me spécialise dans la conception d\'applications web modernes et robustes.',
    details: 'Cette reconversion m\'a offert une nouvelle perspective sur la rigueur et la précision, que j\'applique désormais dans l\'écriture d\'un code propre, performant et scalable.',
    motivations: [
      'Créer des expériences utilisateur optimisées et intuitives.',
      'Développer du code maintenable et performant.',
      'Mettre en place un environnement de travail efficace et automatisé.',
      'Partager mes connaissances et améliorer continuellement mes compétences.'
    ]
  },
  citation: {
    text: 'La barbe ne fait pas le moine',
    author: 'Julien Nédellec'
  }
};
