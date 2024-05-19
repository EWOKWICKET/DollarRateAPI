import express from 'express';
import apiRoute from '../routes/apiRoute';

import dotenv from 'dotenv';
dotenv.config();

class App {
    private app: express.Application;

    public constructor() {
        this.app = express();
        this._useMiddlewares();
        this._useRoutes();
    }

    private _useMiddlewares() {
        //Middleware to parse the body
        this.app.use(express.json());
    }

    private _useRoutes() {
        // "/api" route
        this.app.use('/api', apiRoute.getRouter());
    }

    public listen() {
        const PORT = process.env.PORT || 3000;
        this.app.listen(PORT, () => {
            console.log(`Listening to requests on port ${PORT}`);
            apiRoute.sendEmails();
        })
    }
}

export default App;