import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../shared/services/theme.service';
import { ProjectsService } from './service/projects.service';

/**
 * Composant de la page des projets.
 * Gère l'affichage et le filtrage des projets dans le portfolio.
 */
@Component({
  selector: 'app-projects',
  imports: [FormsModule, NgOptimizedImage],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  searchTerm = signal<string>('');
  filteredProjects = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.projectsService.getProjects()();

    return this.projectsService.searchProjects(term);
  });

  constructor(
    public themeService: ThemeService,
    private projectsService: ProjectsService
  ) {}

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  updateSearchTerm(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }
}
