import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: 'productos.page.html',
  styleUrls: ['productos.page.scss'],
})
export class ProductosPage implements OnInit {
  productosDestacados = [
    {
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg27wE_geRKUmcseNicQmgWnYXUi06QlObWw&s',
      nombre: 'Producto 1',
      descripcion: 'Descripción del Producto 1',
    },
    {
      imagen: 'https://peterpan24horas.com/wp-content/uploads/2019/07/DSC_0682.jpg',
      nombre: 'Producto 2',
      descripcion: 'Descripción del Producto 2',
    },
    // Agrega más productos según sea necesario
  ];

  constructor() {}

  ngOnInit() {}

  scrollToFeatured() {
    const featuredSection = document.getElementById('featured-products');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}