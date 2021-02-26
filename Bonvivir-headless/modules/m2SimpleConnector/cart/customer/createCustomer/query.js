"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Magento 2: createCustomer Graph QL query
 */
var query = function (_a) {
    var firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password, _b = _a.isSubscribed, isSubscribed = _b === void 0 ? false : _b;
    return ({
        query: "\n    mutation {\n      createCustomer(\n        input: {\n          firstname: \"" + firstName + "\"\n          lastname: \"" + lastName + "\"\n          email: \"" + email + "\"\n          password: \"" + password + "\"\n          is_subscribed: " + isSubscribed + "\n        }\n      ) {\n        customer {\n          firstname\n          lastname\n          email\n          is_subscribed\n        }\n      }\n    }\n  ",
    });
};
exports.default = query;
