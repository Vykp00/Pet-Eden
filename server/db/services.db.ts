// Here lies all starter functions with MongoDB.DB
import { WithId } from 'mongodb'
import * as mongoDb from 'mongodb'
import DBManager from './conn.db'

// This connect to certain collection on Server
export async function connectToServer(coll_name: string) {
  await DBManager.start()
  const db: mongoDb.Db = DBManager.connection!.db('app_data')
  const coll: mongoDb.Collection<mongoDb.BSON.Document> =
    db.collection(coll_name)
  console.log(
    `Successfully connect to test databases and collection ${coll_name}`,
  )

  return coll
}

// This find an object from selected collections in the databases.
// THe Promise return True if the object already exists with the Object; and False if it doesn't or an Error
export async function findObjectFromDB(
  coll_name: string,
  query: any,
): Promise<{ isFound: boolean; outdoc?: WithId<mongoDb.BSON.Document> }> {
  // Check if the search document already exist
  console.log('Received query', query)

  // Specify what to show
  //var searchResult: { isFound: boolean; outdoc?: WithId<mongoDb.BSON.Document>;} = { isFound: false };

  // Include only the Object in returned documents
  const searchObject = await (await connectToServer(coll_name)).findOne(query)
  /*
    .then(result => {
      if(result) {
        // If the query was found, return true with object id
          console.log(`Successfully found document: ${result._id}.`);
          searchResult = { isFound: true, outdoc: result };
      } else {
        // If the query was not found, return false
          console.log("No document matches the provided query.");
        }
        return searchResult;
      })
      .catch(err => console.error(`Failed to find document: ${err}`));
      console.log(searchResult);
  return searchResult;
      */
  if (searchObject) {
    const searchResult: {
      isFound: boolean
      outdoc: WithId<mongoDb.BSON.Document>
    } = { isFound: true, outdoc: searchObject }
    console.log('Search result from findObjectFromDB:', searchResult)
    return searchResult
  } else {
    const searchResult: {
      isFound: boolean
      outdoc?: WithId<mongoDb.BSON.Document>
    } = { isFound: false }
    return searchResult
  }
}
