import React, { useState } from "react";
import axios from "axios";
import "./AddTemplateModal.css";

function AddTemplateModal({ onClose, onSuccess }) {
    const [titulo, setTitulo] = useState("");
    const [url, setUrl] = useState("");
    const [foto, setFoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("url", url);
        formData.append("foto", foto);

        try {
            const response = await axios.post("http://localhost:8077/plantillas", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.status === 201) {
                onSuccess();
                onClose();
            }
        } catch (error) {
            console.error("Error al crear plantilla:", error);
        }
    };

    return (
        <div className="add-template-modal">
            <div className="add-template-modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <form className="add-template-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFoto(e.target.files[0])}
                        required
                    />
                    <button type="submit">Crear Plantilla</button>
                </form>
            </div>
        </div>
    );
}

export default AddTemplateModal;
