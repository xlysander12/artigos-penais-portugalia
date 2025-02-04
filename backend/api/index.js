const express = require('express');
const mysql = require('mysql2/promise');

// Initializing the Router
const app = express.Router();

// Initializing the MySQL connection
const mysqlPool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Util Vars
const crimesCategories = ["contraordenacoes_nauticas", "contraordenacoes_rodoviarias", "contra_estado", "contra_identidade_cultural", "contra_patrimonio", "contra_pessoas", "contra_vida_sociedade"];

// Routes to fetch crimes
app.get("/crimes/:category", async (req, res) => {
    // Check if category is valid
    const category = req.params.category;
    if (!crimesCategories.includes(category)) {
        res.status(400).json({ error: "Invalid category" });
        return;
    }

    // Fetch the crimes
    try {
        const [rows] = await mysqlPool.query(`SELECT * FROM ${category}`);
        res.json(rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to fetch crimes" });
    }
});


// Exporting the Router
module.exports = app;