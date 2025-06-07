const Comentario = require('../models/comentario');

exports.obtenerComentarios = async (req, res) => {
    const { id } = req.params;
    try {
        const comentarios = await Comentario.obtenerComentariosPorPlantilla(id);
        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener los comentarios', error: error.message });
    }
}
exports.crearComentario = async (req, res) => {
    const { comentario, id_plantilla, id_usuario } = req.body;
    try {
        const nuevoComentario = await Comentario.crearComentario(comentario, id_plantilla, id_usuario);
        res.status(201).json(nuevoComentario);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al crear el comentario', error: error.message });
    }
}
exports.eliminarComentario = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Comentario.eliminarComentario(id);
        if (!response) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        res.status(200).json({ message: 'Comentario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al eliminar el comentario', error: error.message });
    }
}