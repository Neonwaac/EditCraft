const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//USUARIO NORMAL
router.post('/usuarios', usuarioController.crearUsuario);
router.put('/usuarios/:id/username', usuarioController.updateUsername);
router.put('/usuarios/:id/photo', upload.single('foto'), usuarioController.updateFotoUsuario);
router.post('/usuarios/login', usuarioController.iniciarSesion)
router.post('/verificar-token', usuarioController.verificarToken);
router.get('/usuarios', usuarioController.obtenerUsuarios);
router.get('/usuarios/:id', usuarioController.obtenerUsuarioPorId);
router.get('/usuarios/cerrar-sesion/:id', usuarioController.cerrarSesion);
router.get('/usuarios/token/:id', usuarioController.obtenerUsuarioPorToken);

module.exports = router;