const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./.database.sqlite'); // Asegúrate de tener la ruta correcta a tu base de datos

// Verificación de conexión a la base de datos
db.serialize(() => {
  console.log('Conexión a la base de datos SQLite establecida.');
});

const app = express();
const port = process.env.PORT || 3000;

const workerRoutes = require('./routes/workerRoutes')(db); // Pasar db a las rutas

// Configuración CORS
app.use(cors());
app.use(express.json());

app.use('/workers', workerRoutes);

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});