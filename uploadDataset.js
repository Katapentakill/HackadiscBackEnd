const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const csvParser = require('csv-parser');

// Importar modelos
const Worker = require('./models/workerModel');
const Multicompany = require('./models/companiesModel');
const Evaluation = require('./models/evaluateModel');

// Ruta a los archivos CSV
const workersCsvPath = path.join(__dirname, 'DataSet/workers.csv');
const multicompaniesCsvPath = path.join(__dirname, 'DataSet/multicompanies.csv');
const evaluationsCsvPath = path.join(__dirname, 'DataSet/evaluations.csv');

// Conexión a la base de datos SQLite
const db = new sqlite3.Database('.database.sqlite');

// Función para crear todas las tablas si no existen
function createTables() {
  Multicompany.createTable(db);
  Worker.createTable(db);
  Evaluation.createTable(db);
}

// Función para cargar datos de workers.csv
function loadWorkersData() {
  fs.createReadStream(workersCsvPath)
    .pipe(csvParser())
    .on('data', (row) => {
      const worker = new Worker(
        row.user_id,
        row.company_id,
        row.area_id,
        row.area_name,
        row.post_id,
        row.post_name,
        row.user_name,
        row.company_name
      );
      Worker.insert(db, worker);
    })
    .on('end', () => {
      console.log('Datos de workers.csv cargados en la base de datos.');
    });
}

// Función para cargar datos de multicompanies.csv
function loadMulticompaniesData() {
  fs.createReadStream(multicompaniesCsvPath)
    .pipe(csvParser())
    .on('data', (row) => {
      const multicompany = new Multicompany(
        row.main_company_id,
        row.sub_company_id,
        row.main_company_name,
        row.sub_company_name
      );
      Multicompany.insert(db, multicompany);
    })
    .on('end', () => {
      console.log('Datos de multicompanies.csv cargados en la base de datos.');
    });
}

// Función para cargar datos de evaluations.csv
function loadEvaluationsData() {
  fs.createReadStream(evaluationsCsvPath)
    .pipe(csvParser())
    .on('data', (row) => {
      const evaluation = new Evaluation(
        row.adaptability_to_change,
        row.safe_conduct,
        row.dynamism_energy,
        row.personal_effectiveness,
        row.initiative,
        row.working_under_pressure,
        row.date,
        row.user_id
      );
      Evaluation.insert(db, evaluation);
    })
    .on('end', () => {
      console.log('Datos de evaluations.csv cargados en la base de datos.');
      db.close(); // Cerrar conexión a la base de datos al finalizar la carga de datos
    });
}

// Función principal para cargar todos los datos
function uploadData() {
  createTables(); // Crear tablas si no existen
  loadMulticompaniesData();
  loadWorkersData();
  loadEvaluationsData();
}

// Ejecutar la función principal para iniciar la carga de datos
uploadData();