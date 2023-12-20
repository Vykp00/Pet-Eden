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
const { MongoClient } = require('mongodb');
const globals_1 = require("@jest/globals");
// Config dotenv to get variable
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: './config.env' });
let atlasURI = process.env.ATLAS_URI || '';
(0, globals_1.describe)('Testing MongoDB', () => {
    let connection;
    let db;
    (0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        connection = yield MongoClient.connect(atlasURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = yield connection.db();
    }));
    (0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.close();
    }));
    (0, globals_1.test)('Should find blog_data databases', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = db.collection('users');
        const mockUser = { _id: 'some-user-id', name: 'John' };
        yield users.insertOne(mockUser);
        const insertedUser = yield users.findOne({ _id: 'some-user-id' });
        (0, globals_1.expect)(insertedUser).toEqual(mockUser);
    }));
});
