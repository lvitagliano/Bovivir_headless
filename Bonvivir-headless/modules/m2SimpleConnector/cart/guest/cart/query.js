"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cartItemProductDefaultSchema_1 = __importDefault(require("../../schemas/cartItemProductDefaultSchema"));
/**
 * Magento 2: guest cart Graph QL query
 */
var query = function (_a) {
    var cartId = _a.cartId, _b = _a.cartItemProductSchema, cartItemProductSchema = _b === void 0 ? cartItemProductDefaultSchema_1.default : _b;
    return ({
        query: "\n    {\n      cart (\n        cart_id: \"" + cartId + "\"\n      ) {\n        id\n        items {\n          id\n          quantity\n          product {\n            " + cartItemProductSchema + "\n          }\n        }\n      }\n    }\n  ",
    });
};
exports.default = query;
