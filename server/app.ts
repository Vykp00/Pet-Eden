import express, { Application, Request, Response } from 'express';
const app: Application = express();
// External Dependencies
import * as dotenv from 'dotenv';
import cors from "cors";
const bodyParser = require('body-parser');
import helmet from 'helmet';
import morgan from 'morgan';
import api from './api/app.api';
// Setting various HTTP headers, act as silver bullet
app.use(helmet());

// HTTP request logger for NodeJS
app.use(morgan('dev'));

// Allow CORS Middleware
app.use(cors<Request>());

//Get dotenv
dotenv.config({path: './config.env'});

// add express.json middleware to get req.body
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a GET route for "/"
app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello World');
});

// Define version API route for authentication
app.use('/api/v1', api);


export default app;