"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var get_1 = __importDefault(require("lodash/get"));
/**
 * Magento 2: subcategory id normalizer
 */
function normalizer(rawData) {
    var id = get_1.default(rawData, 'data.categoryList[0]id', null);
    var name = get_1.default(rawData, 'data.categoryList[0]name', null);
    return {
        id: id,
        name: name,
    };
}
exports.default = normalizer;
