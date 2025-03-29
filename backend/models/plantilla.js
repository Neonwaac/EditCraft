const db = require('../db/db.js')

class Plantilla{
    constructor(titulo, descripcion, tipo, creador, descargas, timestamp, estado){
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.creador = creador;
        this.descargas = descargas;
        this.timestamp = timestamp;
        this.estado = estado;
    }
    static async crearPlantilla(titulo, descripcion, tipo, creador, descargas, timestamp, estado){
        try {
            const query = "INSERT INTO plantillas (titulo, descripcion, tipo, creador, descargas, timestamp, estado) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const result = await db.promise().execute(query, [titulo, descripcion, tipo, creador, descargas, timestamp, estado]);
            return result[0];
        } catch (error) {
            return error;
        }
    }
    static async obtenerPlantillas(){
        try {
            const query = `SELECT P.id, P.titulo, P.descripcion, T.nombre AS tipo, U.username AS creador, 
            P.descargas, P.timestamp, P.estado FROM plantillas AS P
            INNER JOIN tipos as T ON P.tipo = T.id
            INNER JOIN usuarios as U ON P.creador = U.id
            ORDER BY P.timestamp DESC
            ` ;
            const result = await db.promise().execute(query);
            return result[0];
        } catch (error) {
            return error;
        }
    }
    static async obtenerPlantilla(id){
        try {
            const query = "SELECT * FROM plantillas WHERE id = ?";
            const result = await db.promise().execute(query, [id]);
            return result[0];
        } catch (error) {
            return error;
        }
    }
    static async actualizarPlantilla(id, titulo, descripcion, tipo, creador, descargas, timestamp, estado){
        try {
            const query = "UPDATE plantillas SET titulo = ?, descripcion = ?, tipo = ?, creador = ?, descargas = ?, timestamp = ?, estado = ? WHERE id = ?";
            const result = await db.promise().execute(query, [titulo, descripcion, tipo, creador, descargas, timestamp, estado, id]);
            return result[0];
        } catch (error) {
            return error;
        }
    }
    static async eliminarPlantilla(id){
        try {
            const query = "DELETE FROM plantillas WHERE id = ?";
            const result = await db.promise().execute(query, [id]);
            return result[0];
        } catch (error) {
            return error;
        }
    }
}
module.exports = Plantilla;