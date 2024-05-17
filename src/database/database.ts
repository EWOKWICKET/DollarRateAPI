import mysql from 'mysql2';
import path from 'path'

import dotenv from 'dotenv';
dotenv.config({ path: path.resolve('./out/database/.env') });

/**
 * Connects to db .env vars are in 'out/database/.env'
 */
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

export async function addUser(email: string) {
    await pool.query(`INSERT INTO emails (email) VALUES (?)`, [email]);
}