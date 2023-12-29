// Setting up User registration API
// External Dependencies
import express,{ Request, Response, NextFunction, response }  from 'express';
import { Collection, ObjectId } from 'mongodb';
import User from '../models/user';
import { connectToServer, findObjectFromDB } from '../db/services.db';
import * as dotenv from 'dotenv';

// JWT Token
import jwt from 'jsonwebtoken';
// Express-Validator
import requestValidator from '../middleware/validator';
import { matchedData }from 'express-validator';
import { logInSchema } from '../models/schema/user.schema';

// Bcrypt
import * as bcrypt from 'bcrypt';

// Global Config
const router: express.Router = express.Router();

//Get dotenv
dotenv.config({path: '../config.env'});

const SECRET_KEY: string = process.env.JWT_SECRET_KEY || 'Your-Secret-Key';

// Compare input password with hashed password
// compareHashPassword is a Promise to be either resolved with the comparison result salt or rejected with an Error
async function compareHashPassword(inputPassword: string | Buffer, hash: string): Promise<boolean> {
    const compareResult: boolean = await bcrypt.compare(inputPassword, hash);

    return compareResult;
}

router.post('/login',
    // Express validator Schema validate user input to login
    logInSchema,
    // Request Validator Handle
    requestValidator,
    async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Select value from req from validator Schema. Prevent unwanted params
        const { usrEmail, usrPassword } = matchedData(req) as User;
        
        // Specify type for query search
        const query : { usrEmail: string } = { "usrEmail": usrEmail}

        // Check if user Email is correct. isFound will return true if email are found.
        // The Promise return the Founded object in outdoc: {}
        const checkUserEmail = await findObjectFromDB('users', query)
            .catch(err => console.error(`Failed to find user: ${err}`));
    
        // If User email exists in databases and return data is received. Check password
        if (checkUserEmail && checkUserEmail.outdoc && checkUserEmail.isFound == true) {
            // Compare passhword with hashPassword from DB
            // The Promise return boolean value
            const checkUsrPassword = await compareHashPassword(usrPassword, checkUserEmail.outdoc.usrPassword)
                .catch(err => console.error(`Failed to verify password: ${err}`));
            
            if (checkUsrPassword == true) {
                // If Password match, Create JWT and let User login
                const jwttoken = jwt.sign({_id: checkUserEmail.outdoc._id?.toString(), usrEmail: checkUserEmail.outdoc.usrEmail, fullName: checkUserEmail.outdoc.fullName}, SECRET_KEY, {
                    algorithm: 'HS256',
                    expiresIn: '1 days'
                });
                const userName: string = checkUserEmail.outdoc.fullName
                return res.status(200).json({message: `Welcome back ${userName}`, token: jwttoken }, )
            } else {
                // If Password does not match DB, return email or password incorrect with 422 - Unprocessable Entity
                return res.status(422).json({ message: 'Email or passsword is incorrect, please try again!' });
            }
        } else {
            // If User is not found, return email or password incorrect with 422 - Unprocessable Entity
            return res.status(422).json({ message: 'Email or passsword is incorrect, please try again!' }); 
        }

    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message)
    }
});

export default router;