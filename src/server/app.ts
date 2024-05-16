import express, { Request, Response } from 'express';
import { HTTP_STATUSES } from '../Utils/utils';


export const app = express();


app.get('/rate', (req : Request, res : Response) => {
    res.send('rate')
})

app.get('/subscribe', (req : Request, res : Response) => {
    res.send('subscribe')
})

app.get('/sendEmails', (req : Request, res : Response) => {
    res.send('sendEmails')
})

app.use((req: Request, res : Response) => {
    res.status(HTTP_STATUSES.NOT_FOUND_404).send('Not found');
})