const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// Configuración de Express
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Para procesar los datos JSON

// Configura la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Registro_Ingreso', // Base de datos
  password: '03273025',
  port: 5432,
});

// Ruta para registrar usuario
app.post('/register', async (req, res) => {
  const { nombre, usuario, email, contrasena } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, usuario, email, contrasena) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, usuario, email, contrasena]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// Ruta para autenticar usuario (login)
app.post('/login', async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    // Imprimir los datos recibidos para depuración
    console.log('Datos recibidos para autenticación:', { usuario, contrasena });

    const result = await pool.query(
      'SELECT * FROM usuarios WHERE usuario = $1 AND contrasena = $2',
      [usuario, contrasena]
    );

    if (result.rows.length > 0) {
      // Usuario encontrado, autenticación exitosa
      res.json({ success: true, message: 'Autenticación exitosa' });
    } else {
      // Usuario no encontrado o contraseña incorrecta
      res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

// Ruta para agregar un producto al carrito
app.post('/api/carrito', async (req, res) => {
  const { producto_nombre, cantidad, valor_producto } = req.body;

  if (!producto_nombre || !cantidad || !valor_producto) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO registros_carrito (producto_nombre, cantidad, valor_producto) VALUES ($1, $2, $3) RETURNING *',
      [producto_nombre, cantidad, valor_producto]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
