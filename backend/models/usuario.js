const db = require('../db/db.js')
const bcrypt = require('bcrypt');
class Usuario{
    constructor(correo, username, password){
        this.correo = correo;
        this.username = username;
        this.password = password;
    }
    static async crearUsuario(username, correo, password){
        try {
            const query = "INSERT INTO usuarios (username, correo, password) VALUES (?, ?, ?)";
            const passwordEncriptado = await Usuario.encriptarPassword(password);
            const result = await db.promise().execute(query, [username, correo, passwordEncriptado]);
            return result[0];
        } catch (error) {
            return error;
        }
    }
    static async encriptarPassword(password){
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
    static async iniciarSesion(username, password){
        try {
            const query = "SELECT * FROM usuarios WHERE username = ?";
            const result = await db.promise().execute(query, [username]);
            const usuario = result[0][0];
            if(!usuario){
                return "Usuario no encontrado";
            }
            const passwordValido = await bcrypt.compare(password, usuario.password);
            if(passwordValido){
                console.log(usuario)
                return usuario;
            }
            return "Contraseña incorrecta";
        } catch (error) {
            throw new Error(error);
        }
    }
    static async obtenerUsuarioPorId(id){
        try {
            const query = "SELECT * FROM usuarios WHERE id = ?";
            const result = await db.promise().execute(query, [id]);
            console.log(result[0][0])
            return result[0][0];
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = Usuario;