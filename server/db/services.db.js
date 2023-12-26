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
exports.findObjectFromDB = exports.connectToServer = void 0;
const conn_db_1 = __importDefault(require("./conn.db"));
// This connect to certain collection on Server
function connectToServer(coll_name) {
    return __awaiter(this, void 0, void 0, function* () {
        yield conn_db_1.default.start();
        const db = conn_db_1.default.connection.db('app_data');
        const coll = db.collection(coll_name);
        console.log(`Successfully connect to test databases and collection ${coll_name}`);
        return coll;
    });
}
exports.connectToServer = connectToServer;
// This find an object from selected collections in the databases. Return True if the object already exists and False if it doesn't
function findObjectFromDB(coll_name, query) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if the search document already exist
        console.log(query);
        // Specify what to show
        // Include only the 'usrEmail' in returned documents
        const searchObject = yield (yield connectToServer(coll_name)).findOne(query);
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
            return true;
        }
        else {
            return false;
        }
    });
}
exports.findObjectFromDB = findObjectFromDB;
