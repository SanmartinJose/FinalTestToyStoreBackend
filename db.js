const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "b5e9trvwvq1qqfbldi14-mysql.services.clever-cloud.com",
  user: "ueyu3pwilbg3e6ra",
  password: "H2lT4SWBv2yhYBlQ9Shl",
  database: "b5e9trvwvq1qqfbldi14",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos en Clever Cloud");
});

module.exports = db;
