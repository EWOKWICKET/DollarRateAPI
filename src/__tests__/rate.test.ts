import request from 'supertest';
import express from "express";
import apiRoute from '../routes/apiRoute';
import {  pool } from '../database/database';

jest.mock('../controllers/emailController.ts', () => ({
    sendEmails: jest.fn()
}));

describe ('/api/rate test', () => {
    const app = express();
    app.use(express.json())
    app.use('/api', apiRoute.getRouter());

    test('should return status 200', async () => {
        const result = request(app).get('/api/rate');
        expect((await result).statusCode).toBe(200);
    })

    afterAll(async () => {
        await pool.end();
    });
})