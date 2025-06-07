const Plantilla = require("../models/plantilla");

exports.obtenerPlantillas = async (req, res) => {
  try {
    const plantillas = await Plantilla.obtenerPlantillas();
    res.status(200).json(plantillas);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Hubo un error al obtener las plantillas",
        error: error.message,
      });
  }
};

exports.obtenerPlantillaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const plantilla = await Plantilla.obtenerPlantillaPorId(id);
    if (!plantilla) {
      return res.status(404).json({ message: "Plantilla no encontrada" });
    }
    res.status(200).json(plantilla);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Hubo un error al obtener la plantilla",
        error: error.message,
      });
  }
};

exports.crearPlantilla = async (req, res) => {
  try {
    const { titulo, url } = req.body;
    const foto = req.file;
    if (!foto) {
      return res.status(400).json({ message: "No se subió ninguna foto" });
    }
    const plantilla = await Plantilla.crearPlantilla(titulo, url, foto);
    res.status(201).json(plantilla);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Hubo un error al crear la plantilla",
        error: error.message,
      });
  }
};

exports.actualizarPlantilla = async (req, res) => {
  const { id } = req.params;
  try {
    const { titulo, url } = req.body;
    const plantilla = await Plantilla.actualizarPlantilla(
      id,
      titulo,
      url
    );
    if (!plantilla) {
      return res.status(404).json({ message: "Plantilla no encontrada" });
    }
    res.status(200).json(plantilla);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Hubo un error al actualizar la plantilla",
        error: error.message,
      });
  }
};

exports.eliminarPlantilla = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Plantilla.eliminarPlantilla(id);
    if (!result) {
      return res.status(404).json({ message: "Plantilla no encontrada" });
    }
    res.status(200).json({ message: "Plantilla eliminada correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Hubo un error al eliminar la plantilla",
        error: error.message,
      });
  }
};
