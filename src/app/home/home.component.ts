import { NgOptimizedImage, ViewportScroller } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BadgeComponent } from '../shared/components/badge/badge.component';
import { ButtonComponent } from '../shared/components/button/button.component';
import { AboutComponent } from './visitors/about/about.component';
import { SkillsComponent } from './visitors/skills/skills.component';
import { ProjectsComponent } from './visitors/projects/projects.component';
import { ContactComponent } from './visitors/contact/contact.component';
import { ThemeService } from '../shared/services/theme.service';

/**
 * Composant de la page d'accueil.
 * Affiche la présentation principale du portfolio avec les sections À propos, Compétences,
 * Projets et Contact.
 */
@Component({
  imports: [
    BadgeComponent,
    ButtonComponent,
    NgOptimizedImage,
    RouterOutlet,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  /** Titre principal de la page d'accueil */
  title = signal<string>('NÉDELLEC Julien');

  /** Sous-titre décrivant la profession */
  subtitle = signal<string>("Développeur d'applications web et web mobile");

  /** Texte de présentation décrivant l'approche professionnelle */
  text = signal<string>(
    'Ensemble, concevons des expériences web et mobiles innovantes, performantes et intuitives, alliant technologie moderne et excellence pour répondre à vos besoins numériques.'
  );

  /**
   * Constructeur du composant.
   * @param themeService Service gérant le thème de l'application (clair/sombre)
   * @param viewportScroller Service permettant de faire défiler la page vers des ancres
   */
  constructor(
    public themeService: ThemeService,
    private viewportScroller: ViewportScroller
  ) {}

  /**
   * Ouvre le CV au format PDF dans un nouvel onglet.
   */
  downloadCV(): void {
    window.open('/documents/CV_Nedellec-Julien_Developpeur-Web.pdf', '_blank');
  }

  /**
   * Vérifie si le mode sombre est activé.
   * @returns true si le mode sombre est activé, false sinon
   */
  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  /**
   * Fait défiler la page jusqu'à la section des projets.
   * Utilise une approche en deux étapes pour assurer la compatibilité avec différents navigateurs.
   */
  scrollToProjects(): void {
    // Utilisation de setTimeout pour s'assurer que le DOM a été mis à jour
    setTimeout(() => {
      const element = document.getElementById('projects');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Solution de repli vers ViewportScroller si l'élément n'est pas trouvé
        this.viewportScroller.scrollToAnchor('projects');
      }
    }, 100);
  }
}
