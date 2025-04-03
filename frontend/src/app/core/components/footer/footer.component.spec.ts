import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let router: Router;
  let viewportScroller: ViewportScroller;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FooterComponent
      ],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    viewportScroller = TestBed.inject(ViewportScroller);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Properties', () => {
    it('should have shortcutItems defined with correct values', () => {
      expect(component.shortcutItems).toBeDefined();
      expect(component.shortcutItems.length).toBe(5);
      expect(component.shortcutItems[0].label).toBe('Accueil');
      expect(component.shortcutItems[0].routerLink).toBe('/');
      expect(component.shortcutItems[0].fragment).toBe('accueil');
    });

    it('should have legalItems defined with correct values', () => {
      expect(component.legalItems).toBeDefined();
      expect(component.legalItems.length).toBe(3);
      expect(component.legalItems[0].label).toBe('Politique de confidentialité');
      expect(component.legalItems[0].route).toBe('/legal/privacy');
    });
  });

  describe('Template Rendering', () => {
    it('should display the logo and copyright text', () => {
      const logoElement = fixture.debugElement.query(By.css('h2.text-2xl')).nativeElement;
      const copyrightElement = fixture.debugElement.query(By.css('p.text-secondary')).nativeElement;

      expect(logoElement.textContent).toContain('Julien.N');
      expect(copyrightElement.textContent).toContain('© 2025 Tous droits réservés');
    });

    it('should render all shortcut items', () => {
      const shortcutLinks = fixture.debugElement.queryAll(By.css('.grid.grid-cols-1 a'));

      expect(shortcutLinks.length).toBe(component.shortcutItems.length);

      component.shortcutItems.forEach((item, index) => {
        expect(shortcutLinks[index].nativeElement.textContent.trim()).toBe(item.label);
      });
    });

    it('should render all legal items', () => {
      const legalLinks = fixture.debugElement.queryAll(By.css('ul.space-y-2 a'));

      expect(legalLinks.length).toBe(component.legalItems.length);

      component.legalItems.forEach((item, index) => {
        expect(legalLinks[index].nativeElement.textContent.trim()).toBe(item.label);
        expect(legalLinks[index].attributes['ng-reflect-router-link']).toBe(item.route);
      });
    });
  });

  describe('Component Methods', () => {
    describe('scrollToSection', () => {
      it('should navigate to home when fragment is empty', () => {
        const navigateSpy = vi.spyOn(router, 'navigate');

        component.scrollToSection('');

        expect(navigateSpy).toHaveBeenCalledWith(['/']);
      });

      it('should navigate to home with fragment when not on home page', () => {
        const navigateSpy = vi.spyOn(router, 'navigate');
        vi.spyOn(router, 'url', 'get').mockReturnValue('/some-other-page');

        component.scrollToSection('about');

        expect(navigateSpy).toHaveBeenCalledWith(['/'], { fragment: 'about' });
      });

      it('should scroll to element when on home page', fakeAsync(() => {
        vi.spyOn(router, 'url', 'get').mockReturnValue('/');
        const mockElement = document.createElement('div');
        mockElement.scrollIntoView = vi.fn();
        const scrollIntoViewSpy = vi.spyOn(mockElement as HTMLElement & { scrollIntoView: any }, 'scrollIntoView');
        vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);

        component.scrollToSection('about');
        tick(100);

        expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
      }));

      it('should use viewportScroller as fallback when element not found', fakeAsync(() => {
        vi.spyOn(router, 'url', 'get').mockReturnValue('/');
        vi.spyOn(document, 'getElementById').mockReturnValue(null);
        const scrollToAnchorSpy = vi.spyOn(viewportScroller, 'scrollToAnchor');

        component.scrollToSection('about');
        tick(100);

        expect(scrollToAnchorSpy).toHaveBeenCalledWith('about');
      }));
    });

    describe('navigateToRoute', () => {
      it('should navigate to the specified route', () => {
        const navigateSpy = vi.spyOn(router, 'navigate');

        component.navigateToRoute('/legal/privacy');

        expect(navigateSpy).toHaveBeenCalledWith(['/legal/privacy']);
      });
    });

    describe('ngAfterViewInit', () => {
      it('should scroll to pending fragment if it exists', fakeAsync(() => {
        // Set private property using any type
        (component as any).pendingFragment = 'about';

        const mockElement = document.createElement('div');
        mockElement.scrollIntoView = vi.fn();
        const scrollIntoViewSpy = vi.spyOn(mockElement as HTMLElement & { scrollIntoView: any }, 'scrollIntoView');
        vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);

        component.ngAfterViewInit();
        tick(100);

        expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
        expect((component as any).pendingFragment).toBeNull();
      }));

      it('should use viewportScroller as fallback when element not found', fakeAsync(() => {
        // Set private property using any type
        (component as any).pendingFragment = 'about';

        vi.spyOn(document, 'getElementById').mockReturnValue(null);
        const scrollToAnchorSpy = vi.spyOn(viewportScroller, 'scrollToAnchor');

        component.ngAfterViewInit();
        tick(100);

        expect(scrollToAnchorSpy).toHaveBeenCalledWith('about');
        expect((component as any).pendingFragment).toBeNull();
      }));
    });
  });

  describe('User Interactions', () => {
    it('should call scrollToSection when shortcut item is clicked', () => {
      const scrollToSectionSpy = vi.spyOn(component, 'scrollToSection');
      const shortcutLinks = fixture.debugElement.queryAll(By.css('.grid.grid-cols-1 a'));

      shortcutLinks[0].nativeElement.click();

      expect(scrollToSectionSpy).toHaveBeenCalledWith(component.shortcutItems[0].fragment);
    });
  });
});
