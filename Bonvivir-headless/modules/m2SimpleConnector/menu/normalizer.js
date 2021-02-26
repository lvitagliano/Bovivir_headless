"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var get_1 = __importDefault(require("lodash/get"));
var isEmpty_1 = __importDefault(require("lodash/isEmpty"));
var orderBy_1 = __importDefault(require("lodash/orderBy"));
function normalizeItems(children) {
    var childrenSorted = orderBy_1.default(children, ['position']);
    return childrenSorted.map(function (item) { return ({
        name: get_1.default(item, 'name', ''),
        url: "/" + get_1.default(item, 'url_path', '') + get_1.default(item, 'url_suffix', ''),
        items: !isEmpty_1.default(item.children) ? normalizeItems(item.children) : [],
    }); });
}
/**
 * Magento 2: menu normalizer
 */
function normalizer(rawData) {
    var rawMenu = get_1.default(rawData, 'data.categoryList', [])
        .filter(function (menu) { return get_1.default(menu, 'level') === 1; })[0];
    var children = get_1.default(rawMenu, 'children', []);
    var menu = normalizeItems(children);
    return menu;
}
exports.default = normalizer;
