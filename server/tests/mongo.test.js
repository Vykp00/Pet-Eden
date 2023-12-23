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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
// Config dotenv to get variable
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: './config.env' });
// Import module database to test
const services_db_1 = require("../db/services.db");
const conn_db_1 = __importDefault(require("../db/conn.db"));
let atlasURI = process.env.ATLAS_URI || '';
(0, globals_1.describe)('Testing MongoDB', () => {
    let users;
    const mockUser = { usrEmail: 'john.test@gmail.com', usrPassword: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', fullName: 'Max', usrAge: 3, usrGender: 'male', usrCategory: "Dog", imgUrl: 'http://someurl.png' };
    (0, globals_1.afterEach)(() => {
        // restore the mockUser created with spyOn
        globals_1.jest.restoreAllMocks();
    });
    (0, globals_1.test)('Should connect to MongoDB', () => __awaiter(void 0, void 0, void 0, function* () {
        // Connect to users collection
        /*
        const users = connectToServer('users');
    
        await users.insertOne(mockUser);
    
        const insertedUser = await users.findOne({usrEmail: 'john.test@gmail.com'});
        expect(insertedUser).toEqual(mockUser);
        */
        const mockDbInstance = {
            collection: globals_1.jest.fn(),
        };
        const mockDb = globals_1.jest.fn(() => mockDbInstance);
        globals_1.jest.spyOn(conn_db_1.default, 'start').mockResolvedValueOnce();
        globals_1.jest.spyOn(conn_db_1.default, 'connection', 'get').mockReturnValue({ db: mockDb });
        yield (0, services_db_1.connectToServer)('users');
        (0, globals_1.expect)(conn_db_1.default.start).toBeCalledTimes(1);
        (0, globals_1.expect)(conn_db_1.default.connection.db).toBeCalledTimes(1);
        (0, globals_1.expect)(mockDbInstance.collection).toBeCalledWith('users');
    }));
});
