class Multicompany {
  constructor(main_company_id, sub_company_id, main_company_name, sub_company_name) {
    this.main_company_id = main_company_id;
    this.sub_company_id = sub_company_id;
    this.main_company_name = main_company_name;
    this.sub_company_name = sub_company_name;
  }

  static createTable(db) {
      db.run(`CREATE TABLE IF NOT EXISTS Multicompanies (
          main_company_id INTEGER NOT NULL,
          sub_company_id INTEGER NOT NULL,
          main_company_name TEXT NOT NULL,
          sub_company_name TEXT NOT NULL,
          PRIMARY KEY (main_company_id, sub_company_id)
      );`);
  }

  static insert(db, multicompany) {
    db.run(`INSERT INTO Multicompanies (main_company_id, sub_company_id, main_company_name, sub_company_name)
            VALUES (?, ?, ?, ?)`,
            [multicompany.main_company_id, multicompany.sub_company_id, multicompany.main_company_name, multicompany.sub_company_name],
            (err) => {
              if (err) {
                console.error('Error al insertar empresa multinacional:', err);
              } else {
                console.log('Empresa multinacional insertada correctamente.');
              }
            });
  }

  // Métodos estáticos para obtener, actualizar, eliminar, etc.
  
  static getAll(db, callback) {
    db.all(`SELECT * FROM Multicompanies`, (err, rows) => {
      if (err) {
        console.error('Error al obtener todas las companias:', err);
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }

  static findById(db, user_id, callback) {
    db.get(`SELECT * FROM Multicompanies WHERE main_company_id = ?`, [user_id], (err, row) => {
      if (err) {
        console.error('Error al obtener compania por main_company_id:', err);
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  }

}

module.exports = Multicompany;