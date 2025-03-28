import { Injectable, signal } from '@angular/core';

/**
 * Service for managing theme (light/dark mode) across the application
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  /** Key used for storing theme preference in localStorage */
  private readonly themeKey = 'theme';

  /** Signal for dark mode state */
  isDarkMode = signal<boolean>(false);

  constructor() {
    this.loadTheme();
  }

  /**
   * Toggles between light and dark theme
   */
  toggleTheme(): void {
    const newTheme = this.isDarkMode() ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  /**
   * Sets the theme to the specified value
   * @param theme The theme to set ('light' or 'dark')
   */
  setTheme(theme: 'light' | 'dark'): void {
    this.isDarkMode.set(theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme);

    if (typeof localStorage !== 'undefined' && localStorage !== null) {
      localStorage.setItem(this.themeKey, theme);
    }
  }

  /**
   * Gets the current theme
   * @returns The current theme ('light' or 'dark')
   */
  getTheme(): 'light' | 'dark' {
    return this.isDarkMode() ? 'dark' : 'light';
  }

  /**
   * Loads the theme preference from localStorage
   */
  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey) || 'light';
    this.isDarkMode.set(savedTheme === 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
}
