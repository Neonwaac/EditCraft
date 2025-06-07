import React, { useState } from "react";
import './TemplateCard.css';
import { FaDownload } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditTemplateModal from "../EditTemplateModal/EditTemplateModal"; // importa el modal

function TemplateCard({ id, titulo, foto, url }) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const descargarImagen = () => {
        const link = document.createElement('a');
        link.href = foto;
        link.download = titulo || 'plantilla';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const viewTemplate = () => {
        navigate("/template/" + id);
    };

    const deleteTemplate = async () => {
        try {
            await axios.delete(`http://localhost:8077/plantillas/${id}`);
            alert(`Plantilla con ID: ${id} eliminada`);
        } catch (error) {
            console.error("Error al eliminar la plantilla:", error);
            alert("Hubo un error al eliminar la plantilla");
        }
    };

    const editTemplate = () => {
        setShowModal(true);
    };

    return (
        <>
            <section className="template-card">
                <img
                    className="template-card-photo"
                    src={foto}
                    alt={titulo}
                    onClick={viewTemplate}
                />
                <h1 className="template-card-title">{titulo}</h1>
                <FaDownload
                    className="template-card-download"
                    onClick={descargarImagen}
                />
                <a
                    className="template-card-link"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visitar plantilla
                </a>
                <button className="template-card-button-delete" onClick={deleteTemplate}>Eliminar</button>
                <button className="template-card-button-edit" onClick={editTemplate}>Editar</button>
            </section>

            {showModal && (
                <EditTemplateModal
                    id={id}
                    tituloInicial={titulo}
                    urlInicial={url}
                    onClose={() => setShowModal(false)}
                    onSuccess={() => window.location.reload()}
                />
            )}
        </>
    );
}

export default TemplateCard;

