require('dotenv').config(); // Ensure to load .env variables

const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.PG_URL, // Ensure the environment variable is correctly named
  ssl: false // Disable SSL since the server does not support it
});

client.connect().catch(error => {
  console.error("Error connecting to PostgreSQL:", error);
});

module.exports = client;
