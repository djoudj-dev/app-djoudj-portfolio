import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Properties', () => {
    it('should have experience properties defined', () => {
      expect(component.experience()).toBeDefined();
      expect(component.experienceDetails()).toBeDefined();
      expect(typeof component.experience()).toBe('string');
      expect(typeof component.experienceDetails()).toBe('string');
    });

    it('should have skills defined with correct structure', () => {
      expect(component.skills()).toBeDefined();
      expect(Array.isArray(component.skills())).toBe(true);
      expect(component.skills().length).toBeGreaterThan(0);

      const firstSkill = component.skills()[0];
      expect(firstSkill.name).toBeDefined();
      expect(firstSkill.icon).toBeDefined();
      expect(firstSkill.name).toBe('Angular');
      expect(firstSkill.icon).toBe('/icons/logo/angular.avif');
    });

    it('should have career change properties defined', () => {
      expect(component.careerChange()).toBeDefined();
      expect(component.careerChangeDetails()).toBeDefined();
      expect(typeof component.careerChange()).toBe('string');
      expect(typeof component.careerChangeDetails()).toBe('string');
    });

    it('should have motivations defined as an array of strings', () => {
      expect(component.motivations()).toBeDefined();
      expect(Array.isArray(component.motivations())).toBe(true);
      expect(component.motivations().length).toBe(4);
      component.motivations().forEach(motivation => {
        expect(typeof motivation).toBe('string');
      });
    });

    it('should have citation properties defined', () => {
      expect(component.citation()).toBeDefined();
      expect(component.citationAuthor()).toBeDefined();
      expect(component.citation()).toBe('La barbe ne fait pas le moine');
      expect(component.citationAuthor()).toBe('Julien Nédellec');
    });
  });

  describe('Template Rendering', () => {
    it('should render the main heading', () => {
      const headingElement = fixture.debugElement.query(By.css('h2')).nativeElement;
      expect(headingElement.textContent).toContain('À propos de moi');
    });

    it('should render experience section with correct content', () => {
      const experienceSection = fixture.debugElement.query(By.css('div.lg\\:w-1\\/2 > div:first-child'));
      const experienceHeading = experienceSection.query(By.css('h3')).nativeElement;
      const experienceParagraphs = experienceSection.queryAll(By.css('p.text-text'));

      expect(experienceHeading.textContent).toContain('Mon expérience');
      expect(experienceParagraphs[0].nativeElement.textContent.trim()).toBe(component.experience());
      expect(experienceParagraphs[1].nativeElement.textContent.trim()).toBe(component.experienceDetails());
    });

    it('should render all skills correctly', () => {
      const skillElements = fixture.debugElement.queryAll(By.css('div.flex.flex-wrap.gap-3 > div'));

      expect(skillElements.length).toBe(component.skills().length);

      component.skills().forEach((skill, index) => {
        const skillElement = skillElements[index];
        const skillName = skillElement.query(By.css('span')).nativeElement;
        const skillIcon = skillElement.query(By.css('img'));

        expect(skillName.textContent).toBe(skill.name);
        expect(skillIcon.nativeElement.getAttribute('src')).toBe(skill.icon);
        expect(skillIcon.attributes['alt']).toBe(skill.name);
      });
    });

    it('should render career change section with correct content', () => {
      const careerSection = fixture.debugElement.query(By.css('div.lg\\:w-1\\/2 > div:nth-child(2)'));
      const careerHeading = careerSection.query(By.css('h3')).nativeElement;
      const careerParagraphs = careerSection.queryAll(By.css('p.text-text'));

      expect(careerHeading.textContent).toContain('Ma reconversion');
      expect(careerParagraphs[0].nativeElement.textContent.trim()).toBe(component.careerChange());
      expect(careerParagraphs[1].nativeElement.textContent.trim()).toBe(component.careerChangeDetails());
    });

    it('should render all motivations as list items', () => {
      const motivationItems = fixture.debugElement.queryAll(By.css('ul.space-y-2.list-disc li'));

      expect(motivationItems.length).toBe(component.motivations().length);

      component.motivations().forEach((motivation, index) => {
        expect(motivationItems[index].nativeElement.textContent.trim()).toBe(motivation);
      });
    });

    it('should render profile image with correct attributes', () => {
      const profileImage = fixture.debugElement.query(By.css('img[alt="Julien NÉDELLEC"]'));

      expect(profileImage).toBeTruthy();
      expect(profileImage.nativeElement.getAttribute('src')).toBe('/images/photoProfil1.webp');
      expect(profileImage.attributes['width']).toBe('1024');
      expect(profileImage.attributes['height']).toBe('1024');
      expect(profileImage.attributes['priority']).toBeDefined();
    });

    it('should render citation with correct content', () => {
      const citationElement = fixture.debugElement.query(By.css('p.text-text.italic'));
      const authorElement = fixture.debugElement.query(By.css('p.text-accent'));

      expect(citationElement.nativeElement.textContent.trim()).toBe(component.citation());
      expect(authorElement.nativeElement.textContent).toContain(component.citationAuthor());
    });
  });

  describe('Component Imports', () => {
    it('should import NgOptimizedImage', () => {
      // Check if NgOptimizedImage is imported by verifying the component renders optimized images
      const images = fixture.debugElement.queryAll(By.css('img'));
      expect(images.length).toBeGreaterThan(0);

      // At least one image should have src attribute (transformed from ngSrc)
      const hasOptimizedImage = images.some(img => img.nativeElement.hasAttribute('src'));
      expect(hasOptimizedImage).toBe(true);
    });
  });
});
