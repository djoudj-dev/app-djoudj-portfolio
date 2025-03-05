import { Component } from '@angular/core';
import { NavbarSmartComponent } from './core/components/navbar/navbar.smart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [NavbarSmartComponent]
})
export class AppComponent {
  title = 'Julien N.';
}
