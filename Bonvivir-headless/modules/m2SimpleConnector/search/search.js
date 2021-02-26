"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var subcategory_1 = __importDefault(require("../subcategory/subcategory"));
function search(params, req, res) {
    return subcategory_1.default(params, req, res);
}
exports.default = search;
