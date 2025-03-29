const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController.js');

router.post('/usuario', usuarioController.crearUsuario);
router.post('/login', usuarioController.iniciarSesion);
module.exports = router;