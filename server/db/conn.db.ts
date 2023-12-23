// External Dependencies
//Import MongoDb
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
// Global Variables

// Initialize Connection
// load variable from dotenv
dotenv.config({ path: './config.env' });

// Set up reusable connection to MongoDB
class DBManager {
  private atlasUri : string = process.env.ATLAS_URI || '';

  private _connection: MongoClient | null;

  constructor() {
    this._connection = null;
  }
  get connection() {
    return this._connection;
  }

  async start() {
    if (!this._connection) {
      this._connection = await MongoClient.connect(this.atlasUri);
    }
  }
  async close(){
    await new MongoClient(this.atlasUri).close()
  }
}

export default new DBManager();

/*
//When you want to reuse connection to fetch databases and collection
import DBManager from './dbManager';

export async function main() {
  await DBManager.start();
  const db = DBManager.connection!.db();
  db.collection('users');
}
*/