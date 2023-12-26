import { Db, MongoClient } from 'mongodb';
import {jest, describe, expect, test, afterEach, afterAll} from '@jest/globals';
// Config dotenv to get variable
import * as dotenv from 'dotenv';
dotenv.config({path: './config.env'});
// Import module database to test
import { connectToServer, findObjectFromDB } from '../db/services.db';
import DBManager from "../db/conn.db";

// Import MongoDb schema model
import User from '../models/user';

let atlasURI = process.env.ATLAS_URI || '';

describe('Testing MongoDB', () => {

  afterEach (() => {
    // restore all Mock
    jest.restoreAllMocks();

  });
  
  test('Should connect to MongoDB', async () => {
    const mockDbInstance = ({
      collection: jest.fn(),
    } as unknown) as Db;
    const mockDb = jest.fn(() => mockDbInstance);
    jest.spyOn(DBManager, 'start').mockResolvedValueOnce();
    jest.spyOn(DBManager, 'connection', 'get').mockReturnValue(({ db: mockDb } as unknown) as MongoClient);
    await connectToServer('users');
    expect(DBManager.start).toBeCalledTimes(1);
    expect(DBManager.connection!.db).toBeCalledTimes(1);
    expect(mockDbInstance.collection).toBeCalledWith('users');
  }); 

});

jest.mock('../db/services.db');
describe( 'Test usage functions with Users collection on MongoDB test-users ',() => {
  // Define global mock users
  let mockUser = {
    usrEmail: 'john.test@gmail.com',
    usrPassword: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    fullName: 'Max test',
    usrAge: 3,
    usrGender: 'male',
    usrCategory: "Dog",
    imgUrl: 'http://someurl.png'} as User;

  afterAll ( async () => {
    // Restore all Mock implementation after each test
    jest.restoreAllMocks();
    // Delete all test database with matched "test"
    await (await connectToServer('test-users')).deleteMany({ fullName : { $regex: "test" }});

    // Close MongoDB connection
    await DBManager.connection?.close();
  });

  test('connectToServe() should successfully insert a user document into the "test-users" collection', async () => {

    // Connect to 'test-users' collection and insert mockUser
    const userCollection = await connectToServer('test-users');

    // Use SpyOn to catch mockfunction implementation
    const mockConectToServer = jest.spyOn(userCollection, 'insertOne')

    const result = await userCollection.insertOne(mockUser);    

    // Expect the mock function was called with the correct collection 'test-users'
    expect(mockConectToServer).toHaveBeenCalled();

    // Expect that the insertOne method/function on the mock function was called with correct document 'mockUser'
    expect(userCollection.insertOne).toHaveBeenCalledWith(mockUser);

    // Expect that the result from insertOne have expected acknowledged as true
    expect(result.acknowledged).toEqual(true);
  });

  test( 'findObjectFromDB() should return True if existing User was found', async () => {
    const searchQuery : { usrEmail: string } = { usrEmail: 'john.test@gmail.com' };
    // Connect to 'test-users' collection and find userEmail
    const result = await findObjectFromDB('test-users', searchQuery);

    console.log(result)

    // Expect the result from the function to return True
    expect(result).toEqual(true);
  });

  test( 'findObjectFromDB() should return False if existing User was NOT found', async () => {
    const searchQuery : { usrEmail: string } = { usrEmail: 'amy.test@gmail.com' };
    // Connect to 'test-users' collection and find userEmail
    const result = await findObjectFromDB('test-users', searchQuery);

    console.log(result)

    // Expect the result from the function to return True
    expect(result).toEqual(false);
  });
});