const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Registro_Ingreso',
  password: '03273025',
  port: 5432,
});

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  const { usuario, contrasena, rol } = req.body;

  // Validar que la contraseña tenga al menos 8 caracteres
  if (contrasena.length < 8) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
  }

  try {
    // Encriptar la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Insertar el usuario en la base de datos
    const result = await pool.query(
      'INSERT INTO usuarios (usuario, contrasena, rol) VALUES ($1, $2, $3) RETURNING *',
      [usuario, hashedPassword, rol]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// Endpoint para iniciar sesión
app.post('/login', async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE usuario = $1',
      [usuario]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Comparar la contraseña ingresada con la contraseña encriptada
      const match = await bcrypt.compare(contrasena, user.contrasena);

      if (match) {
        res.json({ success: true, role: user.rol });
      } else {
        res.json({ success: false, message: 'Contraseña incorrecta' });
      }
    } else {
      res.json({ success: false, message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
