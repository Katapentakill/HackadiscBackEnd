class Evaluation {
  constructor(user_id, adaptability_to_change, safe_conduct, dynamism_energy, personal_effectiveness, initiative, working_under_pressure, date) {
    this.user_id = user_id;
    this.adaptability_to_change = adaptability_to_change;
    this.safe_conduct = safe_conduct;
    this.dynamism_energy = dynamism_energy;
    this.personal_effectiveness = personal_effectiveness;
    this.initiative = initiative;
    this.working_under_pressure = working_under_pressure;
    this.date = date;
  }
  static createTable(db) {
    db.run(`CREATE TABLE IF NOT EXISTS Evaluations (
            user_id INTEGER NOT NULL,
            adaptability_to_change INTEGER NOT NULL,
            safe_conduct INTEGER NOT NULL,
            dynamism_energy INTEGER NOT NULL,
            personal_effectiveness INTEGER NOT NULL,
            initiative INTEGER NOT NULL,
            working_under_pressure INTEGER NOT NULL,
            date INTEGER NOT  NULL,
            FOREIGN KEY (user_id) REFERENCES Workers(user_id)
    );`);
  }

  static insert(db, evaluation) {
    db.run(`INSERT INTO Evaluations (user_id, adaptability_to_change, safe_conduct, dynamism_energy, personal_effectiveness, initiative, working_under_pressure, date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [evaluation.user_id, evaluation.adaptability_to_change, evaluation.safe_conduct, evaluation.dynamism_energy, evaluation.personal_effectiveness, evaluation.initiative, evaluation.working_under_pressure, evaluation.date],
            (err) => {
              if (err) {
                console.error('Error al insertar evaluación:', err);
              } else {
                console.log('Evaluación insertada correctamente.');
              }
            });
  }

  // Métodos estáticos para obtener, actualizar, eliminar, etc.

  static getAll(db, callback) {
    db.all(`SELECT * FROM Evaluations`, (err, rows) => {
      if (err) {
        console.error('Error al obtener todas las evaluaciones:', err);
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }

  static findById(db, user_id, callback) {
    db.get(`SELECT * FROM Evaluations WHERE user_id = ?`, [user_id], (err, row) => {
      if (err) {
        console.error('Error al obtener evaluacion por user_id:', err);
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  }

}

module.exports = Evaluation;