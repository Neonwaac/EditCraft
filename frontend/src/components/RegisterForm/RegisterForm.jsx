import React, { useState } from "react";
import LogoImage from "../../assets/logo.png";
import "./RegisterForm.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
function RegisterForm() {
    const [username, setUsername] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const enviarFormulario = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:8077/usuarios", {
          username,
          correo,
          password,
        });
        Swal.fire({
          title: "Te has registrado, ahora inicia sesión",
          icon: "success",
          draggable: true
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al registrarse",
          text: error.response.data.error || "Error desconocido",
        });
      }
    };
  return (
    <div className="register-form">
      <img src={LogoImage} alt="logo" className="register-form-logo"></img>
      <h1 className="register-form-title">Regístrate</h1>
      <form className="register-form-form">
        <label className="register-form-label">Nombre de Usuario</label>
        <input
          type="text"
          className="register-form-input"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="register-form-label">Correo</label>
        <input
          type="email"
          className="register-form-input"
          onChange={(e) => setCorreo(e.target.value)}
        />
        <label className="register-form-label">Contraseña</label>
        <input
          type="password"
          className="register-form-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="register-form-button-container">
          <button className="register-form-button" onClick={enviarFormulario}>
            Registrarse
          </button>
        </div>
      </form>
      <p className="register-form-have-account">
        Ya tienes una cuenta?
        <Link className="register-form-have-account-link" to="/login">
          {" "}
          Inicia Sesión
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;
