import express from 'express';
import { apiRouter } from '../routes/api';


export const app = express();

//Middleware to parse the body
app.use(express.json());

// "/api" route
app.use('/api', apiRouter);