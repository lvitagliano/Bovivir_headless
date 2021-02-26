"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Magento 2: subcategory sub-categories Graph QL query
 */
var query = function (_a) {
    var urlKey = _a.urlKey;
    return ({
        query: "\n    {\n      categoryList(\n        filters: {\n          url_key: {\n            eq: \"" + urlKey + "\"\n          }\n        }\n      ) {\n        children {\n          level\n          name\n          url_path\n          url_suffix\n          position\n        }\n      }\n    }\n  ",
    });
};
exports.default = query;
