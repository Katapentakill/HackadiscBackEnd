const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');

module.exports = function(db) {
  router.get('/', evaluationController.getAllEvaluations.bind(null, db)); // Pasar db a los controladores
  router.get('/:id', evaluationController.getEvaluationsById.bind(null, db)); // Pasar db a los controladores

  return router;
};