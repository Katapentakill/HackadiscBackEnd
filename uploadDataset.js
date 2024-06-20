const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const csvParser = require('csv-parser');

// Importar modelos
const Worker = require('./models/workerModel');
const Multicompany = require('./models/companiesModel');
const Evaluation = require('./models/evaluateModel');
const Role = require('./models/rolesModel');
const User = require('./models/userModel');
const Estado = require('./models/estadoModel');

// Rutas a los archivos CSV (si aplicable)
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
  Role.createTable(db);
  User.createTable(db);
  Estado.createTable(db);
}

// Función para cargar datos de roles manualmente
function loadRolesData() {
  const roles = [
    { rol_name: 'Administrador', role_id: 1 },
    { rol_name: 'Jefe compañia', role_id: 2 },
    { rol_name: 'Jefe de area', role_id: 3 }
  ];

  roles.forEach((role) => {
    const newRole = new Role(role.rol_name, role.role_id);
    Role.insert(db, newRole);
  });

  console.log('Datos de roles insertados en la base de datos.');
}

// Función para cargar datos de usuarios manualmente
function loadUsersData() {
  const users = [
    { email: 'pignus@gfmail.com', password: '7863', role_id: 1, nombre: 'AdminPignus', company_id: null, area_id: null },
    { email: 'jefeTotal@gmail.com', password: '7863', role_id: 2, nombre: 'JefeT', company_id: 24, area_id: null },
    { email: 'JefeArea@gmail.com', password: '7863', role_id: 3, nombre: 'JefeA', company_id: 24, area_id: 83 },
    { email: 'jefeTotal2@gmail.com', password: '7863', role_id: 2, nombre: 'JefeT2', company_id: 56, area_id: null },
    { email: 'JefeArea2@gmail.com', password: '7863', role_id: 3, nombre: 'JefeA2', company_id: 56, area_id: 910 },
    { email: 'jefeTotal3@gmail.com', password: '7863', role_id: 2, nombre: 'JefeT3', company_id: 49, area_id: null },
    { email: 'JefeArea3@gmail.com', password: '7863', role_id: 3, nombre: 'JefeA3', company_id: 49, area_id: 742 }
  ];

  users.forEach((user) => {
    const newUser = new User(user.email, user.password, user.role_id, user.nombre, user.company_id, user.area_id);
    User.insert(db, newUser);
  });

  console.log('Datos de usuarios insertados en la base de datos.');
}

// Función para cargar datos de workers desde CSV (ejemplo con CSV)
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

// Función para cargar datos de multicompanies desde CSV (ejemplo con CSV)
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

// Función para cargar datos de evaluations desde CSV
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
  loadMulticompaniesData(); // Puedes comentar o eliminar si no tienes datos en multicompanies.csv
  loadWorkersData(); // Puedes comentar o eliminar si no tienes datos en workers.csv
  loadEvaluationsData(); // Puedes comentar o eliminar si no tienes datos en evaluations.csv
  loadRolesData();
  loadUsersData();
}

// Ejecutar la función principal para iniciar la carga de datos
uploadData();