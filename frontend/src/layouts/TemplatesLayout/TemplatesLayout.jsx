import React, { useEffect, useState } from "react";
import "./TemplatesLayout.css";
import axios from "axios";
import TemplateCard from "../../components/TemplateCard/TemplateCard";

function TemplatesLayout(){
    const [templates, setTemplates] = useState([]);
    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await axios.get("http://localhost:8007/plantillas");
                setTemplates(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchTemplates();
    }, []);
    return(
        <section className="templates-layout">
            <button className="templates-layout-create-button">Crear una nueva Plantilla</button>
            {
                templates.map((template)=>(
                    <TemplateCard 
                    key={template.id}
                    id = {template.id}
                    titulo = {template.titulo}
                    descripcion = {template.descripcion}
                    tipo = {template.tipo}
                    creador = {template.creador}
                    descargas = {template.descargas}
                    timestamp = {template.timestamp}
                    estado = {template.estado}
                    />
                ))
            }
            
        </section>
    )
}

export default TemplatesLayout;