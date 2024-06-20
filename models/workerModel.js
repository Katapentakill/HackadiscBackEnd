const sqlite3 = require('sqlite3').verbose();

class Worker {
    constructor(user_id, area_id, area_name, post_id, post_name, user_name, EstadoEstado_id, Multicompaniescompany_id, Multicompaniescompany_name) {
        this.user_id = user_id;
        this.area_id = area_id;
        this.area_name = area_name;
        this.post_id = post_id;
        this.post_name = post_name;
        this.user_name = user_name;
        this.EstadoEstado_id = EstadoEstado_id;
        this.Multicompaniescompany_id = Multicompaniescompany_id;
        this.Multicompaniescompany_name = Multicompaniescompany_name;
    }

    static createTable(db) {
        db.run(`CREATE TABLE IF NOT EXISTS Workers (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            area_id INTEGER NOT NULL,
            area_name TEXT NOT NULL,
            post_id INTEGER NOT NULL,
            post_name TEXT NOT NULL,
            user_name TEXT NOT NULL,
            EstadoEstado_id INTEGER,
            Multicompaniescompany_id INTEGER NOT NULL,
            Multicompaniescompany_name TEXT NOT NULL,
            FOREIGN KEY (EstadoEstado_id) REFERENCES Estado (Estado_id),
            FOREIGN KEY (Multicompaniescompany_id, Multicompaniescompany_name) REFERENCES Multicompanies (main_company_id, main_company_name)
        );`);
    }

    static insert(db, worker) {
        db.run(`INSERT INTO Workers (area_id, area_name, post_id, post_name, user_name, EstadoEstado_id, Multicompaniescompany_id, Multicompaniescompany_name)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [worker.area_id, worker.area_name, worker.post_id, worker.post_name, worker.user_name, worker.EstadoEstado_id, worker.Multicompaniescompany_id, worker.Multicompaniescompany_name],
                (err) => {
                    if (err) {
                        console.error('Error al insertar trabajador:', err);
                    } else {
                        console.log('Trabajador insertado correctamente.');
                    }
                });
    }

    // Métodos estáticos para obtener, actualizar, eliminar, etc.
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