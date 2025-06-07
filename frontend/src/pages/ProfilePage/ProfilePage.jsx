import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import UserImageModal from "../../components/UserImageModal/UserImageModal";
import axios from "axios";
import Swal from "sweetalert2";
import AppFooter from "../../components/AppFooter/AppFooter";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
function ProfilePage() {
  const [usuario, setUsuario] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [editandoNombre, setEditandoNombre] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:8077/usuarios/token/${token}`);
        setUsuario(response.data);
        setNuevoNombre(response.data.username);
      } catch (error) {
        console.error("Error al obtener usuario por token:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar el perfil del usuario",
        });
      }
    };

    if (token) {
      obtenerUsuario();
    } else {
      Swal.fire({
        icon: "warning",
        title: "No autorizado",
        text: "No se encontró un token de sesión",
      });
    }
  }, [token]);

  const handleGuardarNombre = async () => {
    try {
      await axios.put(`http://localhost:8077/usuarios/${usuario.id}/username`, {
        username: nuevoNombre,
      });
      setEditandoNombre(false);
      setUsuario((prev) => ({ ...prev, username: nuevoNombre }));

      Swal.fire({
        icon: "success",
        title: "Nombre actualizado",
      });
    } catch (error) {
      console.error("Error al actualizar el nombre", error);
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        text: error.response?.data?.error || "Ocurrió un error inesperado",
      });
    }
  };

  const handleCerrarSesion = async () => {
    try {
      console.log(usuario.id)
      await axios.get(`http://localhost:8077/usuarios/cerrar-sesion/${usuario.id}`);
      localStorage.removeItem("token");
      Swal.fire({
        title: "Sesión cerrada",
        icon: "success",
      }).then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      console.error("Error al cerrar sesión", error);
      Swal.fire({
        icon: "error",
        title: "Error al cerrar sesión",
      });
    }
  };

  if (!usuario) return null;

  return (
    <div className="profile-page">
      <NavigationBar />
      <div className="profile-page-container">
        <div className="profile-page-photo-container">
          <img
            className="profile-page-photo"
            src={usuario.foto}
            alt="Foto de perfil"
            onClick={() => setIsModalOpen(true)}
          />
          <button
            className="profile-page-change-photo-button"
            onClick={() => setIsModalOpen(true)}
          >
            Cambiar Foto
          </button>
        </div>

        <div className="profile-page-username-section">
          {editandoNombre ? (
            <>
              <input
                className="profile-page-username-input"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
              />
              <button
                className="profile-page-save-username-button"
                onClick={handleGuardarNombre}
              >
                Guardar
              </button>
              <button
                className="profile-page-cancel-username-button"
                onClick={() => {
                  setNuevoNombre(usuario.username);
                  setEditandoNombre(false);
                }}
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <h1 className="profile-page-username">{usuario.username}</h1>
              <button
                className="profile-page-edit-username-button"
                onClick={() => setEditandoNombre(true)}
              >
                Editar Nombre
              </button>
            </>
          )}
        </div>

        <button
          className="profile-page-logout-button"
          onClick={handleCerrarSesion}
        >
          Cerrar Sesión
        </button>
      </div>

      <UserImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={usuario.id}
        currentPhoto={usuario.foto}
        username={usuario.username}
      />
      <AppFooter />
    </div>
  );
}

export default ProfilePage;

