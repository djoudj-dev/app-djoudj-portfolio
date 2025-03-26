import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, OnDestroy, signal } from '@angular/core';

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
    { label: 'Home', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Projects', href: '#' },
    { label: 'Stacks', href: '#' },
    { label: 'Contact', href: '#' }
  ];

  constructor(private elementRef: ElementRef) {
    this.loadTheme();
    document.addEventListener('click', this.handleOutsideClick);
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
