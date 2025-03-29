import React from "react";
import LogoImage from "../../assets/logo.png";
import './RegisterForm.css';
import { Link } from "react-router-dom";
function RegisterForm() {
    return (
        <div className="register-form">
            <img src={LogoImage} alt="logo" className="register-form-logo"></img>
            <h1 className="register-form-title">Regístrate</h1>
            <form className="register-form-form">
                <label className="register-form-label">Nombre de Usuario</label>
                <input type="text"className="register-form-input"></input>
                <label className="register-form-label">Correo</label>
                <input type="email" className="register-form-input"></input>
                <label className="register-form-label">Contraseña</label>
                <input type="password" className="register-form-input"></input>
                <div className="register-form-button-container">
                    <button className="register-form-button" type="submit">Registrarse</button>
                </div>             
            </form>
            <p className="register-form-have-account">Ya tienes una cuenta?
                    <Link className="register-form-have-account-link"to="/login"> Inicia Sesión</Link>
            </p>
        </div>
    );
}

export default RegisterForm;