import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();

// External Dependencies
import * as dotenv from 'dotenv';
import cors from "cors";
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';

// Internal Dependencies
import apiRouter from './routes/api';
import * as middlewares from './middlewares/middlewares'
import index from './routes/main/index.main'
// --> Server-side Session with Redis
import sessionRedis from './middlewares/session'
// --> CORS Middleware
import corsOptions from './middlewares/cors';

// If Server is behind proxy (e.g. nginx) and deployed to production with secure: true
// app.set('trust proxy', 1) // trust first proxy

// Setting various HTTP headers, act as silver bullet
app.use(helmet());

// HTTP request logger for NodeJS
app.use(morgan('dev'));

// Set up CORS Middleware
app.use('*', cors(corsOptions)); // Allow option request and headers from whitelist
app.use(cors(corsOptions));

//Get dotenv
dotenv.config({ path: './config.env' });

// --- REDIS SESSION ---
app.use(sessionRedis)


// Apply our JWT strategy to passport
//jwtPassportStrategy(passport);

// add express.json middleware to get req.body
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(passport.initialize());


app.use('/', index);
app.use('/main', index);
// Define version API route for authentication
app.use('/api/v1', apiRouter);

/*
// Define a GET route for "/"
app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello World');
});
*/

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;