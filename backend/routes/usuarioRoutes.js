const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController.js');

router.post('/usuarios', usuarioController.crearUsuario);
router.post('/login', usuarioController.iniciarSesion);
router.get('/usuarios/:id', usuarioController.obtenerUsuarioPorId);
router.post('/verificar-token', usuarioController.verificarToken);
router.get('/usuarios/token/:id', usuarioController.obtenerUsuarioPorToken);
module.exports = router;