const sqlite3 = require('sqlite3').verbose();

class Role {
    constructor(rol_name, role_id) {
        this.rol_name = rol_name;
        this.role_id = role_id;
    }

    static createTable(db) {
        db.run(`CREATE TABLE IF NOT EXISTS Roles (
            role_id INTEGER PRIMARY KEY,
            rol_name TEXT NOT NULL
        );`);
    }

    static insert(db, role) {
        db.run(`INSERT INTO Roles (role_id, rol_name) VALUES (?, ?)`,
            [role.role_id, role.rol_name],
            (err) => {
                if (err) {
                    console.error('Error al insertar rol:', err);
                } else {
                    console.log('Rol insertado correctamente.');
                }
            });
    }
}

module.exports = Role;