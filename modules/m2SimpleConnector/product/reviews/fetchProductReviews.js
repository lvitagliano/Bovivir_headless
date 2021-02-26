"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isomorphic_unfetch_1 = __importDefault(require("isomorphic-unfetch"));
var config_1 = require("../../config");
function fetchProductReviews(productId) {
    return isomorphic_unfetch_1.default(config_1.host + "/review/product/listAjax/id/" + productId)
        .then(function (res) { return res.text(); });
}
exports.default = fetchProductReviews;
