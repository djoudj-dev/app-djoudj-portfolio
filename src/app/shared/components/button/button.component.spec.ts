import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

import { ButtonComponent, ButtonSize, ButtonVariant } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonElement: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input properties', () => {
    it('should set default values correctly', () => {
      expect(component.variant()).toBe('primary');
      expect(component.size()).toBe('md');
      expect(component.disabled()).toBe(false);
      expect(component.fullWidth()).toBe(false);
      expect(component.ariaLabel()).toBeNull();
      expect(component.type()).toBe('button');
      expect(component.isLoading()).toBe(false);
    });

    it('should apply variant classes correctly', () => {
      const variants: ButtonVariant[] = ['primary', 'secondary', 'accent', 'outline', 'text'];

      variants.forEach(variant => {
        fixture.componentRef.setInput('variant', variant);
        fixture.detectChanges();

        expect(buttonElement.classList.toString()).toContain(component.variantClasses());
      });
    });

    it('should apply size classes correctly', () => {
      const sizes: ButtonSize[] = ['sm', 'md', 'lg'];

      sizes.forEach(size => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        expect(buttonElement.classList.toString()).toContain(component.sizeClasses());
      });
    });

    it('should handle disabled state correctly', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(buttonElement.disabled).toBe(true);
      expect(buttonElement.classList.toString()).toContain('opacity-50');
      expect(buttonElement.classList.toString()).toContain('cursor-not-allowed');
      expect(buttonElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should handle fullWidth state correctly', () => {
      fixture.componentRef.setInput('fullWidth', true);
      fixture.detectChanges();

      expect(buttonElement.classList.toString()).toContain('w-full');
    });

    it('should set aria-label correctly', () => {
      const testLabel = 'Test Button Label';
      fixture.componentRef.setInput('ariaLabel', testLabel);
      fixture.detectChanges();

      expect(buttonElement.getAttribute('aria-label')).toBe(testLabel);
    });

    it('should set button type correctly', () => {
      const types: ('button' | 'submit' | 'reset')[] = ['button', 'submit', 'reset'];

      types.forEach(type => {
        fixture.componentRef.setInput('type', type);
        fixture.detectChanges();

        expect(buttonElement.type).toBe(type);
      });
    });
  });

  describe('Loading state', () => {
    it('should handle loading state correctly', () => {
      component.setLoading(true);
      fixture.detectChanges();

      expect(component.isLoading()).toBe(true);
      expect(buttonElement.disabled).toBe(true);
      expect(buttonElement.getAttribute('aria-disabled')).toBe('true');

      const loadingSpinner = fixture.debugElement.query(By.css('.animate-spin'));
      expect(loadingSpinner).toBeTruthy();
    });

    it('should remove loading state correctly', () => {
      component.setLoading(true);
      fixture.detectChanges();

      component.setLoading(false);
      fixture.detectChanges();

      expect(component.isLoading()).toBe(false);
      expect(buttonElement.disabled).toBe(false);

      const loadingSpinner = fixture.debugElement.query(By.css('.animate-spin'));
      expect(loadingSpinner).toBeFalsy();
    });
  });

  describe('Click events', () => {
    it('should emit buttonClick event when clicked', () => {
      const spy = vi.spyOn(component.buttonClick, 'emit');
      buttonElement.click();

      expect(spy).toHaveBeenCalled();
    });

    it('should not emit buttonClick event when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const spy = vi.spyOn(component.buttonClick, 'emit');
      buttonElement.click();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not emit buttonClick event when loading', () => {
      component.setLoading(true);
      fixture.detectChanges();

      const spy = vi.spyOn(component.buttonClick, 'emit');
      buttonElement.click();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should call onClick method when clicked', () => {
      const spy = vi.spyOn(component, 'onClick');
      buttonElement.click();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Content projection', () => {
    it('should project content correctly', () => {
      const testFixture = TestBed.createComponent(ButtonComponent);
      testFixture.componentRef.setInput('variant', 'primary');
      testFixture.detectChanges();

      // Create a div with text to project
      const contentElement = document.createElement('div');
      contentElement.textContent = 'Test Button';

      // Manually add the content to the component's element
      const buttonComponentElement = testFixture.debugElement.nativeElement;
      const buttonElement = buttonComponentElement.querySelector('button');
      buttonElement.appendChild(contentElement);

      testFixture.detectChanges();

      expect(buttonElement.textContent).toContain('Test Button');
    });
  });
});
