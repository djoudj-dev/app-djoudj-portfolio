import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgOptimizedImage, ViewportScroller } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { vi, Mock } from 'vitest';

import { HomePageComponent } from './home.page.component';
import { ThemeService } from '../shared/services/theme.service';
import { BadgeDumbComponent } from '../shared/components/badge/badge.dumb.component';
import { ButtonDumbComponent } from '../shared/components/button/button.dumb.component';
import { AboutPageComponent } from './visitors/about/about.page.component';
import { SkillsPageComponent } from './visitors/skills/skills.page.component';
import { ProjectsPageComponent } from './visitors/projects/projects.page.component';
import { ContactPageComponent } from './visitors/contact/contact.page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let themeService: ThemeService & { isDarkMode: Mock };
  let viewportScroller: { scrollToAnchor: Mock };

  beforeEach(async () => {
    // Create mock services using Vitest
    const themeSpy = {
      isDarkMode: vi.fn().mockReturnValue(false)
    };

    const viewportScrollerSpy = {
      scrollToAnchor: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        HomePageComponent,
        NgOptimizedImage,
        RouterOutlet,
        BadgeDumbComponent,
        ButtonDumbComponent,
        AboutPageComponent,
        SkillsPageComponent,
        ProjectsPageComponent,
        ContactPageComponent
      ],
      providers: [
        { provide: ThemeService, useValue: themeSpy },
        { provide: ViewportScroller, useValue: viewportScrollerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService) as ThemeService & { isDarkMode: Mock };
    viewportScroller = TestBed.inject(ViewportScroller) as unknown as { scrollToAnchor: Mock };

    // Mock window.open
    vi.spyOn(window, 'open').mockImplementation(() => null);

    // Create a spy for scrollIntoView that can be tracked by the test
    const scrollIntoViewSpy = vi.fn();

    // Mock document.getElementById with a spy on scrollIntoView
    vi.spyOn(document, 'getElementById').mockImplementation(() => {
      const mockElement = document.createElement('div');
      mockElement.scrollIntoView = scrollIntoViewSpy;
      return mockElement;
    });

    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Properties', () => {
    it('should have correct title', () => {
      expect(component.title()).toBe('NÉDELLEC Julien');
    });

    it('should have correct subtitle', () => {
      expect(component.subtitle()).toBe("Développeur d'applications web et web mobile");
    });

    it('should have correct text', () => {
      expect(component.text()).toContain('Ensemble, concevons des expériences web et mobiles innovantes');
    });
  });

  describe('Component Methods', () => {
    it('should open CV in new tab when downloadCV is called', () => {
      component.downloadCV();
      expect(window.open).toHaveBeenCalledWith('/documents/CV_Nedellec-Julien_Developpeur-Web.pdf', '_blank');
    });

    it('should return correct dark mode status', () => {
      themeService.isDarkMode.mockReturnValue(false);
      expect(component.isDarkMode()).toBe(false);

      themeService.isDarkMode.mockReturnValue(true);
      expect(component.isDarkMode()).toBe(true);
    });

    it('should scroll to projects section when scrollToProjects is called', () => {
      // Mock setTimeout
      vi.spyOn(global, 'setTimeout').mockImplementation((callback) => {
        callback();
        return 0 as any;
      });

      component.scrollToProjects();

      // Check if getElementById was called with 'projects'
      expect(document.getElementById).toHaveBeenCalledWith('projects');

      // Check if scrollIntoView was called on the element
      const mockElement = document.getElementById('projects');
      expect(mockElement?.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    });

    it('should use viewportScroller as fallback if element not found', () => {
      // Mock setTimeout
      vi.spyOn(global, 'setTimeout').mockImplementation((callback) => {
        callback();
        return 0 as any;
      });

      // Mock getElementById to return null
      vi.spyOn(document, 'getElementById').mockReturnValue(null);

      component.scrollToProjects();

      // Check if viewportScroller.scrollToAnchor was called with 'projects'
      expect(viewportScroller.scrollToAnchor).toHaveBeenCalledWith('projects');
    });
  });

  describe('Template Rendering', () => {
    it('should render the main heading with correct title', () => {
      const headingElement = fixture.debugElement.query(By.css('h1')).nativeElement;
      expect(headingElement.textContent).toContain('NÉDELLEC Julien');
    });

    it('should render subtitle correctly', () => {
      const subtitleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
      expect(subtitleElement.textContent).toContain("Développeur d'applications web et web mobile");
    });

    it('should render main text correctly', () => {
      const textElement = fixture.debugElement.query(By.css('p.text-base')).nativeElement;
      expect(textElement.textContent).toContain('Ensemble, concevons des expériences web et mobiles innovantes');
    });

    it('should render download CV button', () => {
      const buttonElement = fixture.debugElement.query(By.css('button[aria-label="Télécharger mon CV"]'));
      expect(buttonElement).toBeTruthy();
    });

    it('should render projects button', () => {
      const buttonElement = fixture.debugElement.query(By.css('button[aria-label="Découvrir mes projets"]'));
      expect(buttonElement).toBeTruthy();
    });
  });

  describe('User Interactions', () => {
    it('should call downloadCV when CV button is clicked', () => {
      const spy = vi.spyOn(component, 'downloadCV');
      const buttonElement = fixture.debugElement.query(By.css('button[aria-label="Télécharger mon CV"]')).nativeElement;

      buttonElement.click();

      expect(spy).toHaveBeenCalled();
    });

    it('should call scrollToProjects when projects button is clicked', () => {
      const spy = vi.spyOn(component, 'scrollToProjects');
      const buttonElement = fixture.debugElement.query(By.css('button[aria-label="Découvrir mes projets"]')).nativeElement;

      buttonElement.click();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Service Interactions', () => {
    it('should call isDarkMode when isDarkMode is called', () => {
      component.isDarkMode();
      expect(themeService.isDarkMode).toHaveBeenCalled();
    });
  });
});
