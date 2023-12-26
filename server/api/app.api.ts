// Setting up API router for authentication
import express,{ Router, Request, Response }  from "express";

import registerApi from './register.api'

const router: express.Router = express.Router();

router.use(registerApi);

export default router;