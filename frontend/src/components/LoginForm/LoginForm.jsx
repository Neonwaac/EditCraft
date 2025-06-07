import React, { useState, useEffect } from "react";
import LogoImage from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import './LoginForm.css';
import axios from "axios";
import Swal from "sweetalert2";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const enviarFormulario = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8077/usuarios/login",
        { username, password }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al iniciar sesión",
        text: "Usuario o contraseña incorrectos",
      });
    }
  };

  return (
    <div className="login-form">
      <img src={LogoImage} alt="logo" className="login-form-logo" />
      <h1 className="login-form-title">Inicia sesión</h1>
      <form className="login-form-form" onSubmit={enviarFormulario}>
        <label className="login-form-label">Nombre de Usuario</label>
        <input
          type="text"
          className="login-form-input"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label className="login-form-label">Contraseña</label>
        <input
          type="password"
          className="login-form-input"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="login-form-button-container">
          <button className="login-form-button" type="submit">
            Iniciar Sesión
          </button>
        </div>
      </form>

      <p className="login-form-have-account">
        No tienes una cuenta?
        <Link className="login-form-have-account-link" to="/register">
          {" "}
          Regístrate
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;