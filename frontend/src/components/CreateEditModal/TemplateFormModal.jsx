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
        setUser(response.data.username); // Asigna el nombre del usuario
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
      setFormData({ ...templateData, creador: userId }); // Asegura que "creador" sea el ID del usuario
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
    <div className="template-form-modal">
      <div className="modal-content">
        <h2>{isEditing ? "Editar Plantilla" : "Nueva Plantilla"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Título:
            <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
          </label>
          <label>
            Descripción:
            <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required />
          </label>
          <label>
            Tipo:
            <select name="tipo" value={formData.tipo} onChange={handleChange} required>
              <option value="">Selecciona un tipo</option>
              <option value="1">Foto</option>
              <option value="2">Video</option>
              <option value="3">Photoshop</option>
              <option value="4">After Effects</option>
            </select>
          </label>
          <label>
            Creador: <span>{user}</span> {/* Muestra el nombre del usuario */}
          </label>
          <label>
            Descargas:
            <input type="number" name="descargas" value={formData.descargas} onChange={handleChange} required />
          </label>
          <label>
            Estado:
            <select name="estado" value={formData.estado} onChange={handleChange} required>
              <option value="completo">Completo</option>
              <option value="incompleto">Incompleto</option>
              <option value="abandonado">Abandonado</option>
            </select>
          </label>
          <div className="modal-actions">
            <button type="submit">{isEditing ? "Guardar Cambios" : "Crear Plantilla"}</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TemplateFormModal;

