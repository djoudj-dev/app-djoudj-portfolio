import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgOptimizedImage, NgClass } from '@angular/common';
import { vi, Mock } from 'vitest';

import { SkillsPageComponent } from './skills.page.component';
import { ThemeService } from '../../../shared/services/theme.service';

describe('SkillsPageComponent', () => {
  let component: SkillsPageComponent;
  let fixture: ComponentFixture<SkillsPageComponent>;
  let themeService: ThemeService & { isDarkMode: Mock };

  beforeEach(async () => {
    // Create mock services using Vitest
    const themeSpy = {
      isDarkMode: vi.fn().mockReturnValue(false)
    };

    await TestBed.configureTestingModule({
      imports: [SkillsPageComponent, NgOptimizedImage, NgClass],
      providers: [
        { provide: ThemeService, useValue: themeSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsPageComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService) as ThemeService & { isDarkMode: Mock };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Properties', () => {
    it('should have frontendSkills with correct structure and data', () => {
      const frontendSkills = component.frontendSkills();
      expect(frontendSkills.title).toBe('Frontend');
      expect(frontendSkills.description).toContain('Technologies et frameworks pour le développement d’interfaces utilisateur modernes, réactives et accessibles, garantissant une expérience fluide et ergonomique.');
      expect(frontendSkills.skills.length).toBe(4);
      expect(frontendSkills.skills[0].name).toBe('Angular');
      expect(frontendSkills.skills[0].icon).toBe('/icons/logo/angular.svg');
    });

    it('should have backendSkills with correct structure and data', () => {
      const backendSkills = component.backendSkills();
      expect(backendSkills.title).toBe('Backend');
      expect(backendSkills.description).toContain('Frameworks et technologies permettant de concevoir des API');
      expect(backendSkills.skills.length).toBe(4);
      expect(backendSkills.skills[0].name).toBe('NestJS');
      expect(backendSkills.skills[0].icon).toBe('/icons/logo/nestjs.svg');
    });

    it('should have databaseSkills with correct structure and data', () => {
      const databaseSkills = component.databaseSkills();
      expect(databaseSkills.title).toBe('Base de données');
      expect(databaseSkills.description).toContain('Solutions de stockage et de gestion des données');
      expect(databaseSkills.skills.length).toBe(3);
      expect(databaseSkills.skills[0].name).toBe('MongoDB');
      expect(databaseSkills.skills[0].icon).toBe('/icons/logo/mongodb.svg');
    });

    it('should have devopsSkills with correct structure and data', () => {
      const devopsSkills = component.devopsSkills();
      expect(devopsSkills.title).toBe('DevOps & Outils');
      expect(devopsSkills.description).toContain('Ensemble d’outils et de technologies facilitant l’automatisation, le déploiement, la gestion de projet et l’amélioration des workflows de développement.');
      expect(devopsSkills.skills.length).toBe(5);
      expect(devopsSkills.skills[0].name).toBe('Docker');
      expect(devopsSkills.skills[0].icon).toBe('/icons/logo/docker.svg');
    });

    it('should have skillCategories containing all four skill categories', () => {
      const categories = component.skillCategories();
      expect(categories.length).toBe(4);
      expect(categories[0].title).toBe('Frontend');
      expect(categories[1].title).toBe('Backend');
      expect(categories[2].title).toBe('Base de données');
      expect(categories[3].title).toBe('DevOps & Outils');
    });
  });

  describe('Component Methods', () => {
    it('should return correct dark mode status', () => {
      themeService.isDarkMode.mockReturnValue(false);
      expect(component.isDarkMode()).toBe(false);

      themeService.isDarkMode.mockReturnValue(true);
      expect(component.isDarkMode()).toBe(true);
    });
  });

  describe('Template Rendering', () => {
    it('should render the main heading', () => {
      const headingElement = fixture.debugElement.query(By.css('h2')).nativeElement;
      expect(headingElement.textContent).toContain('Mes compétences techniques');
    });

    it('should render all skill categories', () => {
      const categoryElements = fixture.debugElement.queryAll(By.css('.grid.grid-cols-1 > div'));
      expect(categoryElements.length).toBe(4);
    });

    it('should render category titles correctly', () => {
      const categoryTitles = fixture.debugElement.queryAll(By.css('h3 span'));
      expect(categoryTitles.length).toBe(4);
      expect(categoryTitles[0].nativeElement.textContent).toBe('Frontend');
      expect(categoryTitles[1].nativeElement.textContent).toBe('Backend');
      expect(categoryTitles[2].nativeElement.textContent).toBe('Base de données');
      expect(categoryTitles[3].nativeElement.textContent).toBe('DevOps & Outils');
    });

    it('should render category descriptions correctly', () => {
      const descriptions = fixture.debugElement.queryAll(By.css('.p-6 p'));
      expect(descriptions.length).toBe(4);
      expect(descriptions[0].nativeElement.textContent).toContain('Technologies et frameworks pour le développement d’interfaces utilisateur modernes, réactives et accessibles, garantissant une expérience fluide et ergonomique.');
      expect(descriptions[1].nativeElement.textContent).toContain('Frameworks et technologies permettant de concevoir des API');
      expect(descriptions[2].nativeElement.textContent).toContain('Solutions de stockage et de gestion des données');
      expect(descriptions[3].nativeElement.textContent).toContain('Ensemble d’outils et de technologies facilitant l’automatisation, le déploiement, la gestion de projet et l’amélioration des workflows de développement.');
    });

    it('should render correct number of skills for each category', () => {
      const skillContainers = fixture.debugElement.queryAll(By.css('.flex.flex-wrap.gap-3'));

      // Get skills for each category
      const frontendSkills = skillContainers[0].queryAll(By.css('div.flex.items-center'));
      const backendSkills = skillContainers[1].queryAll(By.css('div.flex.items-center'));
      const databaseSkills = skillContainers[2].queryAll(By.css('div.flex.items-center'));
      const devopsSkills = skillContainers[3].queryAll(By.css('div.flex.items-center'));

      expect(frontendSkills.length).toBe(4);
      expect(backendSkills.length).toBe(4);
      expect(databaseSkills.length).toBe(3);
      expect(devopsSkills.length).toBe(5);
    });

    it('should render skill names correctly', () => {
      // Check first skill in each category
      const categories = fixture.debugElement.queryAll(By.css('.grid.grid-cols-1 > div'));

      const frontendFirstSkill = categories[0].query(By.css('.flex.flex-wrap.gap-3 div:first-child span')).nativeElement;
      const backendFirstSkill = categories[1].query(By.css('.flex.flex-wrap.gap-3 div:first-child span')).nativeElement;
      const databaseFirstSkill = categories[2].query(By.css('.flex.flex-wrap.gap-3 div:first-child span')).nativeElement;
      const devopsFirstSkill = categories[3].query(By.css('.flex.flex-wrap.gap-3 div:first-child span')).nativeElement;

      expect(frontendFirstSkill.textContent).toBe('Angular');
      expect(backendFirstSkill.textContent).toBe('NestJS');
      expect(databaseFirstSkill.textContent).toBe('MongoDB');
      expect(devopsFirstSkill.textContent).toBe('Docker');
    });

    it('should render skill icons correctly', () => {
      // Check first skill icon in each category
      const categories = fixture.debugElement.queryAll(By.css('.grid.grid-cols-1 > div'));

      const frontendFirstIcon = categories[0].query(By.css('.flex.flex-wrap.gap-3 div:first-child img')).nativeElement;
      const backendFirstIcon = categories[1].query(By.css('.flex.flex-wrap.gap-3 div:first-child img')).nativeElement;
      const databaseFirstIcon = categories[2].query(By.css('.flex.flex-wrap.gap-3 div:first-child img')).nativeElement;
      const devopsFirstIcon = categories[3].query(By.css('.flex.flex-wrap.gap-3 div:first-child img')).nativeElement;

      expect(frontendFirstIcon.getAttribute('alt')).toBe('Angular');
      expect(backendFirstIcon.getAttribute('alt')).toBe('NestJS');
      expect(databaseFirstIcon.getAttribute('alt')).toBe('MongoDB');
      expect(devopsFirstIcon.getAttribute('alt')).toBe('Docker');
    });

    it('should apply correct CSS classes based on dark mode', () => {
      // First test with light mode
      themeService.isDarkMode.mockReturnValue(false);
      component.isDarkMode = () => false;
      fixture.detectChanges();

      let frontendIcon = fixture.debugElement.query(By.css('h3 img')).nativeElement;
      expect(frontendIcon.classList.contains('frontend-light-icon')).toBe(true);
      expect(frontendIcon.classList.contains('frontend-dark-icon')).toBe(false);

      // Then test with dark mode
      themeService.isDarkMode.mockReturnValue(true);
      component.isDarkMode = () => true;
      fixture.detectChanges();

      frontendIcon = fixture.debugElement.query(By.css('h3 img')).nativeElement;
      expect(frontendIcon.classList.contains('frontend-dark-icon')).toBe(true);
      expect(frontendIcon.classList.contains('frontend-light-icon')).toBe(false);
    });
  });

  describe('Service Interactions', () => {
    it('should call isDarkMode when isDarkMode is called', () => {
      component.isDarkMode();
      expect(themeService.isDarkMode).toHaveBeenCalled();
    });
  });
});
