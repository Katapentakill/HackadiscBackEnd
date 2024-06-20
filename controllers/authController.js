const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const jwt = require('jsonwebtoken')

const User = require('../models/userModel')
const Role = require('../models/rolesModel')

const { verifyEmailLogin } = require("../helpers/verify-email");

const login = async (db, req, res) => {
    
  try {

    const email = req.body.email;
    const password = req.body.password;
    User.findByEmail(db, email, password, (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message });
      }

      if (!user) {
        return res.status(400).json({
            success: false,
            errors: [
                {
                    type: 'field',
                    value: email,
                    msg: 'Credenciales inválidas.',
                    path: 'email',
                    location: 'body'
                }
            ]
        });
    }

    if (user.password !== password) {
      return res.status(400).json({
          success: false,
          errors: [
              {
                  type: 'field',
                  value: password,
                  msg: 'Credenciales inválidas.',
                  path: 'password',
                  location: 'body'
              }
          ]
      });
  }

  const userData = {
    id: user.id,
    email: user.email,
    role_id: user.role_id,
    nombre: user.nombre,
    company_id: user.company_id,
    area_id: user.area_id
    // Añade otros campos que necesites
};

// Devuelve la respuesta con los datos del usuario
    res.status(200).json({
      success: true,
      data: userData
    });

      });

    }catch (error) {
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
