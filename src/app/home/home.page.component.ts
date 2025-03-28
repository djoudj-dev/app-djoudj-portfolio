import { NgOptimizedImage, ViewportScroller } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BadgeDumbComponent } from '../shared/components/badge/badge.dumb.component';
import { ButtonDumbComponent } from '../shared/components/button/button.dumb.component';
import { AboutPageComponent } from './visitors/about/about.page.component';
import { SkillsPageComponent } from './visitors/skills/skills.page.component';
import { ProjectsPageComponent } from './visitors/projects/projects.page.component';
import { ContactPageComponent } from './visitors/contact/contact.page.component';
import { ThemeService } from '../shared/services/theme.service';

@Component({
  imports: [
    BadgeDumbComponent,
    ButtonDumbComponent,
    NgOptimizedImage,
    RouterOutlet,
    AboutPageComponent,
    SkillsPageComponent,
    ProjectsPageComponent,
    ContactPageComponent
  ],
  templateUrl: './home.page.component.html'
})
export class HomePageComponent {
  title = signal<string>('NÉDELLEC Julien');
  subtitle = signal<string>("Développeur d'applications web et web mobile");
  text = signal<string>(
    'Ensemble, concevons des expériences web et mobiles innovantes, performantes et intuitives, alliant technologie moderne et excellence pour répondre à vos besoins numériques.'
  );

  constructor(
    public themeService: ThemeService,
    private viewportScroller: ViewportScroller
  ) {}

  downloadCV(): void {
    window.open('/documents/CV_Nedellec-Julien_Developpeur-Web.pdf', '_blank');
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  scrollToProjects(): void {
    // Use setTimeout to ensure the DOM has been updated
    setTimeout(() => {
      const element = document.getElementById('projects');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback to ViewportScroller if element not found
        this.viewportScroller.scrollToAnchor('projects');
      }
    }, 100);
  }
}
