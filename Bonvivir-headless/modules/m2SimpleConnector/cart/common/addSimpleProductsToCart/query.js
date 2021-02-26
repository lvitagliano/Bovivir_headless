"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cartItemProductDefaultSchema_1 = __importDefault(require("../../schemas/cartItemProductDefaultSchema"));
/**
 * Magento 2: common addSimpleProductsToCart Graph QL query
 */
var query = function (_a) {
    var cartId = _a.cartId, sku = _a.sku, _b = _a.quantity, quantity = _b === void 0 ? 1 : _b, _c = _a.cartItemProductSchema, cartItemProductSchema = _c === void 0 ? cartItemProductDefaultSchema_1.default : _c;
    return ({
        query: "\n    mutation {\n      addSimpleProductsToCart(\n        input: {\n          cart_id: \"" + cartId + "\"\n          cart_items: [\n            {\n              data: {\n                quantity: " + quantity + "\n                sku: \"" + sku + "\"\n              }\n            }\n          ]\n        }\n      ) {\n        cart {\n          items {\n            id\n            quantity\n            product {\n              " + cartItemProductSchema + "\n            }\n          }\n        }\n      }\n    }\n  ",
    });
};
exports.default = query;
