"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeSubcategory = exports.fetchSubcategory = exports.subcategoryQuery = void 0;
var query_1 = __importDefault(require("./query"));
exports.subcategoryQuery = query_1.default;
var fetcher_1 = __importDefault(require("./fetcher"));
exports.fetchSubcategory = fetcher_1.default;
var normalizer_1 = __importDefault(require("./normalizer"));
exports.normalizeSubcategory = normalizer_1.default;
var subcategory_1 = __importDefault(require("./subcategory"));
/**
 * Usage example (in handler):
 *
 * import { fetchSubcategory, normalizeSubcategory } from 'api/magento/subcategory';
 * ...
 * ...
 * const rawData = await fetchSubcategory({ categoryId });
 * const { id, name } = normalizeSubcategory(rawData);
 * ...
 * ...
 */
exports.default = subcategory_1.default;
