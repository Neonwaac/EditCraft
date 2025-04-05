import React from "react";
import "./TemplateCard.css";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import axios from "axios";
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";

function TemplateCard({ id, titulo, descripcion, tipo, creador, descargas, timestamp, estado, onEdit }) {
  const navigate = useNavigate();
  const timeAgo = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
    locale: es,
  });

  const deleteTemplate = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Estás seguro de eliminar esta plantilla?",
      text: "No podrás revertir este cambio!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => { // Asegúrate de usar `async` aquí
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8077/plantillas/${id}`);
          Swal.fire({
            title: "Eliminado!",
            text: "La plantilla ha sido eliminada.",
            icon: "success",
          });
          window.location.reload(true);
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al eliminar la plantilla",
            text: "Verifica el servidor o la BD",
          });
        }
      }
    });
  };
  

  const getTemplate = async (e) => {
    e.preventDefault();
    navigate(`/template/${id}`);
  };

  return (
    <div className="template-card">
      <div className="template-card-header">
        <span className="template-card-type">{tipo}</span>
        <span className={`template-card-estado ${estado}`}>{estado}</span>
      </div>

      <div className="template-card-body">
        <h3 className="template-card-title" onClick={getTemplate}>{titulo}</h3>
        <p className="template-card-descripcion">{descripcion}</p>
      </div>

      <div className="template-card-footer">
        <span className="template-card-creador">Por: {creador}</span>
        <span className="template-card-descargas">{descargas} descargas</span>
        <span className="template-card-timestamp">{timeAgo}</span>
      </div>
      <div className="template-card-actions">
        <button className="template-card-edit-button" onClick={onEdit}>Editar</button>
        <button className="template-card-delete-button" onClick={deleteTemplate}>Eliminar</button>
      </div>
    </div>
  );
}

export default TemplateCard;