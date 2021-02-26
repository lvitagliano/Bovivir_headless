"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var get_1 = __importDefault(require("lodash/get"));
/**
 * Magento 2: customer generateToken normalizer
 */
function normalizer(rawData) {
    var token = get_1.default(rawData, 'data.generateCustomerToken.token', null);
    return {
        token: token,
    };
}
exports.default = normalizer;
