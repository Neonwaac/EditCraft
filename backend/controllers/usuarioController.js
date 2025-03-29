const Usuario = require('../models/usuario.js');
const bcrypt = require('bcrypt');

exports.crearUsuario = async (req, res) => {
    try {
        const {username, correo, password} = req.body;
        const usuario = await Usuario.crearUsuario(username, correo, password); 
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json("Error al crear el usuario", error);
    }
}
exports.iniciarSesion = async (req, res) => {
    try {
        const {username, password} = req.body;
        const usuario = await Usuario.iniciarSesion(username, password);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).json("Error al iniciar sesión", error);
    }
}
exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const {id} = req.params;
        const usuario = await Usuario.obtenerUsuarioPorId(id);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).json("Error al obtener el usuario", error);
    }
}