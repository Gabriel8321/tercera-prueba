// backend/server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Para leer JSON del body
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Conexión a PostgreSQL
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',      // cambia si usas otro usuario
  password: 'cft.2025',  // tu contraseña
  database: 'indicadores',
  port: 5432
})


// Probar conexión
pool.connect()
  .then(() => console.log('✅ Conectado a PostgreSQL'))
  .catch(err => console.error('❌ Error de conexión:', err));

// --- ENDPOINTS ---

// Obtener todas las monedas
app.get('/api/monedas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM producto ORDER BY codigo_p DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al consultar la base de datos');
  }
});

// Agregar una moneda
app.post('/api/monedas', async (req, res) => {
  const { nombre, valor } = req.body;
  if (!nombre || !valor) {
    return res.status(400).send('Faltan datos');
  }

  try {
    await pool.query('INSERT INTO monedas (nombre, valor) VALUES ($1, $2)', [nombre, valor]);
    res.send('Moneda agregada correctamente');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al insertar datos');
  }
});

// Servir el frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(port, () => console.log(`🚀 Servidor en http://localhost:${port}`));
