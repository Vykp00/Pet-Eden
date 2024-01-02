// Setting up User Login API
// External Dependencies
import express,{ Request, Response, NextFunction, response }  from 'express';
import User from '../../models/user';  
import { findObjectFromDB } from '../../db/services.db';
import * as dotenv from 'dotenv';

// Express-Validator
import { matchedData }from 'express-validator';

// Bcrypt
import * as bcrypt from 'bcrypt';
import { USession } from '../../middlewares/auth/userSession';

//Get dotenv
dotenv.config({path: '../config.env'});

const SECRET_KEY: string = process.env.JWT_SECRET_KEY || 'Your-Secret-Key';

// Compare input password with hashed password
// compareHashPassword is a Promise to be either resolved with the comparison result salt or rejected with an Error
async function compareHashPassword(inputPassword: string | Buffer, hash: string): Promise<boolean> {
    const compareResult: boolean = await bcrypt.compare(inputPassword, hash);

    return compareResult;
}

export default async function loginApi (req: Request, res: Response, next: NextFunction) {
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
               console.log(checkUserEmail.outdoc._id);
               (req.session as USession).userId = checkUserEmail.outdoc._id;
               (req.session as USession).usrEmail = checkUserEmail.outdoc.usrEmail;
               (req.session as USession).fullName = checkUserEmail.outdoc.fullName;
               (req.session as USession).role = checkUserEmail.outdoc.role;
               
               return res.status(200).json({ message: `Welcome ${checkUserEmail.outdoc.fullName}`, session: req.session});
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
};

export function loginCheck (req: Request, res: Response, next: NextFunction) {
    try {
        if(!req.session.id || !(req.session as USession).userId) {
            res.end()
        } else {
             // If user is already login, redirect to /
            res.status(301).redirect('/main');
        }
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message)
}}