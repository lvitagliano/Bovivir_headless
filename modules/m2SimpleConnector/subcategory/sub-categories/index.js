"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeSubcategorySubCategories = exports.fetchSubcategorySubCategories = exports.subcategorySubCategoriesQuery = void 0;
var query_1 = __importDefault(require("./query"));
exports.subcategorySubCategoriesQuery = query_1.default;
var fetcher_1 = __importDefault(require("./fetcher"));
exports.fetchSubcategorySubCategories = fetcher_1.default;
var normalizer_1 = __importDefault(require("./normalizer"));
exports.normalizeSubcategorySubCategories = normalizer_1.default;
