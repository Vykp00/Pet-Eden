// Where you start the server
import app from './app';
import * as dotenv from 'dotenv';
// load variable from dotenv
dotenv.config({ path: './config.env' });

// Load database and collection
import { connectToServer } from './db/services.db';
import { error } from 'console';

const port: number =  parseInt(`${process.env.PORT}`) || 5000;
const host: string = process.env.HOST || 'localhost';

// Let's try connect to MongoDB
connectToServer('users')
    .then(() => {
        app.listen(port, host, () => {
            console.log(`server running on at http://${host}:${port}`)
        });
    })
    .catch((error: Error) => {
        console.error('Databases Connection Failed', error);
        // If it failed, stop traffic immediately
        process.exit();
    });
