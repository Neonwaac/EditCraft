import React from "react";
import "./NavigationBar.css";
import LogoImage from "../../assets/whitelogo.png";
import { Link } from "react-router-dom";
function NavigationBar() {
    return(
    <section className="navigation-bar">
        <div className="navigation-bar-left">
            <img src={LogoImage} alt="logo" className="navigation-bar-logo"></img>
        </div>
        <div className="navigation-bar-right">
            <Link to="/home" className="navigation-bar-link">Inicio</Link>
            <Link to="/templates" className="navigation-bar-link">Plantillas</Link>
            <Link to="/about" className="navigation-bar-link">Acerca de</Link>
            <Link to="/dashboard" className="navigation-bar-link">Mi perfil</Link>
        </div>
    </section>
    )
}

export default NavigationBar;