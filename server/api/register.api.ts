// Setting up User registration API
// External Dependencies
import express,{ Router, Request, Response }  from 'express';
import { ObjectId } from 'mongodb';
import DBManager from '../db/conn.db';
import * as mongoDB from 'mongodb';
import User from '../models/user';
import { connectToServer } from '../db/services.db';

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
router.post('/register', async (req: Request, res: Response) => {
    console.log(req.body);
    // Select value from req.body. Prevent unwanted params
    const { usrEmail, usrPassword, fullName, usrAge, usrGender, usrCategory, imgUrl } = req.body;
    
    try {
        // Get User collection
        const usersCollection = await connectToServer('users');
        
        // Check if user already exist
        // Specify type for query search
        console.log(usrEmail)
        const query : { usrEmail: string } = { "usrEmail": usrEmail }
        // Specify what to show
        // Include only the 'usrEmail' in returned documents
        const alreadyExistUser = await usersCollection.findOne(query)
          .then(result => {
            if(result) {
                console.log(`Successfully found document: ${result.usrEmail}.`);
            } else {
                console.log("No document matches the provided query.");
              }
              return result;
            })
            .catch(err => console.error(`Failed to find document: ${err}`));
        console.log(`Founded User: ${alreadyExistUser}`)

        // If User already exist return User already exist message
        if (alreadyExistUser) {
            return res.json({ message: 'User is already exist!'});
        } else {
            // Create new User
            const newUser = { usrEmail, usrPassword, fullName, usrAge, usrGender, usrCategory, imgUrl } as User;
            const result = await usersCollection.insertOne(newUser);

            // "?" = (result) and ":" = (!result)
            result
                ? res.status(201).send(`Successfully created new user with id ${result.insertedId}`)
                : res.status(500).send('Failed to created new User');
            }
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message)
    }
});

export default router;