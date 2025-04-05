import React, { useEffect, useState } from "react";
import "./TemplatesLayout.css";
import axios from "axios";
import TemplateCard from "../../components/TemplateCard/TemplateCard";
import TemplateFormModal from "../../components/CreateEditModal/TemplateFormModal";

function TemplatesLayout() {
    const [templates, setTemplates] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
  
    useEffect(() => {
      const fetchTemplates = async () => {
        try {
          const response = await axios.get("http://localhost:8077/plantillas");
          setTemplates(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchTemplates();
    }, []);
  
    const handleCreateTemplate = () => {
      setIsEditing(false);
      setSelectedTemplate(null);
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    return (
      <section className="templates-layout">
        <button className="templates-layout-create-button" onClick={handleCreateTemplate}>
          Crear una nueva Plantilla
        </button>
        {templates.map((template) => (
          <TemplateCard 
            key={template.id}
            id={template.id}
            titulo={template.titulo}
            descripcion={template.descripcion}
            tipo={template.tipo}
            creador={template.creador}
            descargas={template.descargas}
            timestamp={template.timestamp}
            estado={template.estado}
            onEdit={() => {
              setIsEditing(true);
              setSelectedTemplate(template);
              setShowModal(true);
            }}
          />
        ))}
        {showModal && (
          <TemplateFormModal 
            isEditing={isEditing}
            templateData={selectedTemplate}
            onClose={handleCloseModal}
          />
        )}
      </section>
    );
  }
  
  export default TemplatesLayout;