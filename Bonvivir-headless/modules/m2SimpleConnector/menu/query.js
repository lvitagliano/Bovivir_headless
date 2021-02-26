"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getFullInnerSchema(menuItemFields, numberOfLevels) {
    var fullInnerSchema = '';
    var menuItemFieldsJoined = menuItemFields
        .filter(function (itemField) { return itemField !== 'children'; })
        .join('\n');
    var childrenEmptyObject = 'children {}';
    for (var i = 0; i < numberOfLevels; i++) {
        if (!fullInnerSchema.includes(childrenEmptyObject)) {
            fullInnerSchema += menuItemFieldsJoined + "\n" + childrenEmptyObject;
        }
        else {
            fullInnerSchema = fullInnerSchema.replace(childrenEmptyObject, "children { " + menuItemFieldsJoined + "\n" + childrenEmptyObject + " }");
        }
    }
    fullInnerSchema = fullInnerSchema.replace(childrenEmptyObject, '');
    return fullInnerSchema;
}
/**
 * Magento 2: menu Graph QL query
 */
var query = function (_a) {
    var _b = _a.numberOfLevels, numberOfLevels = _b === void 0 ? 2 : _b, _c = _a.menuItemFields, menuItemFields = _c === void 0 ? [
        'name',
        'url_path',
        'url_suffix',
        'position',
    ] : _c;
    var fullInnerSchema = getFullInnerSchema(menuItemFields, numberOfLevels);
    return {
        query: "\n      {\n        categoryList(filters: {}) {\n          level\n          children {\n            " + fullInnerSchema + "\n          }\n        }\n      }\n    ",
    };
};
exports.default = query;
