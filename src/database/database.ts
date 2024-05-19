import mysql, { FieldPacket, Pool } from 'mysql2/promise';
import { User } from './utils/user';
import App from "../server/app";


// import dotenv from 'dotenv';
// dotenv.config();

class Database {
    private pool: Pool;
    private app : App;

    public constructor() {
        this.app = new App();
        /**
         * Connects to db
         */
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'user',
            password: 'password',
            database: 'dollarrateapi'
        });

        this.checkTable();
    }

    async checkTable() {
        const query = `SHOW TABLES`;
        const result: [any[], FieldPacket[]] = await this.pool.query(query);
        if (result[0].length <= 0) {
            await this.createTable();
            this.app.listen();
        } else {
            this.app.listen();
        }
    }

    /**
     * Create the emails table if it does not exist
     */
    async createTable() {
        const sql = `
            CREATE TABLE emails (
            id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
            email VARCHAR(64) NOT NULL UNIQUE
            )`;
        await this.pool.query(sql);
        console.log('Table `emails` created successfully.');
    }

    /**
     * Gets all fields of a table
     * @returns Array of user's fields
     */
    async getUsers(): Promise<User[]> {
        const result: [User[], FieldPacket[]] = await this.pool.query("SELECT * FROM emails");
        const users = result[0];
        return users;
    }

    /**
     * Adds a user to a database
     * @param email to subscribe
     */
    async addUser(email: string) {
        await this.pool.query(`INSERT INTO emails (email) VALUES (?)`, [email]);
        console.log(`Email ${email} added`)
    }


    /**
     * Deletes a user from a database(for testing))
     * @param email to subscribe
     */
    async deleteUser(email: string) {
        await this.pool.query(`DELETE FROM emails WHERE email=?`, [email]);
        console.log(`Email ${email} deleted`)
    }

}

export default new Database();