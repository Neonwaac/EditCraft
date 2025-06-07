import axios from "axios";
import React, { useEffect, useState } from "react";
import "./TemplatesLayout.css"
import TemplateCard from "../../components/TemplateCard/TemplateCard";
import AddTemplateModal from "../../components/AddTemplateModal/AddTemplateModal"; // Asegúrate que esta ruta coincida

function TemplatesLayout(){
    const [templates, setTemplates] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);

    const fetchTemplates = async () => {
        try {
            const response = await axios.get('http://localhost:8077/plantillas');
            if (response.status === 200) {
                setTemplates(response.data);
            }
        } catch (error) {
            console.error("Error fetching templates:", error);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    return (
        <section className="templates-layout">
            <button className="abrir-modal-button" onClick={() => setMostrarModal(true)}>
                Añadir Plantilla
            </button>

            {mostrarModal && (
                <AddTemplateModal
                    onClose={() => setMostrarModal(false)}
                    onSuccess={fetchTemplates}
                />
            )}

            {
                templates.map((template) => (
                    <TemplateCard 
                        key={template.id}
                        id={template.id}
                        titulo={template.titulo}
                        url={template.url}
                        foto={template.foto}
                    />
                ))
            }
        </section>
    );
}


export default TemplatesLayout;