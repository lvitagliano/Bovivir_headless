"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSuggestions = exports.normalizeProduct = exports.fetchProduct = exports.productQuery = void 0;
var query_1 = __importDefault(require("./query"));
exports.productQuery = query_1.default;
var fetcher_1 = __importDefault(require("./fetcher"));
exports.fetchProduct = fetcher_1.default;
var normalizer_1 = __importDefault(require("./normalizer"));
exports.normalizeProduct = normalizer_1.default;
var product_1 = __importDefault(require("./product"));
var productSuggestions_1 = __importDefault(require("./productSuggestions"));
exports.productSuggestions = productSuggestions_1.default;
/**
 * Usage example (in handler):
 *
 * import { fetchProduct, normalizeProduct } from 'api/magento/product';
 * ...
 * ...
 * const rawData = await fetchProduct(productId);
 * const data = normalizeProduct(rawData);
 * ...
 * ...
 */
exports.default = product_1.default;
