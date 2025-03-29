const router = require('express').Router();
const plantillaController = require('../controllers/plantillaController.js');

router.get('/plantillas', plantillaController.obtenerPlantillas);
router.get('/plantillas/:id', plantillaController.obtenerPlantilla);
router.post('/plantillas', plantillaController.crearPlantilla);
router.put('/plantillas/:id', plantillaController.actualizarPlantilla);
router.delete('/plantillas/:id', plantillaController.eliminarPlantilla);

module.exports = router;