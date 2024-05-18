import express from 'express';
import apiRoute from '../routes/apiRoute';


class App {
    private app: express.Application;

    public constructor() {
        this.app = express();
        this.useMiddlewares();
        this.useRoutes();
    }

    private useMiddlewares() {
        //Middleware to parse the body
        this.app.use(express.json());
    }

    private useRoutes() {
        // "/api" route
        this.app.use('/api', apiRoute.getRouter());
    }

    public listen(PORT: number) {
        this.app.listen(PORT, () => {
            console.log(`Listening to requests on port ${PORT}`);
        })
    }
}

export default App;