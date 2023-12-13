// Where you start the server
import app from './app';
const PORT: number =  5000;
const HOST: string = 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`server running on at http://${HOST}:${PORT}`)});