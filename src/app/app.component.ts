import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarSmartComponent } from './core/components/navbar/navbar.smart.component';
import { Title, Meta } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { FooterSmartComponent } from './core/components/footer/footer.smart.component';

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

  ngOnInit() {
    // Set default title
    this.titleService.setTitle(this.title);

    // Update title based on route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let currentRoute = this.router.url;
      let pageTitle = this.title;

      // Set different titles based on route
      if (currentRoute.includes('/about')) {
        pageTitle = 'À propos | ' + this.title;
      } else if (currentRoute.includes('/projects')) {
        pageTitle = 'Projets | ' + this.title;
      } else if (currentRoute.includes('/contact')) {
        pageTitle = 'Contact | ' + this.title;
      }

      this.titleService.setTitle(pageTitle);

      // Update meta description based on route
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
