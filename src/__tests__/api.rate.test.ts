import express from "express";
import apiRoute from '../routes/apiRoute';
import { pool } from '../database/database';
import rateController from '../controllers/rateController';

jest.mock('../controllers/emailController.ts', () => ({
    sendEmails: jest.fn()
}));

describe ('/api/rate test', () => {
    const app = express();
    app.use(express.json())
    app.use('/api', apiRoute.getRouter());

    test('should return rate > 0', async () => {
        const rate = await rateController.getRate()
        expect(typeof rate).toBe('number')
        expect(rate).toBeGreaterThan(0)
    })

    afterAll(async () => {
        await pool.end();
    });
})
