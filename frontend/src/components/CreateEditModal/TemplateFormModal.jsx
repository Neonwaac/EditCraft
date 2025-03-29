import React, { useState, useEffect } from "react";
import axios from "axios";

function TemplateFormModal({ isOpen, onClose, initialData = null, onSuccess }) {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    tipo: 1,
    creador: 1,
    descargas: 0,
    timestamp: new Date().toISOString(),
    estado: "completo",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8007/plantillas${initialData ? `/${initialData.id}` : ""}`;

    try {
      if (initialData) {
        await axios.put(url, formData);
      } else {
        await axios.post(url, formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error al guardar la plantilla:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{initialData ? "Editar Plantilla" : "Añadir Plantilla"}</h2>
        <form onSubmit={handleSubmit}>
          <input name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Título" />
          <input name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" />
          <input name="tipo" value={formData.tipo} onChange={handleChange} type="number" placeholder="Tipo" />
          <input name="creador" value={formData.creador} onChange={handleChange} type="number" placeholder="Creador" />
          <input name="descargas" value={formData.descargas} onChange={handleChange} type="number" placeholder="Descargas" />
          <select name="estado" value={formData.estado} onChange={handleChange}>
            <option value="completo">Completo</option>
            <option value="incompleto">Incompleto</option>
            <option value="abandonado">Abandonado</option>
          </select>
          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default TemplateFormModal;