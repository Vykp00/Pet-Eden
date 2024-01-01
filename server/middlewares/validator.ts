// Setting up Validator Middleware
// External Dependencies
import { Request, Response, NextFunction }  from 'express';
import { validationResult } from 'express-validator';
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
export default async function requestValidator (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        // Optional: Add Error Handle Middleware
      return next();
    }

    // To catch error message message = res.body.errors[0].msg
    res.status(422).json({ errors: errors.array() });
}