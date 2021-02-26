"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var subcategory_1 = require("../subcategory");
/**
 * Magento 2: search normalizer
 * > uses subcategory normalizer underneath
 */
function normalizer(rawData) {
    return subcategory_1.normalizeSubcategory(rawData);
}
exports.default = normalizer;
