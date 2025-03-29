import React from "react";
import "./WelcomeBanner.css";
import BannerImage from "../../assets/banner.jpg";
function WelcomeBanner() {
    return(
    <section className="welcome-banner">
        <img src={BannerImage} alt="banner" className="welcome-banner-image"></img>
        <h1 className="welcome-banner-title">Bienvenido a EditCraft</h1>
        <p className="welcome-banner-text">Explora plantillas de Photoshop, After Effects, videos y más.</p>
    </section>
)
}

export default WelcomeBanner;