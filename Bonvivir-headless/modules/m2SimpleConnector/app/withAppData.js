"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fulfillAPIRequest_1 = __importDefault(require("react-storefront/props/fulfillAPIRequest"));
var getAppData_1 = __importDefault(require("./getAppData"));
function withAppData(req, getPageData) {
    return fulfillAPIRequest_1.default(req, {
        appData: getAppData_1.default,
        pageData: getPageData,
    });
}
exports.default = withAppData;
