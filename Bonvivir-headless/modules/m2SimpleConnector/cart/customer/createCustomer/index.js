"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeCreateCustomer = exports.fetchCreateCustomer = exports.createCustomerQuery = void 0;
var query_1 = __importDefault(require("./query"));
exports.createCustomerQuery = query_1.default;
var fetcher_1 = __importDefault(require("./fetcher"));
exports.fetchCreateCustomer = fetcher_1.default;
var normalizer_1 = __importDefault(require("./normalizer"));
exports.normalizeCreateCustomer = normalizer_1.default;
