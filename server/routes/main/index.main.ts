// This is where logIN User will fisrly see other Profile cards to like and dislike the profile
// External Dependencies
import express,{ Request, Response, NextFunction }  from 'express';

// Session
import { sessionAuthenticator } from '../../middlewares/auth/userSession';
// Global Config
const router: express.Router = express.Router();

// Handle main page GET /main. Use Passport to authenticate user Token
router.get('/', function (req: Request, res: Response) {
  res.status(200).send('Welcome Guest')
})

// Handle main page GET /main. Use Passport to authenticate user Token
router.get('/main', sessionAuthenticator, function (req: Request, res: Response) {
  // If Session turn True. Respond with Found User
  res.status(200).send('Welcome Back! Session Found')
})

export default router;