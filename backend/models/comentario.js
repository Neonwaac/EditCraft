const db = require("../db/db");

class Comentario{
    constructor(id, comentario, id_plantilla, id_usuario){
        this.id = id;
        this.comentario = comentario;
        this.id_plantilla = id_plantilla;
        this.id_usuario = id_usuario;
    }
    static async obtenerComentariosPorPlantilla(id_plantilla) {
        const query = `SELECT C.comentario, U.username, U.foto FROM comentarios AS C INNER JOIN usuarios AS U ON C.id_usuario = U.id WHERE id_plantilla = ?`;
        const [result] = await db.promise().execute(query, [id_plantilla]);
        return result;
    }
    static async crearComentario(comentario, id_plantilla, id_usuario) {
        const query = `INSERT INTO comentarios (comentario, id_plantilla, id_usuario) VALUES (?, ?, ?)`;
        const [result] = await db.promise().execute(query, [comentario, id_plantilla, id_usuario]);
        return { id: result.insertId, comentario, id_plantilla, id_usuario };
    }
    static async eliminarComentario(id) {
        const query = `DELETE FROM comentarios WHERE id = ?`;
        const [result] = await db.promise().execute(query, [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Comentario;