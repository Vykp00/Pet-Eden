// Here we need to Type declaration for req.session and Partial<SessionData> to add additional params and Session authentication
import { Request, Response, NextFunction }  from 'express';
import { Session } from "express-session";
import { ObjectId } from "mongodb";
import type { Roles } from "../../models/user";

// Declaration Extension
export interface USession extends Session {
    userId?: ObjectId;
    usrEmail?: string;
    fullName?: string;
    role?: Roles;
}

// This is a plugin middleware to check if user is authenticate or not
// all request that are plug in after this middleware will only be accessible if the user is log in
export function sessionAuthenticator (req: Request, res: Response, next: NextFunction) {
    try {
        //If no session id found, return error
        if (!req.session.id || !(req.session as USession).userId) {
            const error = new Error("You're not logged in!")
            return res.status(401).json({message: error.message})
        }
        // if token is found, continue to next function
        if (req.session.id || (req.session as USession).userId ) {
            return next()
        }
    } catch (err) {
        res.status(500).json({ message: 'Fail to authenticate, please try again later!'});
        }
    }