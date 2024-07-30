const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('session_storage.db');

module.exports = { sqliteInstance: db };
