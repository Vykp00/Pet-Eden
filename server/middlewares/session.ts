// Here lies Session Middleware controller
// External Dependencies
import session from 'express-session';
import * as dotenv from 'dotenv';

// Internal Dependencies
import RedisStore from "connect-redis";
import redisClient from '../db/redis.db'

// ---Get dotenv
dotenv.config({ path: './config.env' });
const SESSION_SECRET_KEY: string = process.env.SESSION_SECRET_KEY || 'My-Session-Secret-Key';

// Initialize Redis store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "sess:", // Key prefix in Redis (default: sess:)
})
// Generation unique session ID with userID. It's useful when user have multiple session (logged in with multiple devices) and we can track it
function genuuid() {
  //const userEmail: string = req.body.usrEmail || ' ';
  //const encodedUserEmail: string = Buffer.from(userEmail).toString('base64');
  const newUUID: string = crypto.randomUUID(); // UUID used crypto in their native.js anyway. 
  //const genUUID : string = `${encodedUserEmail}:${newUUID}` // Return base64 encoding of a UUID. 10 character smaller normal UUID for space efficient
  return newUUID
}

// This is our session module for Redis
let sessionRedis = session({
  genid: function () {
    console.log("New session id created");
    return genuuid() // use UUIDs and crypto for session IDs
  },
  store: redisStore,
  resave: false, // Required: force lightweight session keep alive (touch).
  saveUninitialized: false, // Recommended: only save session when data exists
  secret: SESSION_SECRET_KEY,
  name: 'sessionID', // Recommended: for security. Otherwise node will rename it based on what session you used (i.e Redis)
  cookie: {
    secure: false, // false only for dev; If true: only transmit cookie over https
    httpOnly: true, // If true: compliant clients will not allow client-side JavaScript to see the cookie in document.cookie.
    maxAge: 1000 * 60 * 30, // Session Max Age in miliseconds. Set in 30 minutes
    // explicitly set cookie to lax to make sure that all cookies accept it. Never use none anyway
    sameSite: 'lax',
  }
})

export default sessionRedis;