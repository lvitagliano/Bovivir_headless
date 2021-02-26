"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeRevokeToken = exports.fetchRevokeToken = exports.revokeTokenQuery = void 0;
var query_1 = __importDefault(require("./query"));
exports.revokeTokenQuery = query_1.default;
var fetcher_1 = __importDefault(require("./fetcher"));
exports.fetchRevokeToken = fetcher_1.default;
var normalizer_1 = __importDefault(require("./normalizer"));
exports.normalizeRevokeToken = normalizer_1.default;
