"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeSearch = exports.fetchSearch = void 0;
var fetcher_1 = __importDefault(require("./fetcher"));
exports.fetchSearch = fetcher_1.default;
var normalizer_1 = __importDefault(require("./normalizer"));
exports.normalizeSearch = normalizer_1.default;
var search_1 = __importDefault(require("./search"));
/**
 * Usage example (in handler):
 *
 * import { fetchSearch, normalizeSearch } from 'api/magento/search';
 * ...
 * ...
 * const rawData = await fetchSearch({ search });
 * const data = normalizeSearch(rawData);
 * ...
 * ...
 */
exports.default = search_1.default;
