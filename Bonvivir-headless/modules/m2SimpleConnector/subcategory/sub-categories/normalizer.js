"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var get_1 = __importDefault(require("lodash/get"));
var orderBy_1 = __importDefault(require("lodash/orderBy"));
/**
 * Magento 2: subcategory sub-categories normalizer
 */
function normalizer(rawData) {
    var rawChildren = get_1.default(rawData, 'data.categoryList[0].children', []);
    var rawChildrenSorted = orderBy_1.default(rawChildren, 'position');
    return {
        items: rawChildrenSorted.map(function (item) { return ({
            text: get_1.default(item, 'name', ''),
            href: "/" + get_1.default(item, 'url_path', '') + get_1.default(item, 'url_suffix', ''),
        }); }),
    };
}
exports.default = normalizer;
