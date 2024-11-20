import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  usuario: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';  // Aquí declaramos la propiedad
  rol: string = ''; 

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private http: HttpClient
  ) {}

  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }

  async register() {
    // Validación de la contraseña mínima de 8 caracteres
    if (this.contrasena.length < 8) {
      const toast = await this.toastController.create({
        message: 'La contraseña debe tener al menos 8 caracteres.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      return;
    }

    // Validación de contraseñas coincidentes
    if (this.contrasena !== this.confirmarContrasena) {
      const toast = await this.toastController.create({
        message: 'Las contraseñas no coinciden.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      return;
    }

    // Crear el objeto de datos para enviar al servidor
    const data = {
      usuario: this.usuario,
      contrasena: this.contrasena,
      rol: this.rol
    };

    // Enviar datos al servidor
    this.http.post('http://localhost:3000/register', data)
      .subscribe(
        async response => {
          console.log('Usuario registrado:', response);

          // Mostrar mensaje de éxito
          const toast = await this.toastController.create({
            message: 'Registro exitoso',
            duration: 2000,
            color: 'success'
          });
          toast.present();

          // Redirigir a la página de login
          this.navCtrl.navigateForward('/login');
        },
        async error => {
          console.error('Error al registrar:', error);

          // Mostrar mensaje de error
          const toast = await this.toastController.create({
            message: 'Error al registrar. Intente nuevamente.',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
      );
  }
}
