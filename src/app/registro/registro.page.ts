import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

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
    private toastController: ToastController
  ) {}

  async register() {
    if (this.nombre && this.usuario && this.email && this.contrasena) {
      // Aquí puedes agregar la lógica para enviar los datos a tu backend o base de datos
      console.log('Nombre:', this.nombre);
      console.log('Usuario:', this.usuario);
      console.log('Email:', this.email);
      console.log('Contraseña:', this.contrasena);

      // Mostrar un mensaje de éxito
      const toast = await this.toastController.create({
        message: 'Registro exitoso',
        duration: 2000,
        color: 'success'
      });
      toast.present();

      // Navegar a otra página o reiniciar el formulario
      this.navCtrl.navigateRoot('/inicio');
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
