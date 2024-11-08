import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  // Navegar a la página de login
  goToLogin() {
    this.router.navigate(['/login']); // Asegúrate de que la ruta de 'login' sea correcta en tu enrutador
  }

  // Navegar a la página de registro
  goToRegister() {
    this.router.navigate(['/registro']); // Asegúrate de que la ruta de 'registro' sea correcta en tu enrutador
  }
}
