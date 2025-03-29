const Plantilla = require('../models/plantilla.js');

exports.crearPlantilla = async (req, res) => {
    try {
        const {titulo, descripcion, tipo, creador, descargas, timestamp, estado} = req.body;
        const plantilla = await Plantilla.crearPlantilla(titulo, descripcion, tipo, creador, descargas, timestamp, estado); 
        res.status(201).json(plantilla);
    } catch (error) {
        res.status(400).json("Error al crear la plantilla", error);
    }
}
exports.obtenerPlantillas = async (req, res) => {
    try {
        const plantillas = await Plantilla.obtenerPlantillas();
        res.status(200).json(plantillas);
    } catch (error) {
        res.status(400).json("Error al obtener las plantillas", error);
    }
}
exports.obtenerPlantilla = async (req, res) => {
    try {
        const id = req.params.id;
        const plantilla = await Plantilla.obtenerPlantilla(id);
        res.status(200).json(plantilla);
    } catch (error) {
        res.status(400).json("Error al obtener la plantilla", error);
    }
}
exports.actualizarPlantilla = async (req, res) => {
    try {
        const id = req.params.id;
        const {titulo, descripcion, tipo, creador, descargas, timestamp, estado} = req.body;
        const plantilla = await Plantilla.actualizarPlantilla(id, titulo, descripcion, tipo, creador, descargas, timestamp, estado); 
        res.status(201).json(plantilla);
    } catch (error) {
        res.status(400).json("Error al actualizar la plantilla", error);
    }
}
exports.eliminarPlantilla = async (req, res) => {
    try {
        const id = req.params.id;
        const plantilla = await Plantilla.eliminarPlantilla(id);
        res.status(200).json(plantilla);
    } catch (error) {
        res.status(400).json("Error al eliminar la plantilla", error);
    }
}