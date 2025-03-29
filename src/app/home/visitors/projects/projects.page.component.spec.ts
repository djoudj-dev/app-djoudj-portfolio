import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { signal } from '@angular/core';
import { vi, Mock } from 'vitest';

import { ProjectsPageComponent } from './projects.page.component';
import { ThemeService } from '../../../shared/services/theme.service';
import { ProjectsService } from '../../../shared/services/projects.service';
import { Project } from '../../../shared/models/project.model';

describe('ProjectsPageComponent', () => {
  let component: ProjectsPageComponent;
  let fixture: ComponentFixture<ProjectsPageComponent>;
  let themeService: ThemeService & { getTheme: Mock, isDarkMode: Mock };
  let projectsService: ProjectsService & { searchProjects: Mock, getProjects: Mock };

  // Mock projects data
  const mockProjects: Project[] = [
    {
      id: 1,
      title: 'Test Project 1',
      description: 'Description for test project 1',
      technologies: [
        { name: 'Angular', icon: '/icons/logo/angular.svg' },
        { name: 'TypeScript', icon: '/icons/logo/typescript.svg' }
      ],
      imageUrl: '/images/projects/test1.webp',
      githubUrl: 'https://github.com/test/project1'
    },
    {
      id: 2,
      title: 'Test Project 2',
      description: 'Description for test project 2',
      technologies: [
        { name: 'NestJS', icon: '/icons/logo/nestjs.svg' },
        { name: 'MongoDB', icon: '/icons/logo/mongodb.svg' }
      ],
      imageUrl: '/images/projects/test2.webp',
      projectUrl: 'https://project2.example.com'
    }
  ];

  beforeEach(async () => {
    // Create mock services using Vitest
    const themeSpy = {
      getTheme: vi.fn().mockReturnValue('light'),
      isDarkMode: vi.fn().mockReturnValue(false)
    };

    const projectsSpy = {
      getProjects: vi.fn().mockReturnValue(signal(mockProjects)),
      searchProjects: vi.fn().mockReturnValue(mockProjects)
    };

    await TestBed.configureTestingModule({
      imports: [ProjectsPageComponent, FormsModule, NgOptimizedImage],
      providers: [
        { provide: ThemeService, useValue: themeSpy },
        { provide: ProjectsService, useValue: projectsSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsPageComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService) as ThemeService & { getTheme: Mock, isDarkMode: Mock };
    projectsService = TestBed.inject(ProjectsService) as ProjectsService & { searchProjects: Mock, getProjects: Mock };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Properties', () => {
    it('should initialize searchTerm as empty string', () => {
      expect(component.searchTerm()).toBe('');
    });

    it('should return all projects when searchTerm is empty', () => {
      expect(component.filteredProjects()).toEqual(mockProjects);
      expect(projectsService.getProjects).toHaveBeenCalled();
    });

    it('should filter projects when searchTerm is set', () => {
      // Set search term
      component.searchTerm.set('test');
      fixture.detectChanges();

      // Verify searchProjects was called with the correct term
      expect(projectsService.searchProjects).toHaveBeenCalledWith('test');
      expect(component.filteredProjects()).toEqual(mockProjects);
    });
  });

  describe('Template Rendering', () => {
    it('should render the main heading', () => {
      const headingElement = fixture.debugElement.query(By.css('h2')).nativeElement;
      expect(headingElement.textContent).toContain('Mes projets');
    });

    it('should render search input with correct attributes', () => {
      const searchInput = fixture.debugElement.query(By.css('input[type="search"]'));

      expect(searchInput).toBeTruthy();
      expect(searchInput.nativeElement.placeholder).toContain('Rechercher par titre, description ou technologie');
      expect(searchInput.nativeElement.value).toBe('');
    });

    it('should render project cards for each project', () => {
      const projectCards = fixture.debugElement.queryAll(By.css('.grid.grid-cols-1 > div'));

      expect(projectCards.length).toBe(mockProjects.length);

      // Check first project card content
      const firstCard = projectCards[0];
      const title = firstCard.query(By.css('h3')).nativeElement;
      const description = firstCard.query(By.css('p.text-text')).nativeElement;

      expect(title.textContent).toContain(mockProjects[0].title);
      expect(description.textContent).toContain(mockProjects[0].description);
    });

    it('should render technology badges for each project', () => {
      const firstProjectTechBadges = fixture.debugElement.queryAll(By.css('.grid.grid-cols-1 > div:first-child .flex.flex-wrap.gap-2 > div'));

      expect(firstProjectTechBadges.length).toBe(mockProjects[0].technologies.length);

      // Check first technology badge
      const firstTechBadge = firstProjectTechBadges[0];
      const techName = firstTechBadge.query(By.css('span')).nativeElement;

      expect(techName.textContent).toContain(mockProjects[0].technologies[0].name);
    });

    it('should render GitHub link when githubUrl is provided', () => {
      const githubLinks = fixture.debugElement.queryAll(By.css('a[href*="github.com"]'));

      // Only the first project has a GitHub URL
      expect(githubLinks.length).toBe(1);
      expect(githubLinks[0].nativeElement.href).toContain(mockProjects[0].githubUrl);
    });

    it('should render demo link when projectUrl is provided', () => {
      const demoLinks = fixture.debugElement.queryAll(By.css('a:not([href*="github.com"])[target="_blank"]'));

      // Only the second project has a project URL
      expect(demoLinks.length).toBe(1);
      expect(demoLinks[0].nativeElement.href).toContain(mockProjects[1].projectUrl);
    });

    it('should show no results message when filteredProjects is empty', () => {
      // Mock empty projects array
      projectsService.searchProjects.mockReturnValue([]);

      // Set search term to trigger filtering
      component.searchTerm.set('nonexistent');
      fixture.detectChanges();

      const noResultsMessage = fixture.debugElement.query(By.css('.text-center.py-10'));
      expect(noResultsMessage).toBeTruthy();
      expect(noResultsMessage.query(By.css('p')).nativeElement.textContent).toContain('Aucun projet ne correspond');
    });
  });

  describe('Component Methods', () => {
    it('should return correct dark mode status', () => {
      themeService.isDarkMode.mockReturnValue(false);
      expect(component.isDarkMode()).toBe(false);

      themeService.isDarkMode.mockReturnValue(true);
      expect(component.isDarkMode()).toBe(true);
    });

    it('should update searchTerm when updateSearchTerm is called', () => {
      const mockEvent = { target: { value: 'new search' } } as unknown as Event;
      component.updateSearchTerm(mockEvent);

      expect(component.searchTerm()).toBe('new search');
    });
  });

  describe('User Interactions', () => {
    it('should update search term when user types in search input', () => {
      const searchInput = fixture.debugElement.query(By.css('input[type="search"]')).nativeElement;

      searchInput.value = 'angular';
      searchInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.searchTerm()).toBe('angular');
      expect(projectsService.searchProjects).toHaveBeenCalledWith('angular');
    });

    it('should reset search when reset button is clicked', () => {
      // First make sure we have no results to show the reset button
      projectsService.searchProjects.mockReturnValue([]);
      component.searchTerm.set('nonexistent');
      fixture.detectChanges();

      // Find and click the reset button
      const resetButton = fixture.debugElement.query(By.css('button'));
      resetButton.nativeElement.click();
      fixture.detectChanges();

      expect(component.searchTerm()).toBe('');
    });
  });

  describe('Service Interactions', () => {
    it('should call getProjects on initialization', () => {
      expect(projectsService.getProjects).toHaveBeenCalled();
    });

    it('should call searchProjects when searchTerm changes', () => {
      component.searchTerm.set('angular');
      fixture.detectChanges();

      expect(projectsService.searchProjects).toHaveBeenCalledWith('angular');
    });

    it('should call isDarkMode when isDarkMode is called', () => {
      component.isDarkMode();
      expect(themeService.isDarkMode).toHaveBeenCalled();
    });
  });
});
