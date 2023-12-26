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
    (0, globals_1.afterEach)(() => {
        // restore all Mock
        globals_1.jest.restoreAllMocks();
    });
    (0, globals_1.test)('Should connect to MongoDB', () => __awaiter(void 0, void 0, void 0, function* () {
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
globals_1.jest.mock('../db/services.db');
(0, globals_1.describe)('Test usage functions with Users collection on MongoDB test-users ', () => {
    // Define global mock users
    let mockUser = {
        usrEmail: 'john.test@gmail.com',
        usrPassword: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        fullName: 'Max test',
        usrAge: 3,
        usrGender: 'male',
        usrCategory: "Dog",
        imgUrl: 'http://someurl.png'
    };
    (0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // Restore all Mock implementation after each test
        globals_1.jest.restoreAllMocks();
        // Delete all test database with matched "test"
        yield (yield (0, services_db_1.connectToServer)('test-users')).deleteMany({ fullName: { $regex: "test" } });
        // Close MongoDB connection
        yield ((_a = conn_db_1.default.connection) === null || _a === void 0 ? void 0 : _a.close());
    }));
    (0, globals_1.test)('connectToServe() should successfully insert a user document into the "test-users" collection', () => __awaiter(void 0, void 0, void 0, function* () {
        // Connect to 'test-users' collection and insert mockUser
        const userCollection = yield (0, services_db_1.connectToServer)('test-users');
        // Use SpyOn to catch mockfunction implementation
        const mockConectToServer = globals_1.jest.spyOn(userCollection, 'insertOne');
        const result = yield userCollection.insertOne(mockUser);
        // Expect the mock function was called with the correct collection 'test-users'
        (0, globals_1.expect)(mockConectToServer).toHaveBeenCalled();
        // Expect that the insertOne method/function on the mock function was called with correct document 'mockUser'
        (0, globals_1.expect)(userCollection.insertOne).toHaveBeenCalledWith(mockUser);
        // Expect that the result from insertOne have expected acknowledged as true
        (0, globals_1.expect)(result.acknowledged).toEqual(true);
    }));
    (0, globals_1.test)('findObjectFromDB() should return True if existing User was found', () => __awaiter(void 0, void 0, void 0, function* () {
        const searchQuery = { usrEmail: 'john.test@gmail.com' };
        // Connect to 'test-users' collection and find userEmail
        const result = yield (0, services_db_1.findObjectFromDB)('test-users', searchQuery);
        console.log(result);
        // Expect the result from the function to return True
        (0, globals_1.expect)(result).toEqual(true);
    }));
    (0, globals_1.test)('findObjectFromDB() should return False if existing User was NOT found', () => __awaiter(void 0, void 0, void 0, function* () {
        const searchQuery = { usrEmail: 'amy.test@gmail.com' };
        // Connect to 'test-users' collection and find userEmail
        const result = yield (0, services_db_1.findObjectFromDB)('test-users', searchQuery);
        console.log(result);
        // Expect the result from the function to return True
        (0, globals_1.expect)(result).toEqual(false);
    }));
});
