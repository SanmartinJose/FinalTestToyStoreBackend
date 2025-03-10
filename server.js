require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db"); // Importamos la conexión

const app = express();
app.use(express.json());

// Ruta para autenticar usuarios
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: "Error en el servidor" });

    if (results.length === 0) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const user = results[0];

    // Comparar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id, role: user.role }, "secreto", { expiresIn: "1h" });

    res.json({ message: `Bienvenido, ${user.username}`, token });
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
