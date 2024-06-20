const express = require('express');
const router = express.Router();
const workerController = require('../controllers/workerController');

module.exports = function(db) {
  router.get('/', workerController.getAllWorkers.bind(null, db)); // Pasar db a los controladores
  router.get('/:id', workerController.getWorkerById.bind(null, db)); // Pasar db a los controladores

  return router;
};