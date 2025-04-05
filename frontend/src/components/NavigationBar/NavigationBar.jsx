import React, { useEffect, useState } from "react";
import "./NavigationBar.css";
import LogoImage from "../../assets/whitelogo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
function NavigationBar() {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const verifyToken = async () => {
            const params = new URLSearchParams(location.search);
            const tokenParam = params.get("token");
            let storedToken = localStorage.getItem("token");
    
            // 🔹 Si viene un token en los parámetros, actualizar localStorage y el estado
            if (tokenParam) {
                try {
                    localStorage.setItem("token", tokenParam);
                    storedToken = tokenParam; // 🔹 Ahora storedToken tiene el valor correcto
                    navigate("/", { replace: true });
                } catch (error) {
                    console.error("Error al almacenar el token:", error);
                }
            }
    
            // 🔹 Si aún no hay token, redirigir al login
            if (!storedToken) {
                localStorage.removeItem("token");
                setToken(null);
                navigate("/login");
                return;
            }
    
            try {
                // 🔹 Llamada a backend para verificar el token
                const response = await axios.post(
                    "http://localhost:8077/verificar-token",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${storedToken}`,
                        },
                    }
                );
    
                if (response.data.valido) {
                    setToken(storedToken);
                } else {
                    throw new Error("Token inválido");
                }
            } catch (error) {
                localStorage.removeItem("token");
                setToken(null);
                Swal.fire({
                    icon: "error",
                    title: "Sesión expirada",
                    text: "Tu sesión ha expirado, por favor inicia sesión nuevamente.",
                });
                navigate("/login");
            }
        };
    
        verifyToken();
    }, [location, navigate]);

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;

            try {
                const response = await axios.get(`http://localhost:8077/usuarios/token/${token}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error al obtener el usuario:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo obtener el usuario, token inválido.",
                });
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            }
        };

        fetchUser();
    }, [token, navigate]);
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