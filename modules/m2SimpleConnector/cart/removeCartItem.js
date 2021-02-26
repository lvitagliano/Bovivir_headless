"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var updateCartItem_1 = __importDefault(require("./updateCartItem"));
/**
 * removeCartItem handler
 */
function removeCartItem(item, req, res) {
    return updateCartItem_1.default(item, 0, req, res);
}
exports.default = removeCartItem;
