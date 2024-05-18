import mysql, { FieldPacket } from 'mysql2';
import path from 'path'
import { User } from './utils/user';

import dotenv from 'dotenv';
dotenv.config({ path: path.resolve('./src/database/utils/.env') });


/**
 * Connects to db .env vars are in 'out/database/.env'
 */
export const pool = mysql.createPool({
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
    console.log(`Email ${email} added`)
}


/**
 * Deletes a user from a database
 * @param email to subscribe
 */
export async function deleteUser(email: string) {
    await pool.query(`DELETE FROM emails WHERE email=?`, [email]);
    console.log(`Email ${email} deleted`)
}

