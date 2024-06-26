class Evaluation {
    constructor(adaptability_to_change, safe_conduct, dynamism_energy, personal_effectiveness, initiative, working_under_pressure, date, user_id) {
      this.adaptability_to_change = adaptability_to_change;
      this.safe_conduct = safe_conduct;
      this.dynamism_energy = dynamism_energy;
      this.personal_effectiveness = personal_effectiveness;
      this.initiative = initiative;
      this.working_under_pressure = working_under_pressure;
      this.date = date;
      this.user_id = user_id;
    }
  
    static createTable(db) {
      db.run(`CREATE TABLE IF NOT EXISTS Evaluations (
              adaptability_to_change INTEGER NOT NULL,
              safe_conduct INTEGER NOT NULL,
              dynamism_energy INTEGER NOT NULL,
              personal_effectiveness INTEGER NOT NULL,
              initiative INTEGER NOT NULL,
              working_under_pressure INTEGER NOT NULL,
              date INTEGER NOT NULL,
              user_id INTEGER NOT NULL,
              FOREIGN KEY (user_id) REFERENCES Workers(user_id)
      );`);
    }
  
    static insert(db, evaluation) {
      db.run(`INSERT INTO Evaluations (adaptability_to_change, safe_conduct, dynamism_energy, personal_effectiveness, initiative, working_under_pressure, date, user_id)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
              [evaluation.adaptability_to_change, evaluation.safe_conduct, evaluation.dynamism_energy, evaluation.personal_effectiveness, evaluation.initiative, evaluation.working_under_pressure, evaluation.date, evaluation.user_id],
              (err) => {
                if (err) {
                  console.error('Error al insertar evaluación:', err);
                } else {
                  console.log('Evaluación insertada correctamente.');
                }
              });
    }
  
    // Métodos estáticos para obtener, actualizar, eliminar, etc.
  }
  
  module.exports = Evaluation;