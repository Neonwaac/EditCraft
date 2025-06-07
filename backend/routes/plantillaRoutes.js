const express = require('express');
const router = express.Router();
const plantillaController = require('../controllers/plantillaController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/plantillas', plantillaController.obtenerPlantillas);
router.get('/plantillas/:id' ,plantillaController.obtenerPlantillaPorId);
router.post('/plantillas', upload.single('foto'), plantillaController.crearPlantilla);
router.put('/plantillas/:id',upload.single('foto'), plantillaController.actualizarPlantilla);
router.delete('/plantillas/:id', plantillaController.eliminarPlantilla);


module.exports = router;