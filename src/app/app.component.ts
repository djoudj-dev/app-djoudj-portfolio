import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarSmartComponent } from './core/components/navbar/navbar.smart.component';
import { Title, Meta } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { FooterSmartComponent } from './core/components/footer/footer.smart.component';

/**
 * Composant racine de l'application.
 * Gère la structure principale de l'application et la mise à jour des métadonnées
 * en fonction de la navigation.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NavbarSmartComponent, RouterOutlet, FooterSmartComponent]
})
export class AppComponent implements OnInit {
  title = 'Julien NÉDELLEC - Développeur d\'applications web et web mobile';

  constructor(
    private router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {}

  /**
   * Initialise le composant.
   * Configure le titre par défaut et met en place un observateur pour mettre à jour
   * le titre et la description de la page en fonction de la route active.
   */
  ngOnInit() {
    // Définition du titre par défaut
    this.titleService.setTitle(this.title);

    // Mise à jour du titre en fonction de la route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let currentRoute = this.router.url;
      let pageTitle = this.title;

      // Définition des différents titres en fonction de la route
      if (currentRoute.includes('/about')) {
        pageTitle = 'À propos | ' + this.title;
      } else if (currentRoute.includes('/projects')) {
        pageTitle = 'Projets | ' + this.title;
      } else if (currentRoute.includes('/contact')) {
        pageTitle = 'Contact | ' + this.title;
      }

      this.titleService.setTitle(pageTitle);

      // Mise à jour de la méta-description en fonction de la route
      let description = 'Portfolio de Julien NÉDELLEC, développeur d\'applications web et web mobile. Découvrez mes projets, compétences et expériences professionnelles.';

      if (currentRoute.includes('/about')) {
        description = 'Découvrez qui est Julien NÉDELLEC, développeur d\'applications web et web mobile passionné par les technologies modernes.';
      } else if (currentRoute.includes('/projects')) {
        description = 'Explorez les projets réalisés par Julien NÉDELLEC, développeur d\'applications web et web mobile.';
      } else if (currentRoute.includes('/contact')) {
        description = 'Contactez Julien NÉDELLEC, développeur d\'applications web et web mobile disponible pour de nouveaux projets.';
      }

      this.metaService.updateTag({ name: 'description', content: description });
    });
  }
}
