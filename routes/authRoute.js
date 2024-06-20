const { Router } = require("express");
const { login, validateToken } = require("../controllers/authController");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { verifyEmailLogin } = require("../helpers/verify-email");

const router = Router();

const authRoutes = (db) => {
    router.post('/login', [
        check('email', 'the field email is required').not().isEmpty(),
        check('email', 'this not valid email').isEmail(),
        check('email', 'the field email is required').custom(verifyEmailLogin.bind(null, db)),
        check('password', 'the field password is required').not().isEmpty(),
        validateFields
    ], login);

    router.get('/validate-token', validateToken);

    return router;
};

module.exports = authRoutes;