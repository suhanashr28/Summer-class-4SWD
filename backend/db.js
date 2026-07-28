require("dotenv").config();
const path = require("path");
const Database = require("better-sqlite3");

const dbFile = process.env.DB_FILE || "database.db";

const db = new Database(path.join(__dirname, dbFile));

db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    supplier TEXT,
    price REAL,
    quantity INTEGER,
    category TEXT,
    description TEXT,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    address TEXT,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);

console.log(`✅ Database connected successfully (${dbFile})`);

module.exports = db;