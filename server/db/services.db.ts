import DBManager from './conn.db';
import * as mongoDB from 'mongodb';

export const collections : { users?: mongoDB.Collection} = {}

// This connect to certain collection on Server
export async function connectToServer(coll_name: string) {
  await DBManager.start();
  const db = DBManager.connection!.db('app_data');
  const coll = db.collection(coll_name);
  console.log(`Successfully connect to test databases and collection ${coll_name}`)

  return coll
}