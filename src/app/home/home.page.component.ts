import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BadgeDumbComponent } from '../shared/components/badge/badge.dumb.component';
import { ButtonDumbComponent } from '../shared/components/button/button.dumb.component';
import { AboutPageComponent } from './visitors/about/about.page.component';
import { SkillsPageComponent } from './visitors/skills/skills.page.component';

@Component({
  imports: [
    BadgeDumbComponent,
    ButtonDumbComponent,
    NgClass,
    NgOptimizedImage,
    RouterOutlet,
    AboutPageComponent,
    SkillsPageComponent
  ],
  templateUrl: './home.page.component.html',
  styles: `
    .dark-icon {
      content: url('/icons/buttons/download_dark.svg');
    }

    .light-icon {
      content: url('/icons/buttons/download_light.svg');
    }

    .dark-arrow-icon {
      content: url('/icons/buttons/arrow_dark.svg');
    }

    .light-arrow-icon {
      content: url('/icons/buttons/arrow_light.svg');
    }
  `
})
export class HomePageComponent {
  title = signal<string>('NÉDELLEC Julien');
  subtitle = signal<string>("Développeur d'applications web et web mobile");
  text = signal<string>(
    'Ensemble, concevons des expériences web et mobiles innovantes, performantes et intuitives, alliant technologie moderne et excellence pour répondre à vos besoins numériques.'
  );

  isDarkMode(): boolean {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }
}
