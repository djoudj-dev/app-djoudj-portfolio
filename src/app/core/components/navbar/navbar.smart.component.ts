import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.smart.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class NavbarSmartComponent {
  isDarkMode = signal<boolean>(false);
  isMenuOpen = signal<boolean>(false);
  private readonly themeKey = 'theme';

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    this.isDarkMode.update(current => !current);
    document.documentElement.setAttribute('data-theme', this.isDarkMode() ? 'dark' : 'light');
    localStorage.setItem(this.themeKey, this.isDarkMode() ? 'dark' : 'light');
  }

  toggleMenu(): void {
    this.isMenuOpen.update(current => !current);
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey) || 'light';
    this.isDarkMode.set(savedTheme === 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
}
