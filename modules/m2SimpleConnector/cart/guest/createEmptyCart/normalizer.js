"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var get_1 = __importDefault(require("lodash/get"));
/**
 * Magento 2: guest createEmptyCart normalizer
 */
function normalizer(rawData) {
    var guestCartId = get_1.default(rawData, 'data.createEmptyCart', null);
    return guestCartId;
}
exports.default = normalizer;
