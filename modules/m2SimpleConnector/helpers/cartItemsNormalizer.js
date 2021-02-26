"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var get_1 = __importDefault(require("lodash/get"));
function cartItemsNormalizer(items) {
    return items.map(function (item, index) {
        var product = get_1.default(item, 'product', {});
        return __assign(__assign({}, item), { id: get_1.default(item, 'id', "cart-item-" + index), quantity: get_1.default(item, 'quantity', 1), name: get_1.default(product, 'name', ''), url: "/p/" + get_1.default(product, 'url_key', '') + get_1.default(product, 'url_suffix', ''), thumbnail: {
                src: get_1.default(product, 'thumbnail.url', ''),
                type: 'image',
            }, price: get_1.default(product, 'price_range.maximum_price.final_price.value', 0), priceText: "$" + get_1.default(product, 'price_range.maximum_price.final_price.value', 0) });
    });
}
exports.default = cartItemsNormalizer;
