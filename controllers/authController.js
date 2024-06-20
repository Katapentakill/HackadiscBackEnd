const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const jwt = require('jsonwebtoken')

const User = require('../models/userModel')
const Role = require('../models/rolesModel')


const login = async (req = request, res = response) => {
    
  try {

    console.log("---------REQ:", req.body);

    const { email, password } = req.body;
    const db = req.app.get('db'); // Obtén la instancia de la base de datos SQLite desde Express



} catch (error) {
    console.error('Error en el controlador login:', error);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
    });
}

};

const validateToken = async (req = request, res = response) => {
  
}

module.exports = {
  login,
  validateToken
}
