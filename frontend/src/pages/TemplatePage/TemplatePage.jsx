import React, { useEffect } from "react";
import "./TemplatePage.css";
import { useParams } from "react-router-dom";
import CommentsLayout from "../../layouts/CommentsLayout/CommentsLayout";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AppFooter from "../../components/AppFooter/AppFooter";

function TemplatePage() {
  const { id } = useParams();
  const [template, setTemplate] = React.useState();
  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8077/plantillas/" + id
        );
        setTemplate(response.data);
      } catch (error) {
        console.error("Error fetching template:", error);
      }
    };
    fetchTemplate();
  }, [id]);
      const descargarImagen = () => {
        const link = document.createElement('a');
        link.href = template.foto;
        link.download = template.titulo || 'plantilla';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

  return !template ? (
    <div className="loading">Loading...</div>
  ) : (
    <section className="template-page">
      <NavigationBar />
      <div className="template-card-focus">
        <img
          className="template-card-focus-image"
          src={template.foto}
          alt={template.titulo}
        />
        <h1 className="template-card-focus-title">{template.titulo}</h1>
        <FaDownload
          className="template-card-download"
          onClick={descargarImagen}
        />
        <a
          className="template-card-link"
          href={template.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visitar plantilla
        </a>
      </div>
      <CommentsLayout id={id} />
      <AppFooter />
    </section>
  );
}

export default TemplatePage;
