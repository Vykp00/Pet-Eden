// User Token authentication with Passport Middleware. Here we config passport strategy
import * as passport from 'passport'
import * as passportJwt from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import { Strategy as JwtStrategy } from 'passport-jwt'

import jwt from 'jsonwebtoken'

// Databases
import User from '../../models/user'
import * as mongoDb from 'mongodb'
import { WithId, ObjectId } from 'mongodb'
import { connectToServer, findObjectFromDB } from '../../db/services.db'

// load variable from dotenv
import * as dotenv from 'dotenv'
dotenv.config({ path: './config.env' })
const SECRET_KEY: string = process.env.JWT_SECRET_KEY || 'Your-Secret-Key'

export const jwtPassportStrategy = (passport: any) => {
  // Define Strategy Options
  const opts: any = {}

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = SECRET_KEY
  // opts.issuer = "accounts.examplesoft.com";  // If defined the token issuer (iss) will be verified against this value.
  // opts.audience = "yoursite.net"; //  If defined, the token audience (aud) will be verified against this value.

  // This is a middleware to verify JWT Token from User local browser
  passport.use(
    new JwtStrategy(opts, async function (jwtPayload: string, done: any) {
      // TESTING - Decoded the jwtPayload
      //const plainPayload = jwtPayload.split(' ')[1];
      const decodedPayload: any = jwt.verify(jwtPayload, SECRET_KEY, {
        // Never forget to make this explicit to prevent
        // signature stripping attacks
        algorithms: ['HS256'],
      })
      // Find user based on user ID. Create query for search
      const query = { _id: new ObjectId(decodedPayload._id) }
      await findObjectFromDB('users', query),
        function (
          err: unknown,
          searchResult: {
            isFound: boolean
            outdoc?: WithId<mongoDb.BSON.Document>
          },
        ) {
          if (err) {
            // If there's an error, log error and throw false in callback
            console.error(`Failed to find user: ${err}`)
            return done(err, false)
          }
          if (searchResult.isFound == true) {
            // If User search is found, return the search result with only user email, id, fullname
            console.log('Search result from JwtPayload', searchResult)
            return done(null, searchResult)
          } else {
            // If User search is not found (isFound== false), return false
            return done(null, false)
            // or prompt to create new account
          }
        }
    }),
  )
}
