import DBManager from './conn.db';

// This connect to certain collection on Server
export async function connectToServer(coll_name: string) {
  await DBManager.start();
  const db = DBManager.connection!.db('tests');
  db.collection(coll_name);
  console.log(`Successfully connect to test databases and collection ${coll_name}`)
}