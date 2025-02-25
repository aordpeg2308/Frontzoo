import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';  // Asegúrate de que la ruta sea correcta
import { User } from '../../../auth/interfaces/user.inteface';   // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``,
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './lista' },
    { label: 'Añadir', icon: 'add', url: './nuevo-animal' },
    { label: 'Buscar', icon: 'search', url: './buscar' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  get user(): User | undefined {
    return this.authService.currentUser;
  }

}
