"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isomorphic_unfetch_1 = __importDefault(require("isomorphic-unfetch"));
var config_1 = require("./config");
function fetchWithGraphQl(query, token) {
    if (token === void 0) { token = null; }
    var authHeaders = token ? {
        Authorization: "Bearer " + token,
    } : {};
    return isomorphic_unfetch_1.default(config_1.graphQlHost, {
        method: 'POST',
        headers: __assign(__assign({}, authHeaders), { Accept: 'application/json', 'Content-Type': 'application/json', Store: 'default' }),
        body: JSON.stringify(query),
    }).then(function (res) { return res.json(); });
}
exports.default = fetchWithGraphQl;
