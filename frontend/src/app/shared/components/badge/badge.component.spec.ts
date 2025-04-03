import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgClass } from '@angular/common';

import { BadgeComponent, BadgeStatus } from './badge.component';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent, NgClass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Properties', () => {
    it('should initialize status as Disponible by default', () => {
      expect(component.status()).toBe(BadgeStatus.Disponible);
    });

    it('should initialize availableFromDate with correct default value', () => {
      expect(component.availableFromDate()).toBe('21 Avril 2025');
    });

    it('should expose BadgeStatus enum to the template', () => {
      expect(component.BadgeStatus).toBe(BadgeStatus);
    });
  });

  describe('Computed Properties', () => {
    it('should return "Actuellement disponible" when status is Disponible', () => {
      component.status.set(BadgeStatus.Disponible);
      fixture.detectChanges();
      expect(component.statusText).toBe('Actuellement disponible');
    });

    it('should return "Pas disponible" when status is Indisponible', () => {
      component.status.set(BadgeStatus.Indisponible);
      fixture.detectChanges();
      expect(component.statusText).toBe('Pas disponible');
    });

    it('should return formatted date message when status is DisponibleAPartirDu', () => {
      component.status.set(BadgeStatus.DisponibleAPartirDu);
      component.availableFromDate.set('15 Juin 2024');
      fixture.detectChanges();
      expect(component.statusText).toBe('Disponible à partir du 15 Juin 2024');
    });
  });

  describe('Template Rendering', () => {
    it('should render badge with correct text content', () => {
      const badgeElement = fixture.debugElement.query(By.css('.badge')).nativeElement;
      expect(badgeElement.textContent.trim()).toBe('Actuellement disponible');
    });

    it('should have correct aria-label based on status', () => {
      const badgeElement = fixture.debugElement.query(By.css('.badge')).nativeElement;
      expect(badgeElement.getAttribute('aria-label')).toBe('Statut: Actuellement disponible');

      component.status.set(BadgeStatus.Indisponible);
      fixture.detectChanges();
      expect(badgeElement.getAttribute('aria-label')).toBe('Statut: Pas disponible');
    });

    it('should have role="status" attribute', () => {
      const badgeElement = fixture.debugElement.query(By.css('.badge')).nativeElement;
      expect(badgeElement.getAttribute('role')).toBe('status');
    });

    it('should apply bg-accent class', () => {
      const badgeElement = fixture.debugElement.query(By.css('.badge'));
      expect(badgeElement.nativeElement.classList.contains('bg-accent')).toBe(true);
    });

    it('should render indicator with green background when status is Disponible', () => {
      const indicator = fixture.debugElement.query(By.css('.badge span')).nativeElement;
      expect(indicator.classList.contains('bg-green-500')).toBe(true);
      expect(indicator.classList.contains('bg-red-900')).toBe(false);
      expect(indicator.classList.contains('bg-orange-400')).toBe(false);
    });

    it('should render indicator with red background when status is Indisponible', () => {
      component.status.set(BadgeStatus.Indisponible);
      fixture.detectChanges();

      const indicator = fixture.debugElement.query(By.css('.badge span')).nativeElement;
      expect(indicator.classList.contains('bg-green-500')).toBe(false);
      expect(indicator.classList.contains('bg-red-900')).toBe(true);
      expect(indicator.classList.contains('bg-orange-400')).toBe(false);
    });

    it('should render indicator with orange background when status is DisponibleAPartirDu', () => {
      component.status.set(BadgeStatus.DisponibleAPartirDu);
      fixture.detectChanges();

      const indicator = fixture.debugElement.query(By.css('.badge span')).nativeElement;
      expect(indicator.classList.contains('bg-green-500')).toBe(false);
      expect(indicator.classList.contains('bg-red-900')).toBe(false);
      expect(indicator.classList.contains('bg-orange-400')).toBe(true);
    });

    it('should update text when status changes', () => {
      const badgeElement = fixture.debugElement.query(By.css('.badge')).nativeElement;
      expect(badgeElement.textContent.trim()).toBe('Actuellement disponible');

      component.status.set(BadgeStatus.Indisponible);
      fixture.detectChanges();
      expect(badgeElement.textContent.trim()).toBe('Pas disponible');

      component.status.set(BadgeStatus.DisponibleAPartirDu);
      fixture.detectChanges();
      expect(badgeElement.textContent.trim()).toBe('Disponible à partir du 21 Avril 2025');
    });
  });
});
