// Setting up User registration API
// External Dependencies
import express,{ Router, Request, Response }  from 'express';
import { ObjectId } from 'mongodb';
import DBManager from '../db/conn.db';
import * as mongoDB from 'mongodb';
import User from '../models/user';
import { connectToServer, findObjectFromDB } from '../db/services.db';

// Global Config
const router: express.Router = express.Router();

/*
// Trial code with DBManager Mock 
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
// Handle POST /api/v1/register to register new user
router.post('/register', async (req: Request, res: Response) => {
    console.log(req.body);
    // Select value from req.body. Prevent unwanted params
    const { usrEmail, usrPassword, fullName, usrAge, usrGender, usrCategory, imgUrl } = req.body;
    
    try {
        // Firstly, check if user already exist with findObjectFromDB()
        // Specify type for query search
        const query : { usrEmail: string } = { "usrEmail": usrEmail }
        // Specify what to show
        // Include only the 'usrEmail' in returned documents
        const alreadyExistUser = await findObjectFromDB('users', query)
            .catch(err => console.error(`Failed to find document: ${err}`));

        // If User already exist return User already exist message
        if (alreadyExistUser && alreadyExistUser.isFound == true) {
            return res.status(409).json({ message: 'Email already exists!' });
        } else {
            // Create new User
            const newUser = { usrEmail, usrPassword, fullName, usrAge, usrGender, usrCategory, imgUrl } as User;
            const result = await (await connectToServer('users')).insertOne(newUser);

            // "?" = (result) and ":" = (!result)
            result
                ? res.status(201).json({ message: 'Successfully register new user' })
                : res.status(500).json({ message: 'Failed to created new user' });
            }
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message)
    }
});

export default router;