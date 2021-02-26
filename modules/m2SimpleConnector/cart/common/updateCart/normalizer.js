"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var get_1 = __importDefault(require("lodash/get"));
var cartItemsNormalizer_1 = __importDefault(require("../../../helpers/cartItemsNormalizer"));
/**
 * Magento 2: common updateCart normalizer
 */
function normalizer(rawData) {
    var rawCartData = get_1.default(rawData, 'data.updateCartItems.cart', null);
    var items = cartItemsNormalizer_1.default(get_1.default(rawCartData, 'items', []));
    return {
        cart: {
            items: items,
        },
    };
}
exports.default = normalizer;
