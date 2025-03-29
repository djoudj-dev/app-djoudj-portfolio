import { CommonModule, ViewportScroller } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

/**
 * Interface définissant un élément de raccourci dans le pied de page.
 */
interface ShortcutItem {
  /** Texte affiché pour le lien */
  label: string;
  /** Route de navigation */
  routerLink: string;
  /** Fragment (ancre) pour le défilement */
  fragment: string;
}

/**
 * Interface définissant un élément légal dans le pied de page.
 */
interface LegalItem {
  /** Texte affiché pour le lien */
  label: string;
  /** Route de navigation */
  route: string;
}

/**
 * Composant du pied de page de l'application.
 * Gère les raccourcis de navigation et les liens vers les pages légales.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements AfterViewInit {

  /** Liste des éléments de raccourci affichés dans le pied de page */
  shortcutItems: ShortcutItem[] = [
    { label: 'Accueil', routerLink: '/', fragment: 'accueil' },
    { label: 'A propos', routerLink: '/', fragment: 'about' },
    { label: 'Stacks', routerLink: '/', fragment: 'skills' },
    { label: 'Projets', routerLink: '/', fragment: 'projects' },
    { label: 'Contact', routerLink: '/', fragment: 'contact' }
  ];

  /** Liste des éléments légaux affichés dans le pied de page */
  legalItems: LegalItem[] = [
    { label: 'Politique de confidentialité', route: '/legal/privacy' },
    { label: 'Mentions légales', route: '/legal/notice' },
    { label: 'CGU', route: '/legal/terms' }
  ];

  /**
   * Fragment en attente de traitement après une navigation.
   * Utilisé pour mémoriser l'ancre vers laquelle défiler après un changement de page.
   */
  private pendingFragment: string | null = null;

  /**
   * Constructeur du composant.
   * @param viewportScroller Service permettant de faire défiler la page vers des ancres
   * @param router Service de navigation Angular
   */
  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router
  ) {}

  /**
   * Fait défiler la page jusqu'à une section spécifique.
   * Si l'utilisateur n'est pas sur la page d'accueil, il y sera d'abord redirigé.
   * @param fragment Identifiant de la section vers laquelle défiler
   */
  scrollToSection(fragment: string): void {
    // Si le fragment est vide, naviguer simplement vers la page d'accueil
    if (!fragment) {
      this.router.navigate(['/']);
      return;
    }

    // D'abord naviguer vers la page d'accueil si on n'y est pas déjà
    if (this.router.url !== '/') {
      // Stocker le fragment pour y défiler après la navigation
      this.pendingFragment = fragment;
      this.router.navigate(['/'], { fragment });
    } else {
      // Si déjà sur la page d'accueil, défiler simplement vers l'élément
      // Utiliser setTimeout pour s'assurer que le DOM a été mis à jour
      setTimeout(() => {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          // Solution de repli vers ViewportScroller si l'élément n'est pas trouvé
          this.viewportScroller.scrollToAnchor(fragment);
        }
      }, 100);
    }
  }

  /**
   * Méthode de cycle de vie appelée après l'initialisation de la vue.
   * Utilisée pour défiler vers l'ancre après la navigation.
   */
  ngAfterViewInit(): void {
    // Si nous avons un fragment en attente, défiler vers celui-ci
    if (this.pendingFragment) {
      // Utiliser setTimeout pour s'assurer que le DOM a été mis à jour
      setTimeout(() => {
        const element = document.getElementById(this.pendingFragment!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          // Solution de repli vers ViewportScroller si l'élément n'est pas trouvé
          this.viewportScroller.scrollToAnchor(this.pendingFragment!);
        }
        this.pendingFragment = null;
      }, 100);
    }
  }

  /**
   * Navigue vers une route spécifique.
   * @param route La route vers laquelle naviguer
   */
  navigateToRoute(route: string): void {
    this.router.navigate([route]);
  }

}
