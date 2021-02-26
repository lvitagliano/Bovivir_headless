"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var get_1 = __importDefault(require("lodash/get"));
/**
 * A helper that returns an error if present in Graph QL raw data response
 * @param {Object} rawData - Graph QL query raw response data
 * @returns {String} error
 */
function getError(rawData) {
    var rawErrors = get_1.default(rawData, 'errors', []);
    var error = rawErrors
        .map(function (err) { return get_1.default(err, 'message', ''); })
        .filter(Boolean)
        .join('\n');
    return error;
}
exports.default = getError;
