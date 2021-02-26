"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var get_1 = __importDefault(require("lodash/get"));
/**
 * Magento 2: createCustomer normalizer
 */
function normalizer(rawData) {
    var rawCustomerData = get_1.default(rawData, 'data.createCustomer.customer', null);
    var firstName = get_1.default(rawCustomerData, 'firstname', null);
    var lastName = get_1.default(rawCustomerData, 'lastname', null);
    var isSubscribed = get_1.default(rawCustomerData, 'is_subscribed', null);
    return {
        account: {
            firstName: firstName,
            lastName: lastName,
            isSubscribed: isSubscribed,
        },
    };
}
exports.default = normalizer;
