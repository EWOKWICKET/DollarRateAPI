import { app } from "./app";


const PORT : number = 3000;

app.listen(PORT, ()=> {
    console.log(`Listening to requests on port ${PORT}`);
})