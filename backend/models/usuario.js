const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const axios = require("axios");
const saltRounds = 10;
class Usuario {
  constructor(correo, username, password) {
    this.username = username;
    this.correo = correo;
    this.password = password;
  }
  static async iniciarSesion(
    username,
    password,
    fromGoogle = false,
    correo = null
  ) {
    let query;
    let queryParam;
    if (fromGoogle) {
      if (!correo) {
        throw new Error(
          "Correo no proporcionado para iniciar sesión con Google"
        );
      }
      query = `SELECT * FROM usuarios WHERE correo = ?`;
      queryParam = correo;
    } else {
      query = `SELECT * FROM usuarios WHERE username = ?`;
      queryParam = username;
    }
    try {
      const [dbResponse] = await db.promise().execute(query, [queryParam]);

      if (dbResponse.length === 0) {
        throw new Error("Usuario no encontrado");
      }
      const dbUser = dbResponse[0];
      if (!fromGoogle) {
        const isPasswordValid = await bcrypt.compare(password, dbUser.password);
        if (!isPasswordValid) {
          throw new Error("Contraseña incorrecta");
        }
      }
      const token = this.generarToken(dbUser.id, dbUser.username, dbUser.rol);
      const tokenQuery = "UPDATE usuarios SET token = ? WHERE id = ?";
      await db.promise().execute(tokenQuery, [token, dbUser.id]);

      delete dbUser.password;

      return { token };
    } catch (error) {
      throw error;
    }
  }
  static generarToken(id, username, rol) {
    return jwt.sign(
      { id, username, rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  }
  static async obtenerUsuarios() {
    try {
      const query = `SELECT * FROM usuarios`;
      const [rows] = await db.promise().execute(query);
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
  }
  static async crearUsuario(correo, username, password) {
    try {
      const query = `INSERT INTO usuarios (correo, username, password) VALUES (?, ?, ?)`;
      const salt = await bcrypt.genSalt(10);
      const passwordEncriptada = await bcrypt.hash(password, salt);
      const [result] = await db
        .promise()
        .execute(query, [correo, username, passwordEncriptada]);
      return { id: result.insertId, correo, username };
    } catch (error) {
      throw new Error(`Error al insertar usuario: ${error.message}`);
    }
  }
static async addFotoUsuario(id, username, foto) {
  try {
    const uniqueName = await Usuario.SaveImage(id, username, foto);
    const photoPath = "http://localhost:8077/uploads/images/" + uniqueName;
    const query = `UPDATE usuarios SET foto = ? WHERE id = ?`;
    const [result] = await db.promise().execute(query, [photoPath, id]);
    return { id, foto: photoPath };
  } catch (error) {
    throw new Error(`Error al agregar foto: ${error.message}`);
  }
}

static async SaveImage(id, username, foto) {
  try {
    const imageDir = path.join(__dirname, "../uploads/images/");
    const ext = path.extname(foto.originalname);
    const uniqueName = "usuarios" + id + username + ext;
    const imagePath = path.join(imageDir, uniqueName);
    const files = fs.readdirSync(imageDir);
    const prefix = `usuarios${id}`;
    files.forEach(file => {
      if (file.startsWith(prefix)) {
        fs.unlinkSync(path.join(imageDir, file));
      }
    });
    fs.writeFileSync(imagePath, foto.buffer);

    return uniqueName;
  } catch (error) {
    throw new Error(`Error al guardar la imagen: ${error.message}`);
  }
}

  static async downloadAndSaveImage(id, username, imageUrl) {
    try {
      const response = await axios({
        url: imageUrl,
        responseType: "arraybuffer",
      });

      const uniqueName = "usuarios" + id + username + ".jpg";
      const imagePath = path.join(__dirname, "../uploads/images/", uniqueName);

      fs.writeFileSync(imagePath, response.data);

      return uniqueName;
    } catch (error) {
      throw new Error(
        `Error al descargar y guardar la imagen: ${error.message}`
      );
    }
  }
  static async obtenerUsuarioPorId(id) {
    try {
      const query = `SELECT * FROM usuarios WHERE id = ?`;
      const [rows] = await db.promise().execute(query, [id]);
      if (rows.length === 0) {
        throw new Error("Usuario no encontrado");
      }
      return rows[0];
    } catch (error) {
      throw new Error(`Error al obtener usuario por ID: ${error.message}`);
    }
  }
  static async obtenerUsuarioPorToken(token) {
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
  static async cerrarSesion(id) {
    try {
      const query = `UPDATE usuarios SET token = NULL WHERE id = ?`;
      const [result] = await db.promise().execute(query, [id]);
      if (result.affectedRows === 0) {
        throw new Error("Usuario no encontrado, model");
      }
      return true;
    } catch (error) {
      throw new Error(`Error al cerrar sesión: ${error.message}`);
    }
  }
    static async updateUsername(id, username) {
    try {
      const query = `UPDATE usuarios SET username = ? WHERE id = ?`;
      const [result] = await db.promise().execute(query, [username, id]);
      if (result.affectedRows === 0) {
        throw new Error("Usuario no encontrado");
      }
      return { id, username };
    } catch (error) {
      throw new Error(`Error al actualizar el nombre de usuario: ${error.message}`);
    }
  }
}
module.exports = Usuario;