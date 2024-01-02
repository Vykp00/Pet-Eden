// Setting up API router for authentication
// External Dependencies
import express, { Router, Request, Response } from "express";

import registerApi from '../controllers/api/register.api'
import loginApi, { loginCheck } from '../controllers/api/login.api'
import logoutAPI from '../controllers/api/logout.api'
const apiRouter: express.Router = express.Router();

// Express-Validator
import requestValidator from '../middlewares/validator';
import { logInSchema } from '../models/schema/user.schema';
import { newUserSchema } from '../models/schema/user.schema';

// Handle Registration API. 
apiRouter.post('/register',
    // Use express validator Schema to validate request data. 
    newUserSchema,
    // Request validator handle
    requestValidator, registerApi);

// Handle Login API
apiRouter.post('/login',
    // Express validator Schema validate user input to login
    logInSchema,
    // Request Validator Handle
    requestValidator, loginApi);

apiRouter.get('/login', loginCheck)

// Handle Logout API
apiRouter.delete('/logout', logoutAPI);

// -- Session Authentcate Middleware from here
//router.use(sessionAuthenticator)
export default apiRouter;