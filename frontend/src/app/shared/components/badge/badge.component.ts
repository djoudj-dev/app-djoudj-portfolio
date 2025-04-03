import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

/**
 * Énumération des différents statuts possibles pour le badge.
 */
export enum BadgeStatus {
  Disponible = 'disponible',
  Indisponible = 'indisponible',
  DisponibleAPartirDu = 'disponible a partir du'
}

/**
 * Composant de badge affichant le statut de disponibilité.
 * Utilisé pour indiquer visuellement si un service ou une personne est disponible,
 * indisponible, ou disponible à partir d'une date spécifique.
 */
@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [NgClass],
  template: `<div
    class="badge inline-flex items-center gap-2 px-3 py-1 font-semibold rounded-full text-text border-1 border-primary bg-opacity-10"
    [ngClass]="{
      'bg-accent': status() === BadgeStatus.Disponible || status() === BadgeStatus.Indisponible || status() === BadgeStatus.DisponibleAPartirDu
    }"
    [attr.aria-label]="'Statut: ' + statusText"
    role="status"
  >
    <span
      class="w-2.5 h-2.5 rounded-full animate-pulse"
      [ngClass]="{
        'bg-green-500': status() === BadgeStatus.Disponible,
        'bg-red-900': status() === BadgeStatus.Indisponible,
        'bg-orange-400': status() === BadgeStatus.DisponibleAPartirDu
      }"
      aria-hidden="true"
    ></span>
    {{ statusText }}
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent {
  /** Expose l'énumération BadgeStatus au template */
  BadgeStatus = BadgeStatus;

  /** Signal contenant le statut actuel du badge */
  status = signal<BadgeStatus>(BadgeStatus.Disponible);

  /** Signal contenant la date à partir de laquelle la disponibilité est prévue */
  availableFromDate = signal<string>('21 Avril 2025');

  /**
   * Calcule le texte à afficher en fonction du statut actuel.
   * @returns Le texte formaté à afficher dans le badge
   */
  get statusText(): string {
    if (this.status() === BadgeStatus.DisponibleAPartirDu && this.availableFromDate()) {
      return `Disponible à partir du ${this.availableFromDate()}`;
    }
    return this.status() === BadgeStatus.Disponible ? 'Actuellement disponible' : 'Pas disponible';
  }
}
