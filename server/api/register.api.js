"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Setting up User registration API
// External Dependencies
const express_1 = __importDefault(require("express"));
const services_db_1 = require("../db/services.db");
// Global Config
const router = express_1.default.Router();
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
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    // Select value from req.body. Prevent unwanted params
    const { usrEmail, usrPassword, fullName, usrAge, usrGender, usrCategory, imgUrl } = req.body;
    try {
        // Get User collection
        const usersCollection = yield (0, services_db_1.connectToServer)('users');
        // Check if user already exist
        // Specify type for query search
        console.log(usrEmail);
        const query = { "usrEmail": usrEmail };
        // Specify what to show
        // Include only the 'usrEmail' in returned documents
        const alreadyExistUser = yield usersCollection.findOne(query)
            .then(result => {
            if (result) {
                console.log(`Successfully found document: ${result.usrEmail}.`);
            }
            else {
                console.log("No document matches the provided query.");
            }
            return result;
        })
            .catch(err => console.error(`Failed to find document: ${err}`));
        console.log(`Founded User: ${alreadyExistUser}`);
        // If User already exist return User already exist message
        if (alreadyExistUser) {
            return res.json({ message: 'User is already exist!' });
        }
        else {
            // Create new User
            const newUser = { usrEmail, usrPassword, fullName, usrAge, usrGender, usrCategory, imgUrl };
            const result = yield usersCollection.insertOne(newUser);
            // "?" = (result) and ":" = (!result)
            result
                ? res.status(201).send(`Successfully created new user with id ${result.insertedId}`)
                : res.status(500).send('Failed to created new User');
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
exports.default = router;
