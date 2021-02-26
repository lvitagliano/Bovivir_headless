"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var home_1 = __importDefault(require("../home"));
var cart_1 = __importDefault(require("../cart"));
var addToCart_1 = __importDefault(require("../cart/addToCart"));
var updateCartItem_1 = __importDefault(require("../cart/updateCartItem"));
var removeCartItem_1 = __importDefault(require("../cart/removeCartItem"));
var product_1 = __importDefault(require("../product"));
var productSlots_1 = __importDefault(require("../product/productSlots"));
var productSuggestions_1 = __importDefault(require("../product/productSuggestions"));
var routes_1 = __importDefault(require("../routes"));
var session_1 = __importDefault(require("../session"));
var signIn_1 = __importDefault(require("../session/signIn"));
var signOut_1 = __importDefault(require("../session/signOut"));
var signUp_1 = __importDefault(require("../session/signUp"));
var subcategory_1 = __importDefault(require("../subcategory"));
var search_1 = __importDefault(require("../search"));
var searchSuggestions_1 = __importDefault(require("../search/searchSuggestions"));
var Magento2Connector = /** @class */ (function () {
    function Magento2Connector() {
        this.home = home_1.default;
        this.cart = cart_1.default;
        this.addToCart = addToCart_1.default;
        this.updateCartItem = updateCartItem_1.default;
        this.removeCartItem = removeCartItem_1.default;
        this.product = product_1.default;
        this.session = session_1.default;
        this.signIn = signIn_1.default;
        this.signOut = signOut_1.default;
        this.signUp = signUp_1.default;
        this.subcategory = subcategory_1.default;
        this.search = search_1.default;
        this.routes = routes_1.default;
        this.productSlots = productSlots_1.default;
        this.productSuggestions = productSuggestions_1.default;
        this.searchSuggestions = searchSuggestions_1.default;
    }
    return Magento2Connector;
}());
exports.default = Magento2Connector;
