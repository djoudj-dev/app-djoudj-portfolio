import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../shared/services/theme.service';
import { ProjectsService } from '../../../shared/services/projects.service';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [FormsModule, NgOptimizedImage],
  templateUrl: './projects.page.component.html',
  styleUrl: './projects.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsPageComponent {
  /** Search term for filtering projects */
  searchTerm = signal<string>('');

  /** Filtered projects based on search term */
  filteredProjects = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.projectsService.getProjects()();

    return this.projectsService.searchProjects(term);
  });

  /**
   * Constructor injects the required services
   * @param themeService Service to manage theme preferences
   * @param projectsService Service to manage projects data
   */
  constructor(
    public themeService: ThemeService,
    private projectsService: ProjectsService
  ) {}

  /**
   * Check if dark mode is enabled
   * @returns True if dark mode is enabled, false otherwise
   */
  isDarkMode(): boolean {
    return this.themeService.getTheme() === 'dark';
  }

  /**
   * Update search term
   * @param event Input event
   */
  updateSearchTerm(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }
}
