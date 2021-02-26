"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Magento 2: cmsBlocks Graph QL query
 */
var query = function (_a) {
    var identifiers = _a.identifiers;
    return ({
        query: "\n    {\n      cmsBlocks(identifiers: \"" + identifiers + "\") {\n        items {\n          identifier\n          title\n          content\n        }\n      }\n    }\n  ",
    });
};
exports.default = query;
