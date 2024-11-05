import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  nombre: string = '';
  usuario: string = '';
  email: string = '';
  contrasena: string = '';

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private http: HttpClient // Añadimos HttpClient
  ) {}
  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }
  async register() {
    if (this.nombre && this.usuario && this.email && this.contrasena) {
      const data = {
        nombre: this.nombre,
        usuario: this.usuario,
        email: this.email,
        contrasena: this.contrasena,
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

            // Navegar a otra página o reiniciar el formulario
            this.navCtrl.navigateRoot('/inicio');
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
    } else {
      // Mostrar un mensaje de error si falta algún campo
      const toast = await this.toastController.create({
        message: 'Por favor, complete todos los campos',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }
}
