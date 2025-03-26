import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

export enum BadgeStatus {
  Disponible = 'disponible',
  Indisponible = 'indisponible',
  DisponibleAPartirDu = 'disponible a partir du'
}

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
export class BadgeDumbComponent {
  BadgeStatus = BadgeStatus; // Expose enum to template
  status = signal<BadgeStatus>(BadgeStatus.Disponible);
  availableFromDate = signal<string>('21 Avril 2025');

  get statusText(): string {
    if (this.status() === BadgeStatus.DisponibleAPartirDu && this.availableFromDate()) {
      return `Disponible à partir du ${this.availableFromDate()}`;
    }
    return this.status() === BadgeStatus.Disponible ? 'Actuellement disponible' : 'Pas disponible';
  }
}
