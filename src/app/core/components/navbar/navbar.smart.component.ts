import { CommonModule, NgOptimizedImage, ViewportScroller } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from '../../../shared/services/theme.service';

interface MenuItem {
  label: string;
  routerLink: string;
  fragment: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.smart.component.html',
  imports: [CommonModule, NgOptimizedImage, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarSmartComponent implements OnDestroy, AfterViewInit {

  isMenuOpen = signal<boolean>(false);

  private pendingFragment: string | null = null;

  menuItems: MenuItem[] = [
    { label: 'Accueil', routerLink: '/', fragment: 'accueil', icon: 'icons/icons_navbar/menu_home.svg' },
    { label: 'A propos', routerLink: '/about', fragment: 'about', icon: 'icons/icons_navbar/menu_about.svg' },
    { label: 'Stacks', routerLink: '/skills', fragment: 'skills', icon: 'icons/icons_navbar/menu_stack.svg' },
    { label: 'Projets', routerLink: '/projects', fragment: 'projects', icon: 'icons/icons_navbar/menu_project.svg' },
    { label: 'Contact', routerLink: '/contact', fragment: 'contact', icon: 'icons/icons_navbar/menu_contact.svg' }
  ];

  constructor(
    private elementRef: ElementRef,
    private viewportScroller: ViewportScroller,
    private router: Router,
    public themeService: ThemeService
  ) {
    document.addEventListener('click', this.handleOutsideClick);
  }

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

  scrollToSection(fragment: string): void {
    // If fragment is empty, just navigate to home page
    if (!fragment) {
      this.router.navigate(['/']);
      this.closeMenu();
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

    // Close the mobile menu if it's open
    this.closeMenu();
  }

  /**
   * Toggles between light and dark theme
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  /**
   * Check if dark mode is enabled
   * @returns True if dark mode is enabled, false otherwise
   */
  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  /**
   * Toggles the mobile menu open/closed state
   */
  toggleMenu(): void {
    this.isMenuOpen.update(current => !current);
  }

  /**
   * Closes the mobile menu
   */
  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  /**
   * Handles clicks outside the navbar to close the mobile menu
   * @param event The mouse event
   */
  private handleOutsideClick = (event: MouseEvent): void => {
    if (this.isMenuOpen() && !this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen.set(false);
    }
  };

  /**
   * Lifecycle hook that is called when the component is destroyed
   * Cleans up event listeners
   */
  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleOutsideClick);
  }
}
