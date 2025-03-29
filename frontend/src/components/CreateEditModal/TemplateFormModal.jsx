import React, { useState, useEffect } from "react";
import "./TemplateFormModal.css";
import axios from "axios";
import Swal from "sweetalert2";

function TemplateFormModal({ isEditing, templateData, onClose }) {
  const userId = localStorage.getItem("LoggedUserId");
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8007/usuario/${userId}`);
        setUser(response.data.username);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };
    fetchUser();
  }, [userId]);

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    tipo: "",
    creador: "",
    descargas: "",
    estado: "activo"
  });

  useEffect(() => {
    if (isEditing && templateData) {
      setFormData({ ...templateData, creador: userId });
    } else {
      setFormData((prevState) => ({ ...prevState, creador: userId }));
    }
  }, [isEditing, templateData, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8007/plantillas" + (isEditing ? `/${templateData.id}` : "");
    console.log(url)
    const method = isEditing ? "PUT" : "POST";

    try {
      await axios({
        method: method,
        url: url,
        data: formData
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

