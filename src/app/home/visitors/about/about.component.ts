import { Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

/**
 * Interface définissant une compétence technique.
 */
interface Skill {
  name: string;
  icon: string;
}

/**
 * Composant de la page À propos.
 * Affiche les informations personnelles, l'expérience professionnelle et les motivations.
 */
@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  /** Données de la section expérience */
  experience = signal<string>('Grâce à ma reconversion dans le développement web, j\'ai développé des compétences en conception de solutions modernes, en appliquant les meilleures pratiques pour garantir un code structuré, performant et maintenable.');
  experienceDetails = signal<string>('Mon parcours m\'a permis de renforcer mes compétences en architecture logicielle, optimisation du code et développement full-stack, en intégrant des approches et technologies adaptées aux exigences actuelles.');

  /** Données des compétences techniques */
  skills = signal<Skill[]>([
    { name: 'Angular', icon: '/icons/logo/angular.svg' },
    { name: 'NestJS', icon: '/icons/logo/nestjs.svg' },
    { name: 'TailwindCSS', icon: '/icons/logo/tailwindcss.svg' }
  ]);

  /** Données de la section reconversion professionnelle */
  careerChange = signal<string>('Ancien professionnel en métallurgie, j\'ai toujours eu un attrait pour le développement web. J\'ai entrepris une reconversion vers ce domaine et aujourd\'hui, je me spécialise dans la conception d\'applications web modernes et robustes.');
  careerChangeDetails = signal<string>('Cette reconversion m\'a offert une nouvelle perspective sur la rigueur et la précision, que j\'applique désormais dans l\'écriture d\'un code propre, performant et scalable.');

  /** Données des motivations professionnelles */
  motivations = signal<string[]>([
    'Créer des expériences utilisateur optimisées et intuitives.',
    'Développer du code maintenable et performant.',
    'Mettre en place un environnement de travail efficace et automatisé.',
    'Partager mes connaissances et améliorer continuellement mes compétences.'
  ]);

  /** Données de citation personnelle */
  citation = signal<string>('La barbe ne fait pas le moine');
  citationAuthor = signal<string>('Julien Nédellec');
}
