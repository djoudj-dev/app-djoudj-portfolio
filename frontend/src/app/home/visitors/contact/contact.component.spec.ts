import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { ThemeService } from '../../../shared/services/theme.service';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, ReactiveFormsModule, NgClass, NgOptimizedImage],
      providers: [ThemeService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Properties', () => {
    it('should have contactInfo defined with correct structure', () => {
      expect(component.contactInfo()).toBeDefined();
      expect(Array.isArray(component.contactInfo())).toBe(true);
      expect(component.contactInfo().length).toBe(4);

      const emailInfo = component.contactInfo()[0];
      expect(emailInfo.title).toBe('Email');
      expect(emailInfo.value).toBe('contact@nedellec-julien.fr');
      expect(emailInfo.link).toBe('mailto:contact@nedellec-julien.fr');
    });

    it('should have socialLinks defined with correct structure', () => {
      expect(component.socialLinks()).toBeDefined();
      expect(Array.isArray(component.socialLinks())).toBe(true);
      expect(component.socialLinks().length).toBe(3);

      const linkedinLink = component.socialLinks()[0];
      expect(linkedinLink.name).toBe('LinkedIn');
      expect(linkedinLink.icon).toBe('/icons/logo/linkedin.svg');
      expect(linkedinLink.url).toBe('https://www.linkedin.com/in/nedellec-julien/');
    });

    it('should initialize contact form with required validators', () => {
      expect(component.contactForm).toBeDefined();

      const nameControl = component.contactForm.get('name');
      const emailControl = component.contactForm.get('email');
      const subjectControl = component.contactForm.get('subject');
      const messageControl = component.contactForm.get('message');

      expect(nameControl).toBeDefined();
      expect(emailControl).toBeDefined();
      expect(subjectControl).toBeDefined();
      expect(messageControl).toBeDefined();
    });
  });

  describe('Template Rendering', () => {
    it('should render the main heading', () => {
      const headingElement = fixture.debugElement.query(By.css('h2')).nativeElement;
      expect(headingElement.textContent).toContain('Contact');
    });

    it('should render all contact info cards', () => {
      const contactCards = fixture.debugElement.queryAll(By.css('.space-y-4 > div'));
      expect(contactCards.length).toBe(component.contactInfo().length);
    });

    it('should render social media links', () => {
      const socialLinks = fixture.debugElement.queryAll(By.css('.flex.space-x-3 > a'));
      expect(socialLinks.length).toBe(component.socialLinks().length);
    });

    it('should render contact form with all fields', () => {
      const form = fixture.debugElement.query(By.css('form'));
      const nameInput = fixture.debugElement.query(By.css('#name'));
      const emailInput = fixture.debugElement.query(By.css('#email'));
      const subjectInput = fixture.debugElement.query(By.css('#subject'));
      const messageTextarea = fixture.debugElement.query(By.css('#message'));
      const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

      expect(form).toBeTruthy();
      expect(nameInput).toBeTruthy();
      expect(emailInput).toBeTruthy();
      expect(subjectInput).toBeTruthy();
      expect(messageTextarea).toBeTruthy();
      expect(submitButton).toBeTruthy();
      expect(submitButton.nativeElement.textContent.trim()).toBe('Envoyer');
    });
  });

  describe('Component Methods', () => {
    it('should return correct dark mode status', () => {
      themeService.isDarkMode.set(false);
      expect(component.isDarkMode()).toBe(false);

      themeService.isDarkMode.set(true);
      expect(component.isDarkMode()).toBe(true);
    });

    it('should return correct icon path based on title and theme', () => {
      themeService.isDarkMode.set(false);
      expect(component.getIconPath('Email')).toBe('/icons/logo/mail-light.svg');

      themeService.isDarkMode.set(true);
      expect(component.getIconPath('Email')).toBe('/icons/logo/mail-dark.svg');
    });

    it('should correctly check for form field errors', () => {
      component.contactForm.get('name')?.setValue('');
      component.contactForm.get('name')?.markAsTouched();

      expect(component.hasError('name', 'required')).toBe(true);
    });

    it('should correctly check if form field is invalid', () => {
      component.contactForm.get('email')?.setValue('');
      component.contactForm.get('email')?.markAsTouched();
      expect(component.isInvalid('email')).toBe(true);
    });

    it('should return correct message character count', () => {
      component.contactForm.get('message')?.setValue('Hello World');
      expect(component.getMessageCharCount()).toBe(11);
    });
  });

  describe('Form Validation', () => {
    it('should validate name field correctly', () => {
      const nameControl = component.contactForm.get('name');

      nameControl?.setValue('');
      expect(nameControl?.valid).toBe(false);

      nameControl?.setValue('John');
      expect(nameControl?.valid).toBe(true);
    });

    it('should validate email field correctly', () => {
      const emailControl = component.contactForm.get('email');

      emailControl?.setValue('');
      expect(emailControl?.valid).toBe(false);

      emailControl?.setValue('valid@email.com');
      expect(emailControl?.valid).toBe(true);
    });
  });

  describe('Form Submission', () => {
    it('should set formSubmitted to true when form is submitted', () => {
      component.onSubmit();
      expect(component.formSubmitted()).toBe(true);
    });

    it('should set formSuccess to true when form is valid', () => {
      // Make form valid
      component.contactForm.get('name')?.setValue('John Doe');
      component.contactForm.get('email')?.setValue('john@example.com');
      component.contactForm.get('subject')?.setValue('Test Subject');
      component.contactForm.get('message')?.setValue('This is a test message with appropriate length');

      // Submit form
      component.onSubmit();

      expect(component.formSuccess()).toBe(true);
    });
  });
});
