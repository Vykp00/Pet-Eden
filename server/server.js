"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Where you start the server
const app_1 = __importDefault(require("./app"));
const PORT = 5000;
const HOST = 'localhost';
app_1.default.listen(PORT, HOST, () => {
    console.log(`server running on at http://${HOST}:${PORT}`);
});
