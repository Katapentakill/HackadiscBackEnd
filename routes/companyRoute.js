const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

module.exports = function(db) {
  router.get('/', companyController.getAllCompanies.bind(null, db)); // Pasar db a los controladores
  router.get('/:id', companyController.getCompaniesById.bind(null, db)); // Pasar db a los controladores

  return router;
};