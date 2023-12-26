import DBManager from './conn.db';

// This connect to certain collection on Server
export async function connectToServer(coll_name: string) {
  await DBManager.start();
  const db = DBManager.connection!.db('app_data');
  const coll = db.collection(coll_name);
  console.log(`Successfully connect to test databases and collection ${coll_name}`)

  return coll
}

// This find an object from selected collections in the databases. Return True if the object already exists and False if it doesn't
export async function findObjectFromDB(coll_name: string, query: any) {
  // Check if the search document already exist
  console.log(query)
  // Specify what to show

  // Include only the 'usrEmail' in returned documents
  const searchObject = await (await connectToServer(coll_name)).findOne(query)
  /*
    .then(result => {
      if(result) {
        // If the query was found, return true with object id
          console.log(`Successfully found document: ${result._id}.`);
      } else {
        // If the query was not found, return false
          console.log("No document matches the provided query.");
        }
        return result;
      })
      .catch(err => console.error(`Failed to find document: ${err}`));
    */
  if (searchObject) {
    return true
  } else {
    return false
  }
}