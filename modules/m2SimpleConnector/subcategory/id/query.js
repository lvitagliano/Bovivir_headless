"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Magento 2: subcategory id Graph QL query
 */
var query = function (_a) {
    var urlKey = _a.urlKey;
    return ({
        query: "\n    {\n      categoryList(\n        filters: {\n          url_key: {\n            eq: \"" + urlKey + "\"\n          }\n        }\n      ) {\n        id\n        name\n      }\n    }\n  ",
    });
};
exports.default = query;
