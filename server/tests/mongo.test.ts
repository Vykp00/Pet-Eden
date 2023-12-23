import { Db, MongoClient } from 'mongodb';
import {jest, describe, expect, test, afterEach} from '@jest/globals';
// Config dotenv to get variable
import * as dotenv from 'dotenv';
dotenv.config({path: './config.env'});
// Import module database to test
import { connectToServer } from '../db/services.db';
import DBManager from "../db/conn.db";

let atlasURI = process.env.ATLAS_URI || '';

describe('Testing MongoDB', () => {
  let users: any;
  const mockUser = {usrEmail: 'john.test@gmail.com', usrPassword: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', fullName: 'Max', usrAge: 3, usrGender: 'male', usrCategory: "Dog", imgUrl: 'http://someurl.png'};

  afterEach (() => {
    // restore the mockUser created with spyOn
    jest.restoreAllMocks();
  });
  
  test('Should connect to MongoDB', async () => {
    // Connect to users collection
    /*
    const users = connectToServer('users');

    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({usrEmail: 'john.test@gmail.com'});
    expect(insertedUser).toEqual(mockUser);
    */
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