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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Where you start the server
const app_1 = __importDefault(require("./app"));
const dotenv = __importStar(require("dotenv"));
// load variable from dotenv
dotenv.config({ path: './config.env' });
// Load database and collection
const services_db_1 = require("./db/services.db");
const port = parseInt(`${process.env.PORT}`) || 5000;
const host = process.env.HOST || 'localhost';
// Let's try connect to MongoDB
(0, services_db_1.connectToServer)('users')
    .then(() => {
    app_1.default.listen(port, host, () => {
        console.log(`server running on at http://${host}:${port}`);
    });
})
    .catch((error) => {
    console.error('Databases Connection Failed', error);
    // If it failed, stop traffic immediately
    process.exit();
});
