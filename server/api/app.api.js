"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Setting up API router for authentication
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json({
        message: 'API - 👋🌎🌍🌏',
    });
});
exports.default = router;
