// Setting up API router for authentication
// External Dependencies
import express,{ Router, Request, Response }  from "express";

import registerApi from './register.api'
import loginApi from './login.api'

const router: express.Router = express.Router();

// Handle Registration API
router.use(registerApi);

// Handle Login API
router.use(loginApi);

export default router;