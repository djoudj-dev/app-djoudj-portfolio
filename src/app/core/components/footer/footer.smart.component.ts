import { CommonModule, ViewportScroller } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface ShortcutItem {
  label: string;
  routerLink: string;
  fragment: string;
}

interface LegalItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.smart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterSmartComponent implements AfterViewInit {

  shortcutItems: ShortcutItem[] = [
    { label: 'Accueil', routerLink: '/', fragment: 'accueil' },
    { label: 'A propos', routerLink: '/', fragment: 'about' },
    { label: 'Stacks', routerLink: '/', fragment: 'skills' },
    { label: 'Projets', routerLink: '/', fragment: 'projects' },
    { label: 'Contact', routerLink: '/', fragment: 'contact' }
  ];

  legalItems: LegalItem[] = [
    { label: 'Politique de confidentialité', route: '/legal/privacy' },
    { label: 'Mentions légales', route: '/legal/notice' },
    { label: 'CGU', route: '/legal/terms' }
  ];

  private pendingFragment: string | null = null;

  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router
  ) {}

  scrollToSection(fragment: string): void {
    // If fragment is empty, just navigate to home page
    if (!fragment) {
      this.router.navigate(['/']);
      return;
    }

    // First navigate to the home page if not already there
    if (this.router.url !== '/') {
      // Store the fragment to scroll to after navigation
      this.pendingFragment = fragment;
      this.router.navigate(['/'], { fragment });
    } else {
      // If already on home page, just scroll to the element
      // Use setTimeout to ensure the DOM has been updated
      setTimeout(() => {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          // Fallback to ViewportScroller if element not found
          this.viewportScroller.scrollToAnchor(fragment);
        }
      }, 100);
    }
  }

  /**
   * Lifecycle hook that is called after the view is initialized
   * Used to scroll to the anchor after navigation
   */
  ngAfterViewInit(): void {
    // If we have a pending fragment, scroll to it
    if (this.pendingFragment) {
      // Use setTimeout to ensure the DOM has been updated
      setTimeout(() => {
        const element = document.getElementById(this.pendingFragment!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          // Fallback to ViewportScroller if element not found
          this.viewportScroller.scrollToAnchor(this.pendingFragment!);
        }
        this.pendingFragment = null;
      }, 100);
    }
  }

  /**
   * Navigates to a specific route
   * @param route The route to navigate to
   */
  navigateToRoute(route: string): void {
    this.router.navigate([route]);
  }

}
