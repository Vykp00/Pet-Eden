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
exports.connectToServer = exports.collections = void 0;
const conn_db_1 = __importDefault(require("./conn.db"));
exports.collections = {};
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
