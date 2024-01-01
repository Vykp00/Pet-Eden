// Setting up User Logout API
// External Dependencies
import express,{ Request, Response, NextFunction, response }  from 'express';
import { Collection, ObjectId } from 'mongodb';
import User from '../models/user';  
import { connectToServer, findObjectFromDB } from '../db/services.db';
import * as dotenv from 'dotenv';

// JWT Token
import jwt from 'jsonwebtoken';
// Express-Validator
import requestValidator from '../middlewares/validator';
import { matchedData }from 'express-validator';
import { logInSchema } from '../models/schema/user.schema';

// Bcrypt
import * as bcrypt from 'bcrypt';
import { USession } from '../middlewares/auth/userSession';

// Global Config
const router: express.Router = express.Router();

// MOCK CODE
// DELETE /api/v1/logout
router.delete('/logout', (req: Request, res: Response) => {
    if (req.session.id) {
      req.session.destroy(err => {
        if (err) {
          return res.status(400).send('Unable to log out')
        } else {
            // Redirect User to home page
          return res.status(302).redirect('/')
        }
      });
    } else {
      res.end()
    }
  })
export default router;