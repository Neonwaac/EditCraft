import axios from "axios";
import React, { useEffect, useState } from "react";
import "./CommentsLayout.css";
import CommentCard from "../../components/CommentCard/CommentCard";

function CommentsLayout({ id }) {
    const [comments, setComments] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState("");

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8077/comentarios/${id}`);
            if (response.status === 200) {
                setComments(response.data);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleCrearComentario = async () => {
        if (!nuevoComentario.trim()) return;

        try {
            const token = localStorage.getItem("token");
            const user = await axios.get("http://localhost:8077/usuarios/token/" + token);
            if (!user.data) {
                console.error("Usuario no encontrado");
                return;
            }

            const response = await axios.post("http://localhost:8077/comentarios", {
                comentario: nuevoComentario,
                id_plantilla: id,
                id_usuario: user.data.id,
            });

            if (response.status === 200 || response.status === 201) {
                setNuevoComentario("");
                fetchComments();
            }
        } catch (error) {
            console.error("Error creando comentario:", error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [id]);

    return (
        <section className="comments-layout">
            <div className="add-comment-container">
                <textarea
                    className="add-comment-textarea"
                    value={nuevoComentario}
                    onChange={(e) => setNuevoComentario(e.target.value)}
                    placeholder="Escribe un comentario..."
                />
                <button className="add-comment-button" onClick={handleCrearComentario}>
                    Añadir Comentario
                </button>
            </div>

            {comments.length > 0 ? (
                comments.map((comment, index) => (
                    <CommentCard
                        key={index}
                        comentario={comment.comentario}
                        username={comment.username}
                        foto={comment.foto}
                    />
                ))
            ) : (
                <p className="comments-layout-empty">No hay comentarios todavía.</p>
            )}
        </section>
    );
}

export default CommentsLayout;
