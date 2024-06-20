const Company = require('../models/companiesModel');

const getAllCompanies = (db, req, res) => {
    Company.getAll(db, (err, companies) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ companies });
    }
  });
};

const getCompaniesById = (db, req, res) => {
  const company_id = req.params.id;
  Company.findById(db, company_id, (err, company) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ company });
    }
  });
};

module.exports = {
    getAllCompanies,
    getCompaniesById
};