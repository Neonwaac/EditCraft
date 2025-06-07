import React from "react";
import "./CommentCard.css";

function CommentCard({ comentario, username, foto }) {
    return (
        <div className="comment-card">
            <img src={foto} alt="Foto de usuario" className="comment-card-foto" />
            <div className="comment-card-body">
                <p className="comment-card-username">{username}</p>
                <p className="comment-card-comentario">{comentario}</p>
            </div>
        </div>
    );
}

export default CommentCard;
