const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentarioController');

router.get('/comentarios/:id', comentarioController.obtenerComentarios);
router.post('/comentarios', comentarioController.crearComentario);
router.delete('/comentarios/:id', comentarioController.eliminarComentario);

module.exports = router;