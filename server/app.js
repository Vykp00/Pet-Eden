"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require('body-parser');
const app = (0, express_1.default)();
// add express.json middleware to get req.body
app.use(express_1.default.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Define a GET route for "/"
app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});
exports.default = app;
