import React, {useState, useEffect} from "react";
import LogoImage from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import './LoginForm.css';
import axios from "axios";
import Swal from "sweetalert2";
function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const iniciarSesion = async(e) => {
        e.preventDefault();
        try {
          const response = await axios.post(
            "http://localhost:8077/login",
            { username, password }
          );
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al iniciar sesión",
            text: error.response.data.error || "Error desconocido",
          });
        }
    }
    return (
        <div className="login-form">
            <img src={LogoImage} alt="logo" className="login-form-logo"></img>
            <h1 className="login-form-title">Inicia sesión</h1>
            <form className="login-form-form">
                <label className="login-form-label">Nombre de Usuario</label>
                <input type="text"className="login-form-input" onChange={(e)=>setUsername(e.target.value)}></input>
                <label className="login-form-label">Contraseña</label>
                <input type="password" className="login-form-input" onChange={(e)=>setPassword(e.target.value)}></input>
                <div className="login-form-button-container">
                    <button className="login-form-button" onClick={iniciarSesion}>Iniciar Sesión</button>
                </div>
            </form>
            <p className="login-form-have-account">No tienes una cuenta? 
                    <Link className="login-form-have-account-link" to="/register"> Regístrate</Link>
                </p>
            <h4 className="login-form-or-text">Inicia Sesión con Google</h4>
        </div>
    );
}

export default LoginForm;