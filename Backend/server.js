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
  database: 'Tecno_tienda', // nombre de la base de datos que se usara 
  port: 5432
})


// Probar conexión
pool.connect()
  .then(() => console.log('✅ Conectado a PostgreSQL'))
  .catch(err => console.error('❌ Error de conexión:', err));

// --- ENDPOINTS ---
// Obtener todos los usuarios
app.get('/api/cliente', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cliente ORDER BY rut DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al consultar la base de datos');
  }
});

// Obtener todos los productos
app.get('/api/producto', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM producto ORDER BY codigo_p DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al consultar la base de datos');
  }
});

// Obtener cantidad de compras de cada producto
app.get('/api/venta', async (req, res) => {
  try {
    const result = await pool.query('SELECT sum(cantidad), codigo_p FROM venta GROUP BY codigo_p ORDER BY sum(cantidad) DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al consultar la base de datos');
  }
});



// Realizar una compra
app.post('/api/venta', async (req, res) => {
  const { cantidad, fecha_compra, rut, codigo_p } = req.body;
  if (!cantidad || !fecha_compra || !rut || !codigo_p) {
    return res.status(400).send('Faltan datos');
  }
  
  try {
    await pool.query('INSERT INTO venta (cantidad, fecha_compra, rut, codigo_p ) VALUES ($1, CURRENT_DATE, $2, $3)', [cantidad, rut, codigo_p]);
    res.send('compra realizada');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al insertar datos');
  }
});


// Obtener facturas
app.get('/Api/vista', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vista_compras');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener los datos.");
  }
});

// Servir el frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(port, () => console.log(`🚀 Servidor en http://localhost:${port}`));
