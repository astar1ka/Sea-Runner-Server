"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Manager_1 = __importDefault(require("../Manager"));
class GameManager extends Manager_1.default {
    constructor(options) {
        super(options);
    }
}
exports.default = GameManager;
