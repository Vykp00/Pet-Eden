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
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// External Dependencies
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = require('body-parser');
const helmet_1 = __importDefault(require("helmet"));
const morgan = require("morgan");
const app_api_1 = __importDefault(require("./api/app.api"));
// Setting various HTTP headers, act as silver bullet
app.use((0, helmet_1.default)());
// HTTP request logger for NodeJS
app.use(morgan('dev'));
// Allow CORS Middleware
app.use((0, cors_1.default)());
//Get dotenv
dotenv.config({ path: './config.env' });
// add express.json middleware to get req.body
app.use(express_1.default.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Define a GET route for "/"
app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});
// Define version API route for authentication
app.use('/api/v1', app_api_1.default);
exports.default = app;
