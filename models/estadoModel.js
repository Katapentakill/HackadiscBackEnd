const sqlite3 = require('sqlite3').verbose();

class Estado {
    constructor(Estado_id, NombreEstado) {
        this.Estado_id = Estado_id;
        this.NombreEstado = NombreEstado;
    }

    static createTable(db) {
        db.run(`CREATE TABLE IF NOT EXISTS Estado (
            Estado_id INTEGER PRIMARY KEY AUTOINCREMENT,
            NombreEstado TEXT NOT NULL
        );`);
    }

    static insert(db, estado) {
        db.run(`INSERT INTO Estado (NombreEstado)
                VALUES (?)`,
                [estado.NombreEstado],
                (err) => {
                    if (err) {
                        console.error('Error al insertar estado:', err);
                    } else {
                        console.log('Estado insertado correctamente.');
                    }
                });
    }

    // Métodos estáticos para obtener, actualizar, eliminar, etc.
    static getAll(db, callback) {
        db.all(`SELECT * FROM Estado`, (err, rows) => {
            if (err) {
                console.error('Error al obtener todos los estados:', err);
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    }

    static findById(db, Estado_id, callback) {
        db.get(`SELECT * FROM Estado WHERE Estado_id = ?`, [Estado_id], (err, row) => {
            if (err) {
                console.error('Error al obtener estado por Estado_id:', err);
                callback(err, null);
            } else {
                callback(null, row);
            }
        });
    }
}

module.exports = Estado;