const db = require('../db/db.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class Usuario{
    constructor(correo, username, password){
        this.correo = correo;
        this.username = username;
        this.password = password;
    }
    static async crearUsuario(correo, username, password) {
        try {
            const esSegura = this.validarPassword(password);
            if (!esSegura) {
                throw new Error("Asegurate de que tu contraseña tenga al menos 8 caracteres, una mayúscula, un número y un carácter especial.");
            }
            const existeUsuario = await this.obtenerUsuarioPorUsername(username);
            if (existeUsuario) {
                throw new Error("El nombre de usuario ya existe, intenta con otro.");
            }
            const existeCorreo = await this.obtenerUsuarioPorCorreo(correo);
            if (existeCorreo) {
                throw new Error("El correo ya está registrado, intenta con otro.");
            } 
            const query = `INSERT INTO usuarios (correo, username, password) VALUES (?, ?, ?)`;
            const salt = await bcrypt.genSalt(10);
            const passwordEncriptada = await bcrypt.hash(password, salt);
            const [result] = await db.promise().execute(query, [correo, username, passwordEncriptada]);
            return { id: result.insertId, correo, username };
        } catch (error) {
            throw new Error(`Error al insertar usuario: ${error.message}`);
        }
    }
    static async obtenerUsuarioPorUsername(username) {
        try {
            const query = "SELECT * FROM usuarios WHERE username = ?";
            const [result] = await db.promise().execute(query, [username]);
            return result.length > 0;
        } catch (error) {
            throw new Error(`Error al obtener usuario por username: ${error.message}`);
        }
    }
    static async obtenerUsuarioPorCorreo(correo) {
        try {
            const query = "SELECT * FROM usuarios WHERE correo = ?";
            const [result] = await db.promise().execute(query, [correo]);
            return result.length > 0;
        } catch (error) {
            throw new Error(`Error al obtener usuario por correo: ${error.message}`);
        }
    }
    static validarPassword(password) {
        const tieneMayuscula = /[A-Z]/.test(password);
        const tieneNumero = /[0-9]/.test(password);
        const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const tieneLongitud = password.length >= 8;
        return tieneMayuscula && tieneNumero && tieneEspecial && tieneLongitud;
    }
    static generarToken(id, username, rol) {
        return jwt.sign(
            { id, username, rol },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
    }
    static async iniciarSesion(username, password){
        try {
            const query = "SELECT * FROM usuarios WHERE username = ?";
            const [result] = await db.promise().execute(query, [username]);
            if(result.length === 0){
                throw new Error("Usuario no encontrado");
            }
            const dbUser = result[0];
            const isPasswordValid = await bcrypt.compare(password, dbUser.password);
            if (!isPasswordValid) {
                throw new Error("Contraseña incorrecta");
            }
            const token = Usuario.generarToken(dbUser.id, dbUser.username, dbUser.rol);
            const tokenQuery = "UPDATE usuarios SET token = ? WHERE id = ?";
            await db.promise().execute(tokenQuery, [token, dbUser.id]);
            return { token }
        } catch (error) {
            throw new Error(error);
        }
    }
    static async obtenerUsuarioPorToken(token){
        const query = `SELECT * FROM usuarios WHERE token = ?`;
        try {
            const [rows] = await db.promise().execute(query, [token]);
            if (rows.length === 0) {
                throw new Error("Usuario no encontrado");
            }
            return rows[0];    
        } catch (error) {
            throw new Error(`Error al obtener usuario por token: ${error.message}`);
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