import mysql, { FieldPacket, RowDataPacket } from 'mysql2';
import path from 'path'

import dotenv from 'dotenv';
dotenv.config({ path: path.resolve('./out/database/.env') });

export interface User extends RowDataPacket {
    id: number,
    email: string
}

/**
 * Connects to db .env vars are in 'out/database/.env'
 */
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

/**
 * Gets all fields of a table
 * @returns Array of user's fields
 */
export async function getUsers() : Promise<User[]> {
    const result: [User[], FieldPacket[]] = await pool.query("SELECT * FROM emails");
    const users = result[0];
    return users;
}

/**
 * Adds a user to a database
 * @param email to subscribe
 */
export async function addUser(email: string) {
    await pool.query(`INSERT INTO emails (email) VALUES (?)`, [email]);
}
