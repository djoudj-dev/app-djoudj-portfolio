import { Component } from '@angular/core';
import { BadgeDumbComponent } from '../../../shared/components/badge/badge.dumb.component';

@Component({
  selector: 'app-about-page',
  imports: [BadgeDumbComponent],
  templateUrl: './about.page.component.html',
  styleUrl: './about.page.component.css'
})
export class AboutPageComponent {}
