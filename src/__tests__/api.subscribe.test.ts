import request from 'supertest';
import express from "express";
import apiRoute from '../routes/apiRoute';
import { deleteUser, pool } from '../database/database';

jest.mock('../controllers/emailController.ts', () => ({
    sendEmails: jest.fn()
}));

describe ('/api/subscribe test', () => {
    const app = express();
    app.use(express.json())
    app.use('/api', apiRoute.getRouter());

    const testEmail = 'veryTestEmail@gmail.com';
    test('should return 200 and added email', async () => {
        const result = await request(app).post('/api/subscribe').send({
            email: testEmail
        });
        expect( result.statusCode ).toBe(201);
    })

    test('should return 400 and Invalid email address', async () => {
        const result = await request(app).post('/api/subscribe').send({
            email: 'o@opsgu@gmail.com'
        });
        expect( result.statusCode ).toBe(400);
    })

    test('should return 400 and Email already subscribed', async () => {
        const result = await request(app).post('/api/subscribe').send({
            email: 'oopsgu2006@gmail.com'
        });
        expect( result.statusCode ).toBe(400);
    })

    afterAll(async () => {
        await deleteUser(testEmail);
        await pool.end();
    });
})