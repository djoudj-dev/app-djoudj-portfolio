import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { NavbarSmartComponent } from './navbar.smart.component';

describe('NavbarSmartComponent', () => {
  let component: NavbarSmartComponent;
  let fixture: ComponentFixture<NavbarSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarSmartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle theme correctly', () => {
    component.isDarkMode.set(false); // Assure que le thème initial est clair
    component.toggleTheme();

    expect(component.isDarkMode()).toBe(true); // Doit maintenant être en mode sombre
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');

    component.toggleTheme();

    expect(component.isDarkMode()).toBe(false); // Doit repasser en mode clair
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('should toggle menu state correctly', () => {
    const initialMenuState = component.isMenuOpen();
    component.toggleMenu();
    expect(component.isMenuOpen()).toBe(!initialMenuState);
  });

  it('should close menu', () => {
    component.isMenuOpen.set(true);
    component.closeMenu();
    expect(component.isMenuOpen()).toBe(false);
  });

  it('should load theme from localStorage on initialization', () => {
    localStorage.setItem('theme', 'dark');

    fixture = TestBed.createComponent(NavbarSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isDarkMode()).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should close menu when clicking outside', () => {
    component.isMenuOpen.set(true);
    const clickEvent = new MouseEvent('click', { bubbles: true });
    document.dispatchEvent(clickEvent);
    expect(component.isMenuOpen()).toBe(false);
  });

  it('should not close menu when clicking inside', () => {
    component.isMenuOpen.set(true);
    const clickEvent = new MouseEvent('click', { bubbles: true });
    component['elementRef'].nativeElement.dispatchEvent(clickEvent);
    expect(component.isMenuOpen()).toBe(true);
  });

  it('should remove event listener on destroy', () => {
    const spy = vi.spyOn(document, 'removeEventListener');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalledWith('click', component['handleOutsideClick']);
  });

  it('should initialize with default theme if no theme is in localStorage', () => {
    localStorage.removeItem('theme');
    component['loadTheme']();
    expect(component.isDarkMode()).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should not toggle theme if localStorage is unavailable', () => {
    const originalLocalStorage = global.localStorage;
    Object.defineProperty(global, 'localStorage', {
      value: undefined, // Doit être undefined et non null
      configurable: true,
      writable: true
    });

    component.toggleTheme();

    expect(localStorage).toBeUndefined(); // Vérifier que ça n'a pas crashé

    // Restaurer localStorage
    Object.defineProperty(global, 'localStorage', {
      value: originalLocalStorage
    });
  });
});
