const Worker = require('../models/workerModel');

const getAllWorkers = (db, req, res) => {
  Worker.getAll(db, (err, workers) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ workers });
    }
  });
};

const getWorkerById = (db, req, res) => {
  const user_id = req.params.id;
  Worker.findById(db, user_id, (err, worker) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ worker });
    }
  });
};

module.exports = {
  getAllWorkers,
  getWorkerById
};