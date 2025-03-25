import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

export enum BadgeStatus {
  Disponible = 'disponible',
  Indisponible = 'indisponible',
  DisponibleAPartirDe = 'disponible a partir de'
}

@Component({
  selector: 'app-badge',
  imports: [NgClass],
  template: `<div
    class="badge inline-flex items-center gap-2 px-3 py-1 font-semibold rounded-full text-text border-1 border-primary bg-opacity-10"
    [ngClass]="{
      'bg-accent': status() === 'disponible' || 'indisponible' || 'disponible a partir du'
    }"
  >
    <span
      class="w-2.5 h-2.5 rounded-full animate-pulse"
      [ngClass]="{
        'bg-green-500': status() === 'disponible',
        'bg-red-900': status() === 'indisponible',
        'bg-blue-400': status() === 'disponible a partir du'
      }"
    ></span>
    {{ statusText }}
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeDumbComponent {
  status = signal<'disponible' | 'indisponible' | 'disponible a partir du'>('disponible');
  availableFromDate = signal<string>('21 Avril 2025');
  isAvailable = signal<boolean>(true);
  isUnavailable = signal<boolean>(false);
  isAvailableFrom = signal<boolean>(false);

  get statusText(): string {
    if (this.status() === 'disponible a partir du' && this.availableFromDate()) {
      return `Disponible à partir du ${this.availableFromDate()}`;
    }
    return this.status() === 'disponible' ? 'Actuellement disponible' : 'Pas disponible';
  }
}
