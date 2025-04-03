import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed, input, signal } from '@angular/core';

/**
 * Types de variantes disponibles pour le bouton.
 * Détermine l'apparence visuelle du bouton.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'text';

/**
 * Tailles disponibles pour le bouton.
 * Détermine les dimensions et l'espacement du bouton.
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Composant de bouton réutilisable avec différentes variantes et tailles.
 * Prend en charge les états de chargement, de désactivation et les événements de clic.
 * Utilise l'API d'entrée basée sur les signaux d'Angular pour une meilleure performance.
 */
@Component({
  selector: 'app-button',
  imports: [NgClass],
  template: `
    <button
      class="inline-flex items-center justify-center rounded-md font-semibold transition-all duration-200 ease-in-out text-text hover:scale-110 hover:shadow-lg hover:brightness-110"
      [type]="type()"
      [disabled]="disabled() || isLoading()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-disabled]="disabled() || isLoading()"
      [ngClass]="[
        variantClasses(),
        sizeClasses(),
        stateClasses(),
        disabled() || isLoading() ? 'opacity-50 cursor-not-allowed' : ''
      ]"
      (click)="onClick($event)"
    >
      <!-- Loading spinner -->
      @if (isLoading()) {
        <div class="mr-2 animate-spin">
          <svg class="mr-3 size-5 animate-spin" viewBox="0 0 24 24">
            <!-- ... -->
          </svg>
        </div>
      }

      <!-- Button content -->
      <ng-content />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  /** Variante du bouton (primary, secondary, accent, outline, text) */
  variant = input<ButtonVariant>('primary');

  /** Taille du bouton (sm, md, lg) */
  size = input<ButtonSize>('md');

  /** Indique si le bouton est désactivé */
  disabled = input<boolean>(false);

  /** Indique si le bouton doit occuper toute la largeur disponible */
  fullWidth = input<boolean>(false);

  /** Étiquette d'accessibilité pour les lecteurs d'écran */
  ariaLabel = input<string | null>(null);

  /** Type de bouton HTML (button, submit, reset) */
  type = input<'button' | 'submit' | 'reset'>('button');

  /** État de chargement du bouton */
  isLoading = signal<boolean>(false);

  /** Événement émis lors du clic sur le bouton */
  @Output() buttonClick = new EventEmitter<MouseEvent>();

  /** Classes CSS calculées en fonction de la variante du bouton */
  variantClasses = computed(() => {
    switch (this.variant()) {
      case 'primary':
        return 'bg-primary hover:bg-primary active:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 data-[theme=dark]:bg-primary-500 data-[theme=dark]:hover:bg-primary-700 data-[theme=dark]:active:bg-primary-900 data-[theme=dark]:text-primary-50 data-[theme=dark]:border data-[theme=dark]:border-text-dark';
      case 'secondary':
        return 'bg-secondary hover:bg-secondary-600 active:bg-secondary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 data-[theme=dark]:bg-secondary-500 data-[theme=dark]:hover:bg-secondary-600 data-[theme=dark]:active:bg-secondary-800 data-[theme=dark]:text-primary-50';
      case 'accent':
        return 'bg-accent hover:bg-accent-400 active:bg-accent-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 data-[theme=dark]:bg-accent-600 data-[theme=dark]:hover:bg-accent-500 data-[theme=dark]:active:bg-accent-700 data-[theme=dark]:text-primary-50';
      case 'outline':
        return 'bg-transparent border border-primary hover:bg-primary-50 active:bg-primary-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 data-[theme=dark]:border-primary-400 data-[theme=dark]:text-primary-50 data-[theme=dark]:hover:bg-primary-900 data-[theme=dark]:active:bg-primary-950';
      case 'text':
        return 'bg-transparent hover:bg-primary active:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 data-[theme=dark]:text-primary-50 data-[theme=dark]:hover:bg-primary-900 data-[theme=dark]:active:bg-primary-950';
      default:
        return 'bg-primary hover:bg-primary-600 active:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 data-[theme=dark]:bg-primary-800 data-[theme=dark]:hover:bg-primary-700 data-[theme=dark]:active:bg-primary-900 data-[theme=dark]:text-primary-50 data-[theme=dark]:border data-[theme=dark]:border-text-dark';
    }
  });

  /** Classes CSS calculées en fonction de la taille du bouton */
  sizeClasses = computed(() => {
    switch (this.size()) {
      case 'sm':
        return 'text-sm px-3 py-1.5 h-8';
      case 'md':
        return 'text-base px-4 py-2 h-10';
      case 'lg':
        return 'text-lg px-5 py-2.5 h-12';
      default:
        return 'text-base px-4 py-2 h-10';
    }
  });

  /** Classes CSS calculées en fonction de l'état du bouton (pleine largeur) */
  stateClasses = computed(() => (this.fullWidth() ? 'w-full' : ''));

  /**
   * Gère l'événement de clic sur le bouton.
   * Empêche l'action si le bouton est désactivé ou en cours de chargement.
   * @param event Événement de clic de la souris
   */
  onClick(event: MouseEvent): void {
    if (this.disabled() || this.isLoading()) {
      event.preventDefault();
      return;
    }

    this.buttonClick.emit(event);
  }

  /**
   * Définit l'état de chargement du bouton.
   * @param loading Vrai pour activer l'état de chargement, faux pour le désactiver
   */
  setLoading(loading: boolean): void {
    this.isLoading.set(loading);
  }
}
