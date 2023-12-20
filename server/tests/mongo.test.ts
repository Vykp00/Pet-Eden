const {MongoClient} = require('mongodb');
import { describe, expect, test, beforeAll, afterAll} from '@jest/globals';
// Config dotenv to get variable
import * as dotenv from 'dotenv';
dotenv.config({path: './config.env'});

let atlasURI = process.env.ATLAS_URI || '';
describe('Testing MongoDB', () => {
  let connection: any;
  let db: any;

  beforeAll(async () => {
    connection = await MongoClient.connect(atlasURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });
  
  test('Should find blog_data databases', async () => {
    const users = db.collection('users');

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
});