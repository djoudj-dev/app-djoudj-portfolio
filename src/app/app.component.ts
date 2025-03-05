import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  isDarkMode = false;
  private readonly themeKey = 'theme';

  constructor() {
    this.loadTheme();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    localStorage.setItem(this.themeKey, this.isDarkMode ? 'dark' : 'light');
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey) || 'light';
    this.isDarkMode = savedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
}
