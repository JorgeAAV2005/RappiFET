import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

interface ProductoCarrito {
  producto_nombre: string;
  cantidad: number;
  valor_producto: number;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage {
  items: ProductoCarrito[] = [];
  producto_nombre: string = '';
  cantidad: number = 1;
  valor_producto: number = 0;

  constructor(
    private http: HttpClient, // Importamos HttpClient
    private toastController: ToastController // Para mostrar notificaciones
  ) {}

  // Función para agregar un producto al carrito
  agregarProducto() {
    if (this.producto_nombre && this.cantidad && this.valor_producto) {
      const nuevoProducto: ProductoCarrito = {
        producto_nombre: this.producto_nombre,
        cantidad: this.cantidad,
        valor_producto: this.valor_producto
      };

      // Agregar el producto al arreglo
      this.items.push(nuevoProducto);

      // Enviar el producto al servidor
      this.enviarProducto(nuevoProducto);

      // Limpiar los campos del formulario
      this.producto_nombre = '';
      this.cantidad = 1;
      this.valor_producto = 0;
    } else {
      this.mostrarToast('Por favor, complete todos los campos', 'danger');
    }
  }

  // Función para enviar el producto al servidor
  enviarProducto(producto: ProductoCarrito) {
    this.http.post('http://localhost:3000/api/carrito', producto)
      .subscribe(
        async response => {
          console.log('Producto registrado en el carrito:', response);
          this.mostrarToast('Producto agregado al carrito', 'success');
        },
        async error => {
          console.error('Error al registrar el producto:', error);
          this.mostrarToast('Error al agregar el producto al carrito. Intente nuevamente.', 'danger');
        }
      );
  }

  // Función para mostrar mensajes (toasts)
  async mostrarToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }
}
