const Evaluation = require('../models/evaluateModel');

const getAllEvaluations = (db, req, res) => {
    Evaluation.getAll(db, (err, evaluations) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ evaluations });
    }
  });
};

const getEvaluationsById = (db, req, res) => {
    const user_id = req.params.id;
    Evaluation.findById(db, user_id, (err, evaluation) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ evaluation });
        }
    });
};

module.exports = {
    getAllEvaluations,
    getEvaluationsById
};