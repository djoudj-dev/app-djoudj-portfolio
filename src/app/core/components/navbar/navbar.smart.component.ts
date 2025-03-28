import { CommonModule, NgOptimizedImage, ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnDestroy, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.smart.component.html',
  imports: [CommonModule, NgOptimizedImage]
})
export class NavbarSmartComponent implements OnDestroy {
  isDarkMode = signal<boolean>(false);
  isMenuOpen = signal<boolean>(false);
  private readonly themeKey = 'theme';

  menuItems = [
    { label: 'Accueil', routerLink: '/', fragment: 'accueil', icon: 'icons/icons_navbar/menu_home.svg' },
    { label: 'A propos', routerLink: '/', fragment: 'about', icon: 'icons/icons_navbar/menu_about.svg' },
    { label: 'Stacks', routerLink: '/', fragment: 'skills', icon: 'icons/icons_navbar/menu_stack.svg' },
    { label: 'Projets', routerLink: '/', fragment: '', icon: 'icons/icons_navbar/menu_project.svg' },
    { label: 'Contact', routerLink: '/', fragment: '', icon: 'icons/icons_navbar/menu_contact.svg' }
  ];

  constructor(
    private elementRef: ElementRef,
    private viewportScroller: ViewportScroller,
    private router: Router
  ) {
    this.loadTheme();
    document.addEventListener('click', this.handleOutsideClick);
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
      this.router.navigate(['/'], { fragment }).then(() => {
        // After navigation, scroll to the element
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(fragment);
        }, 100);
      });
    } else {
      // If already on home page, just scroll to the element
      this.viewportScroller.scrollToAnchor(fragment);
    }
    // Close the mobile menu if it's open
    this.closeMenu();
  }

  toggleTheme(): void {
    const newTheme = this.isDarkMode() ? 'light' : 'dark'; // Correction ici
    this.isDarkMode.set(newTheme === 'dark'); // Mise à jour du signal
    document.documentElement.setAttribute('data-theme', newTheme);

    if (typeof localStorage !== 'undefined' && localStorage !== null) {
      localStorage.setItem(this.themeKey, newTheme);
    }
  }

  toggleMenu(): void {
    this.isMenuOpen.update(current => !current);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey) || 'light';
    this.isDarkMode.set(savedTheme === 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  private handleOutsideClick = (event: MouseEvent): void => {
    if (this.isMenuOpen() && !this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen.set(false);
    }
  };

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleOutsideClick);
  }
}
