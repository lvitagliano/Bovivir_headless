"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var get_1 = __importDefault(require("lodash/get"));
var cartItemsNormalizer_1 = __importDefault(require("../../../helpers/cartItemsNormalizer"));
/**
 * Magento 2: customer cart normalizer
 */
function normalizer(rawData) {
    var rawCartData = get_1.default(rawData, 'data.customerCart', null);
    var customerCartId = get_1.default(rawCartData, 'id', null);
    var items = cartItemsNormalizer_1.default(get_1.default(rawCartData, 'items', []));
    return {
        customerCartId: customerCartId,
        cart: {
            items: items,
        },
    };
}
exports.default = normalizer;
