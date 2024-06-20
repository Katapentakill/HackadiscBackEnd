const sqlite3 = require('sqlite3').verbose();

class User {
    constructor(email, password, role_id, nombre, company_id, area_id) {
        this.email = email;
        this.password = password;
        this.role_id = role_id;
        this.nombre = nombre;
        this.company_id = company_id;
        this.area_id = area_id;
    }

    static createTable(db) {
        db.run(`CREATE TABLE IF NOT EXISTS Users (
            email TEXT PRIMARY KEY,
            password TEXT NOT NULL,
            role_id INTEGER NOT NULL,
            nombre TEXT NOT NULL,
            company_id INTEGER,
            area_id INTEGER,
            FOREIGN KEY (role_id) REFERENCES Roles(role_id)
        );`);
    }

    static insert(db, user) {
        db.run(`INSERT INTO Users (email, password, role_id, nombre, company_id, area_id)
                VALUES (?, ?, ?, ?, ?, ?)`,
                [user.email, user.password, user.role_id, user.nombre, user.company_id, user.area_id],
                (err) => {
                    if (err) {
                        console.error('Error al insertar usuario:', err);
                    } else {
                        console.log('Usuario insertado correctamente.');
                    }
                });
    }

    static findByEmail(db, email, password, callback) {
        const query = `SELECT * FROM Users WHERE email = ? AND password = ?`;
        db.get(query, [email, password], (err, row) => {
            if (err) {
                console.error('Error al obtener usuario por email:', err);
                callback(err, null);
            } else {
                callback(null, row);
            }
        });
    }

}

module.exports = User;