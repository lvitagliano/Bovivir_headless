"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var get_1 = __importDefault(require("lodash/get"));
/**
 * Magento 2: customer revokeToken normalizer
 */
function normalizer(rawData) {
    var result = get_1.default(rawData, 'data.revokeCustomerToken.result', false);
    return {
        result: result,
    };
}
exports.default = normalizer;
