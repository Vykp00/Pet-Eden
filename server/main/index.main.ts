// This is where logIN User will fisrly see other Profile cards to like and dislike the profile
// External Dependencies
import express,{ Request, Response, NextFunction }  from 'express';

// Passport Middleware
import passport from 'passport';
import *  as passportJwt from 'passport-jwt';
import jwt from 'jsonwebtoken';

// Global Config
const router: express.Router = express.Router();


// Handle main page GET /. Use Passport to authenticate user Token
router.get('/', passport.authenticate('jwt', { session: false}),
    function (req: Request, res: Response) {
        // If Session turn True. Respond with Found User
        res.status(200).send('Welcome Back! Session Found')
})

/*
router.get('/', function(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', function(err: unknown, user: any) {
        if (err) { return next(err) }
        if (!user) { return res.status(401).send('Please login') }
        res.status(200).send('Welcome Back! Session Found');
    })(req, res, next);
});
*/
/*
function(req, res, next) {
    passport.authenticate('local', function(err, user, info, status) {
      if (err) { return next(err) }
      if (!user) { return res.redirect('/signin') }
      res.redirect('/account');
    })(req, res, next);
  });
*/
export default router;