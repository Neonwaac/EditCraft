const db = require("../db/db");
const fs = require("fs");
const path = require("path");

class Plantilla {
    constructor(id, titulo, foto, url) {
        this.id = id;
        this.titulo = titulo;
        this.foto = foto;
        this.url = url;
    }

    static async obtenerPlantillas() {
        try {
            const query = "SELECT * FROM plantilla ORDER BY timestamp DESC";
            const [rows] = await db.promise().execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener las plantillas: ' + error.message);
        }
    }

    static async obtenerPlantillaPorId(id) {
        try {
            const query = "SELECT * FROM plantilla WHERE id = ?";
            const [rows] = await db.promise().execute(query, [id]);
            return rows[0];
        } catch (error) {
            throw new Error('Error al obtener la plantilla por ID: ' + error.message);
        }
    }

    static async guardarFoto(id, titulo, foto) {
        try {
            const imageDir = path.join(__dirname, "../uploads/images/");
            if (!fs.existsSync(imageDir)) {
                fs.mkdirSync(imageDir, { recursive: true });
            }

            const ext = path.extname(foto.originalname);
            const safeTitulo = titulo.replace(/\s+/g, "_").toLowerCase();
            const uniqueName = `plantilla${id}_${safeTitulo}${ext}`;
            const imagePath = path.join(imageDir, uniqueName);

            // Eliminar imágenes anteriores del mismo id
            const files = fs.readdirSync(imageDir);
            const prefix = `plantilla${id}_`;
            files.forEach(file => {
                if (file.startsWith(prefix)) {
                    fs.unlinkSync(path.join(imageDir, file));
                }
            });

            fs.writeFileSync(imagePath, foto.buffer);
            return "http://localhost:8077/uploads/images/"+uniqueName;
        } catch (error) {
            throw new Error(`Error al guardar la imagen: ${error.message}`);
        }
    }

    static async crearPlantilla(titulo, url, foto) {
        try {
            if (!foto) throw new Error('No se subió ninguna foto');

            // Insertar para obtener ID
            const insertQuery = "INSERT INTO plantilla (titulo, foto, url) VALUES (?, '', ?)";
            const [result] = await db.promise().execute(insertQuery, [titulo, url]);
            const id = result.insertId;

            // Guardar foto y actualizar registro
            const nombreArchivo = await Plantilla.guardarFoto(id, titulo, foto);
            const updateQuery = "UPDATE plantilla SET foto = ? WHERE id = ?";
            await db.promise().execute(updateQuery, [nombreArchivo, id]);

            return { id, titulo, foto: nombreArchivo, url };
        } catch (error) {
            throw new Error('Error al crear la plantilla: ' + error.message);
        }
    }

static async actualizarPlantilla(id, titulo, url, foto) {
    try {
        let nombreArchivo;
        if (foto) {
            nombreArchivo = await Plantilla.guardarFoto(id, titulo, foto);
        }
        const query =  "UPDATE plantilla SET titulo = ?, url = ? WHERE id = ?";

        const params = [titulo, url, id];

        const [result] = await db.promise().execute(query, params); // ✅ aquí la corrección

        if (result.affectedRows === 0) return null;

        return { id, titulo, url, foto: nombreArchivo };
    } catch (error) {
        throw new Error('Error al actualizar la plantilla: ' + error.message);
    }
}


    static async eliminarPlantilla(id) {
        try {
            // Eliminar imagen física
            const query = "SELECT foto FROM plantilla WHERE id = ?";
            const [rows] = await db.promise().execute(query, [id]);
            if (rows.length === 0) return null;

            const imageDir = path.join(__dirname, "../uploads/images/");
            const files = fs.readdirSync(imageDir);
            const prefix = `plantilla${id}_`;
            files.forEach(file => {
                if (file.startsWith(prefix)) {
                    fs.unlinkSync(path.join(imageDir, file));
                }
            });

            const deleteQuery = "DELETE FROM plantilla WHERE id = ?";
            await db.promise().execute(deleteQuery, [id]);
            return true;
        } catch (error) {
            throw new Error('Error al eliminar la plantilla: ' + error.message);
        }
    }
}

module.exports = Plantilla;
