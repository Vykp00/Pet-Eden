import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();

// External Dependencies
import * as dotenv from 'dotenv';
import cors from "cors";
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';

// Server-side Session with Redis
import session from 'express-session';
import RedisStore from "connect-redis";
import {createClient} from "redis";
import * as uuid from 'uuid';

// Internal Dependencies
import api from './api/app.api';
import * as middlewares from './middlewares/middlewares'
import index from './main/index.main'
import { jwtPassportStrategy } from './middlewares/auth/passport';
import { ObjectId } from 'mongodb';
import { USession } from './middlewares/auth/userSession';

// Setting various HTTP headers, act as silver bullet
app.use(helmet());

// HTTP request logger for NodeJS
app.use(morgan('dev'));

// Allow CORS Middleware
app.use(cors<Request>());

//Get dotenv
dotenv.config({path: './config.env'});
const SESSION_SECRET_KEY: string = process.env.SESSION_SECRET_KEY || 'My-Session-Secret-Key';

// --- REDIS SESSION ---

// If Server is behind proxy (e.g. nginx) and deployed to production with secure: true
// app.set('trust proxy', 1) // trust first proxy

// Initialize Redis client.
export let redisClient = createClient() // This connects to localhost on port 6379. 
// To connect to different host set { url: 'redis[s]://[[username][:password]@][host][:port][/db-number]' } in createClient()
redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.connect().catch(console.error)

// Initialize Redis store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "sess:", // Key prefix in Redis (default: sess:)
})
// Generation unique session ID with userID. It's useful when user have multiple session (logged in with multiple devices) and we can track it
function genuuid() {
  //const userEmail: string = req.body.usrEmail || ' ';
  //const encodedUserEmail: string = Buffer.from(userEmail).toString('base64');
  const newUUID : string = crypto.randomUUID(); // UUID used crypto in their native.js anyway. 
  //const genUUID : string = `${encodedUserEmail}:${newUUID}` // Return base64 encoding of a UUID. 10 character smaller normal UUID for space efficient
  return newUUID
}
// Initialize sesssion storage.
app.use(
  session({
    genid: function() {
      console.log("New session id created");
      return genuuid() // use UUIDs and crypto for session IDs
    },
    store: redisStore,
    resave: false, // Required: force lightweight session keep alive (touch).
    saveUninitialized: false, // Recommended: only save session when data exists
    secret: SESSION_SECRET_KEY,
    cookie: {
      secure: false, // false only for dev; If true: only transmit cookie over https
      httpOnly: true, // If true: compliant clients will not allow client-side JavaScript to see the cookie in document.cookie.
      maxAge: 1000 * 60 * 30 // Session Max Age in miliseconds. Set in 30 minutes 
    }
  })
)

// Apply our JWT strategy to passport
//jwtPassportStrategy(passport);

// add express.json middleware to get req.body
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(passport.initialize());


//app.use('/', index);

// Define a GET route for "/"
app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello World');
});

// Define version API route for authentication
app.use('/api/v1', api);        

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;