import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarSmartComponent } from './core/components/navbar/navbar.smart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [NavbarSmartComponent, RouterOutlet]
})
export class AppComponent {
  title = 'Julien N.';
}
