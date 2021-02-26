"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Magento 2: customer generateToken Graph QL query
 */
var query = function (email, password) { return ({
    query: "\n  mutation {\n    generateCustomerToken(\n      email: \"" + email + "\",\n      password: \"" + password + "\"\n    ) {\n      token\n    }\n  }",
}); };
exports.default = query;
