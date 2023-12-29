// Setting up User registration API
// External Dependencies
import express,{ NextFunction, Request, Response }  from 'express';
import User from '../models/user';
import { connectToServer, findObjectFromDB } from '../db/services.db';

// Express-Validator
import requestValidator from '../middleware/validator';
import { matchedData }from 'express-validator';
import { newUserSchema } from '../models/schema/user.schema';

// Bcrypt
import * as bcrypt from 'bcrypt';
// Global Config
const router: express.Router = express.Router();

/*
// TESTING CODE DBManager Mock 
await DBManager.start();
const db = DBManager.connection!.db();
const userCollection : mongoDB.Collection = db.collection('users')
const result = await userCollection.insertOne(newUser);
*/

/*
Mock code to check user exist and collect correct result from MongoDB
async function checkUser () {
            // Check if user already exist
        // Specify type for query search
        const query = { "usrEmail": usrEmail.value }
        // Specify what to show
        // Include only the 'usrEmail' in returned documents
        const alreadyExistUser = await usersCollection.findOne(query,
            {
            projection: { 
                _id: 0, 
                usrEmail: 1,
                usrPassword: 0 , 
                fullName: 0, 
                usrAge: 0, 
                usrGender: 0, 
                usrCatogory: 0, 
                imgUrl: 0 },
          })
          .then(result => {
            if(result) {
                console.log(`Successfully found document: ${result}.`);
            } else {
                console.log("No document matches the provided query.");
              }
              return result;
            })
            .catch(err => console.error(`Failed to find document: ${err}`));
}
*/

// Define passwordHash function

// Define Salt Round for Hashing
const saltRounds = 10;

// passwordHash is a Promise to be either resolved with the encrypted data salt or rejected with an Error
async function passwordHash(plainPassword: string | Buffer, saltRounds: number): Promise<string> {
    const salt: string | number = await bcrypt.genSalt(saltRounds);
    const hash: string = await bcrypt.hash(plainPassword, salt)

    return hash
}

// Handle POST /api/v1/register to register new user
router.post('/register',
    // Use express validator Schema to validate request data
    newUserSchema,
    // Request validator handle
    requestValidator,
    async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request to api/v1/register: ${req.body}`);
    try {
        // Select value from validator Schema Prevent unwanted params. Use 'includeOptional to add optional data as undefined
        const { usrEmail, usrPassword, fullName, usrAge, usrGender, usrCategory, imgUrl } = matchedData(req, { includeOptionals: true});
        // Firstly, check if user already exist with findObjectFromDB()
        // Specify type for query search
        const query : { usrEmail: string } = { "usrEmail": usrEmail }
        console.log(`Expected email: ${query}`)
        // Specify what to show 
        // Include only the 'usrEmail' in returned documents
        const alreadyExistUser = await findObjectFromDB('users', query)
            .catch(err => console.error(`Failed to find document: ${err}`));
        
        // If User doesn't exist yet. Hash password and create new user
        if (alreadyExistUser && alreadyExistUser.isFound == false) {
            const newUser = { usrEmail, usrPassword, fullName, usrAge, usrGender, usrCategory, imgUrl } as User;
            // Hash Password with passswordHash()
            const hashUserPassword = await passwordHash(usrPassword, saltRounds)
                .catch(err => console.error(`Failed to Hash Password: ${err}`));

            if (hashUserPassword) {
                // Store hashpassword to DB
                newUser.usrPassword = hashUserPassword;
                const result = await (await connectToServer('users')).insertOne(newUser)
                    .catch(err => console.error(`Failed to find document: ${err}`));

            // "?" = (result) and ":" = (!result)
            result
                ? res.status(201).json({ message: 'Successfully register new user' })
                : res.status(500).json({ message: 'Failed to created new user' });
            } else {
                res.status(500).json({ message: 'Fail to create new user. Hash is broken'})
            }
            
        } else {
            // If User already exist return User already exist message
            return res.status(409).json({ message: 'Email already exists!' });
        }
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message)
    }
});

export default router;