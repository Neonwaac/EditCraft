import React, { useState, useEffect } from "react";
import "./TemplateFormModal.css";
import axios from "axios";
import Swal from "sweetalert2";

function TemplateFormModal({ isEditing, templateData, onClose }) {
  const [user, setUser] = useState(null);
  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8077/usuarios/token/${storedToken}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };
    fetchUser();
  }, [storedToken]);

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    tipo: "",
    creador: "",
    descargas: "",
    estado: "activo",
  });

  // Cargar datos si se está editando y usuario ya fue cargado
  useEffect(() => {
    if (user) {
      if (isEditing && templateData) {
        setFormData({
          ...templateData,
          creador: user.id.toString(), // Convertimos a string si es necesario
        });
      } else {
        setFormData((prevState) => ({
          ...prevState,
          creador: user.id.toString(),
        }));
      }
    }
  }, [isEditing, templateData, user]);

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convertir campos numéricos a número
    const parsedValue = name === "tipo" || name === "descargas" ? Number(value) : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const url = `http://localhost:8077/plantillas${isEditing ? `/${templateData.id}` : ""}`;
    const method = isEditing ? "PUT" : "POST";

    try {
      await axios({
        method,
        url,
        data: formData,
      });
      Swal.fire({
        icon: "success",
        title: `Plantilla ${isEditing ? "actualizada" : "creada"} exitosamente!`,
      });
      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `No se pudo ${isEditing ? "actualizar" : "crear"} la plantilla. Verifica el servidor o la BD.`,
      });
    }
  };
  if (!user) return <div className="modal-loader">Cargando...</div>;
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{isEditing ? "Editar Plantilla" : "Crear Nueva Plantilla"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />

          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />

          <label>Tipo:</label>
          <input
            type="number"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          />

          <label>Descargas:</label>
          <input
            type="number"
            name="descargas"
            value={formData.descargas}
            onChange={handleChange}
            required
          />

          <label>Estado:</label>
          <select name="estado" value={formData.estado} onChange={handleChange}>
            <option value="activo">Activo</option>
            <option value="incompleto">Incompleto</option>
            <option value="inactivo">Inactivo</option>
          </select>

          <div className="modal-buttons">
            <button type="submit">{isEditing ? "Guardar Cambios" : "Crear"}</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TemplateFormModal;


