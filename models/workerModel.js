const sqlite3 = require('sqlite3').verbose();

class Worker {
  constructor(user_id, company_id, area_id, area_name, post_id, post_name, user_name, company_name) {
    this.user_id = user_id;
    this.company_id = company_id;
    this.area_id = area_id;
    this.area_name = area_name;
    this.post_id = post_id;
    this.post_name = post_name;
    this.user_name = user_name;
    this.company_name = company_name;
  }

  static createTable(db) {
    db.run(`CREATE TABLE IF NOT EXISTS Workers (
            user_id INTEGER PRIMARY KEY,
            company_id INTEGER NOT NULL,
            area_id INTEGER NOT NULL,
            area_name TEXT NOT NULL,
            post_id INTEGER NOT NULL,
            post_name TEXT NOT NULL,
            user_name TEXT NOT NULL,
            company_name TEXT NOT NULL,
            FOREIGN KEY (company_id, company_name) REFERENCES Multicompanies(main_company_id, main_company_name)
    );`);
  }

  static insert(db, worker) {
    db.run(`INSERT INTO Workers (user_id, company_id, area_id, area_name, post_id, post_name, user_name, company_name)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [worker.user_id, worker.company_id, worker.area_id, worker.area_name, worker.post_id, worker.post_name, worker.user_name, worker.company_name],
            (err) => {
              if (err) {
                console.error('Error al insertar trabajador:', err);
              } else {
                console.log('Trabajador insertado correctamente.');
              }
            });
  }

  static getAll(db, callback) {
    db.all(`SELECT * FROM Workers`, (err, rows) => {
      if (err) {
        console.error('Error al obtener todos los trabajadores:', err);
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }

  static findById(db, user_id, callback) {
    db.get(`SELECT * FROM Workers WHERE user_id = ?`, [user_id], (err, row) => {
      if (err) {
        console.error('Error al obtener trabajador por user_id:', err);
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  }
}

module.exports = Worker;