import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  nombre: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {}

  async ingresar() {
    // Validar que los campos no estén vacíos
    if (!this.nombre || !this.password) {
      const toast = await this.toastController.create({
        message: 'Por favor completa todos los campos.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
      return;
    }

    const loginData = {
      usuario: this.nombre,
      contrasena: this.password,
    };

    this.http.post('http://localhost:3000/login', loginData).subscribe(
      async (response: any) => {
        if (response.success) {
          const toast = await this.toastController.create({
            message: 'Inicio de sesión exitoso.',
            duration: 2000,
            color: 'success',
          });
          await toast.present();

          // Redirigir según el rol del usuario
          if (response.role === 'admin') {
            this.router.navigate(['/administrador']);
          } else if (response.role === 'usuario') {
            this.router.navigate(['/productos']);
          } else {
            const toast = await this.toastController.create({
              message: 'Rol desconocido. Contacte al administrador.',
              duration: 2000,
              color: 'warning',
            });
            await toast.present();
          }
        } else {
          const toast = await this.toastController.create({
            message: response.message || 'Usuario o contraseña incorrectos.',
            duration: 2000,
            color: 'danger',
          });
          await toast.present();
        }
      },
      async (error) => {
        console.error('Error en el login:', error);
        const toast = await this.toastController.create({
          message: 'Error al conectar con el servidor.',
          duration: 2000,
          color: 'danger',
        });
        await toast.present();
      }
    );
  }
}
