"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// External Dependencies
//Import MongoDb
const mongodb_1 = require("mongodb");
const dotenv = __importStar(require("dotenv"));
// Global Variables
// Initialize Connection
// load variable from dotenv
dotenv.config({ path: './config.env' });
class DBManager {
    constructor() {
        this.atlasUri = process.env.ATLAS_URI || '';
        this._connection = null;
    }
    get connection() {
        return this._connection;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._connection) {
                this._connection = yield mongodb_1.MongoClient.connect(this.atlasUri);
            }
        });
    }
}
exports.default = new DBManager();
/*
//When you want to reuse connection to fetch databases and collection
import DBManager from './dbManager';

export async function main() {
  await DBManager.start();
  const db = DBManager.connection!.db();
  db.collection('users');
}
*/ 
