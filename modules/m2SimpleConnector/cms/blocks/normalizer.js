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
var get_1 = __importDefault(require("lodash/get"));
var cheerio_1 = __importDefault(require("cheerio"));
var config_1 = require("../../config");
/**
 * Magento 2: cmsBlocks normalizer
 */
function normalizer(rawData) {
    var items = get_1.default(rawData, 'data.cmsBlocks.items', []);
    return {
        items: items.map(function (item) {
            var content = get_1.default(item, 'content', '');
            var $content = cheerio_1.default.load(content);
            $content('a[href]').each(function (i, elem) {
                var $link = $content(elem);
                var rawHref = $link.attr('href');
                var newHref = rawHref.replace(config_1.host, '');
                // @TODO: find a better way to create RSF router links
                if (newHref.startsWith('/women') ||
                    newHref.startsWith('/men') ||
                    newHref.startsWith('/collections') ||
                    newHref.startsWith('/gear') ||
                    newHref.startsWith('/training') ||
                    newHref.startsWith('/sale')) {
                    newHref = "/s" + newHref;
                }
                else {
                    newHref = "/p" + newHref;
                }
                $link.attr('href', newHref);
            });
            return __assign(__assign({}, item), { content: $content.html() });
        })
    };
}
exports.default = normalizer;
