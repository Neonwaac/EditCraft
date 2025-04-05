const Usuario = require('../models/usuario.js');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {
    const { correo, username, password } = req.body;
    if (!correo || !username || !password) {
        return res.status(400).json({ message: 'Faltan campos por llenar' });
    }
    try {
        const usuarioCreado = await Usuario.crearUsuario(correo, username, password);
        res.status(201).json({ message: 'Usuario creado correctamente', usuario: usuarioCreado });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Hubo un error al crear el usuario', error: error.message });
    }
};
exports.iniciarSesion = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Faltan campos requeridos" });
    }
    try {
        const { token } = await Usuario.iniciarSesion(username, password);
        return res.status(200).json({ message: "Inicio de sesión exitoso", token});
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const {id} = req.params;
        const usuario = await Usuario.obtenerUsuarioPorId(id);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).json("Error al obtener el usuario", error);
    }
}

exports.verificarToken = (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ mensaje: "No autorizado: Header de autorización no encontrado", valido: false });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ mensaje: "No autorizado: Token no encontrado", valido: false });
        }
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ valido: true, mensaje: "Token válido", usuario: tokenDecoded });
    } catch (error) {
        console.error("Error al verificar token:", error);
        return res.status(401).json({ mensaje: "Token inválido o expirado", valido: false });
    }
};

exports.obtenerUsuarioPorToken = async(req, res) => {
    const token = req.params.id;
    try{
        const usuario = await Usuario.obtenerUsuarioPorToken(token);
        if(!usuario) {
            return res.status(404).json({ message: 'Usuario no con token '+ token +' no encontrado' });
        }
        res.status(200).json(usuario);
    }catch(error){
        res.status(500).json({ message: 'Hubo un error al obtener el usuario por token', error: error.message });
    }
}