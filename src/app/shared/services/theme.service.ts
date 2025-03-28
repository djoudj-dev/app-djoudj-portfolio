import { Injectable, signal } from '@angular/core';

/**
 * Service de gestion du thème (mode clair/sombre) dans toute l'application.
 * Permet de basculer entre les thèmes et de sauvegarder les préférences de l'utilisateur.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  /** Clé utilisée pour stocker la préférence de thème dans le localStorage */
  private readonly themeKey = 'theme';

  /** Signal pour l'état du mode sombre */
  isDarkMode = signal<boolean>(false);

  constructor() {
    this.loadTheme();
  }

  /**
   * Bascule entre les thèmes clair et sombre.
   */
  toggleTheme(): void {
    const newTheme = this.isDarkMode() ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  /**
   * Définit le thème à la valeur spécifiée.
   * @param theme Le thème à définir ('light' pour clair ou 'dark' pour sombre)
   */
  setTheme(theme: 'light' | 'dark'): void {
    this.isDarkMode.set(theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme);

    if (typeof localStorage !== 'undefined' && localStorage !== null) {
      localStorage.setItem(this.themeKey, theme);
    }
  }

  /**
   * Récupère le thème actuel.
   * @returns Le thème actuel ('light' pour clair ou 'dark' pour sombre)
   */
  getTheme(): 'light' | 'dark' {
    return this.isDarkMode() ? 'dark' : 'light';
  }

  /**
   * Charge la préférence de thème depuis le localStorage.
   */
  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey) || 'light';
    this.isDarkMode.set(savedTheme === 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
}
