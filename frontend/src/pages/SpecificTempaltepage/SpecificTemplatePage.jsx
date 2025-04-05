import React, { useEffect, useState } from "react";
import "./SpecificTemplatePage.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AppFooter from "../../components/AppFooter/AppFooter";
import axios from "axios";
import { useParams } from "react-router-dom";
import { es } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";

function SpecificTemplatePage() {
  const { id } = useParams();
  const [template, setTemplate] = useState();

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await axios.get(`http://localhost:8077/plantillas/${id}`);
        if (response.status === 200) {
          setTemplate(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching template:", error);
      }
    };
    fetchTemplate();
  }, [id]);

  // Solo calcular timeAgo si template está definido
  const timeAgo = template
    ? formatDistanceToNow(new Date(template.timestamp), {
        addSuffix: true,
        locale: es,
      })
    : "";

  return (
    <section className="specific-template-page">
      <NavigationBar />
      {template && (
        <main className="template-detail-container">
          <header className="template-detail-header">
            <h1 className="template-detail-title">{template.titulo}</h1>
            <p className="template-detail-subtitle">{template.descripcion}</p>
          </header>
          <section className="template-detail-meta">
            <p className="template-detail-type">Tipo: {template.tipo}</p>
            <p className="template-detail-creator">Creador: {template.creador}</p>
            <p className="template-detail-downloads">Descargas: {template.descargas}</p>
            <p className="template-detail-date">Publicado: {timeAgo}</p>
            <p className="template-detail-status">Estado: {template.estado}</p>
          </section>
          <section className="template-actions-section">
            <button className="template-download-button">Descargar</button>
          </section>
        </main>
      )}
      <AppFooter />
    </section>
  );
}

export default SpecificTemplatePage;
