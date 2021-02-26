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
exports.setCookies = exports.prepareKillCookie = exports.prepareSetCookie = exports.getCookieValue = void 0;
var get_1 = __importDefault(require("lodash/get"));
function convertCookieStringToObject(cookiesStr) {
    return ((cookiesStr || '').split(';').reduce(function (cookiesObjectAcc, cookieStr) {
        var _a;
        var _b = cookieStr.split('='), name = _b[0], value = _b[1];
        name = (name || '').trim(); // add trimming just in case
        value = (value || '').trim();
        return __assign(__assign({}, cookiesObjectAcc), (_a = {}, _a[name] = value, _a));
    }, {}) || null); // return `null` instead of empty string
}
/**
 * Gets cookie value in NodeJS handler
 *
 * @param {Request} req The request object
 * @param {String} cookieName Cookie name
 * @return {String} Cookie value (null if missing)
 */
function getCookieValue(req, cookieName) {
    var cookie = get_1.default(req, 'headers.cookie');
    var cookies = convertCookieStringToObject(cookie);
    return get_1.default(cookies, cookieName, null);
}
exports.getCookieValue = getCookieValue;
/**
 * Prepares a Set-Cookie value string
 * @param name The name of the cookie
 * @param value The value to set
 * @param options Additional options
 * @returns {string}
 */
function prepareSetCookie(name, value, options) {
    if (options === void 0) { options = {}; }
    var cookieValue = [name + "=" + value];
    if (options.maxAge) {
        cookieValue.push("Max-Age=" + options.maxAge);
    }
    if (options.expires && !options.maxAge) {
        cookieValue.push("Expires=" + options.expires.toUTCString());
    }
    return cookieValue.join('; ');
}
exports.prepareSetCookie = prepareSetCookie;
/**
 * Prepares a Set-Cookie value string for cookie needs to be removed (sets negative expiry time)
 *
 * @param {string} cookieName Cookie name
 * @returns {string}
 */
function prepareKillCookie(cookieName) {
    return prepareSetCookie(cookieName, 'EXP', { expires: new Date(0) }); // 1 Jan 1970
}
exports.prepareKillCookie = prepareKillCookie;
/**
 * Sets multiple cookies into response object
 *
 * @param {Response} res Response object
 * @param {string[]} cookies Array of Set-Cookie response header values
 * @returns {string}
 */
function setCookies(res, cookies) {
    res.setHeader('Set-Cookie', cookies);
}
exports.setCookies = setCookies;
