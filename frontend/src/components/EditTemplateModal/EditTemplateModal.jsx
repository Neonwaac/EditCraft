import React, { useState } from "react";
import axios from "axios";
import './EditTemplateModal.css';

function EditTemplateModal({ id, tituloInicial, urlInicial, onClose, onSuccess }) {
    const [titulo, setTitulo] = useState(tituloInicial);
    const [url, setUrl] = useState(urlInicial);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("url", url);

        try {
            await axios.put(`http://localhost:8077/plantillas/${id}`, formData);
            alert("Plantilla actualizada correctamente");
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error al actualizar la plantilla:", error);
            alert("Error al actualizar la plantilla");
        }
    };

    return (
        <div className="edit-template-modal">
            <div className="edit-template-modal-content">
                <h2 className="edit-template-modal-title">Editar Plantilla</h2>
                <form onSubmit={handleSubmit} className="edit-template-modal-form">
                    <input
                        className="edit-template-modal-input"
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Título"
                        required
                    />
                    <input
                        className="edit-template-modal-input"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="URL"
                        required
                    />
                    <div className="edit-template-modal-buttons">
                        <button type="submit" className="edit-template-modal-button-save">Guardar</button>
                        <button type="button" onClick={onClose} className="edit-template-modal-button-cancel">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTemplateModal;

