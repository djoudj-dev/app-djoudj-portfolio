import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../shared/services/theme.service';
import { ProjectsService } from '../../../shared/services/projects.service';

/**
 * Composant de la page des projets.
 * Gère l'affichage et le filtrage des projets dans le portfolio.
 */
@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [FormsModule, NgOptimizedImage],
  templateUrl: './projects.page.component.html',
  styleUrl: './projects.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsPageComponent {
  /** Terme de recherche pour filtrer les projets */
  searchTerm = signal<string>('');

  /** Projets filtrés en fonction du terme de recherche */
  filteredProjects = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.projectsService.getProjects()();

    return this.projectsService.searchProjects(term);
  });

  /**
   * Constructeur qui injecte les services requis
   * @param themeService Service pour gérer les préférences de thème
   * @param projectsService Service pour gérer les données des projets
   */
  constructor(
    public themeService: ThemeService,
    private projectsService: ProjectsService
  ) {}

  /**
   * Vérifie si le mode sombre est activé
   * @returns Vrai si le mode sombre est activé, faux sinon
   */
  isDarkMode(): boolean {
    return this.themeService.getTheme() === 'dark';
  }

  /**
   * Met à jour le terme de recherche
   * @param event Événement d'entrée
   */
  updateSearchTerm(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }
}
