import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed, input, signal } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

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
export class ButtonDumbComponent {
  // Inputs using the new signal-based API
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  disabled = input<boolean>(false);
  fullWidth = input<boolean>(false);
  ariaLabel = input<string | null>(null);
  type = input<'button' | 'submit' | 'reset'>('button');

  // Loading state
  isLoading = signal<boolean>(false);

  // Click event output
  @Output() buttonClick = new EventEmitter<MouseEvent>();

  // Computed classes based on component state
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

  stateClasses = computed(() => (this.fullWidth() ? 'w-full' : ''));

  // Handle click with loading state
  onClick(event: MouseEvent): void {
    if (this.disabled() || this.isLoading()) {
      event.preventDefault();
      return;
    }

    this.buttonClick.emit(event);
  }

  // Method to set loading state
  setLoading(loading: boolean): void {
    this.isLoading.set(loading);
  }
}
