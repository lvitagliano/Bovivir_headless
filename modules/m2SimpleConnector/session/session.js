"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodeCookieHelpers_1 = require("../helpers/nodeCookieHelpers");
var obtainSession_1 = __importDefault(require("./guest/obtainSession"));
var cart_1 = __importDefault(require("./guest/cart"));
var cart_2 = __importDefault(require("./customer/cart"));
var constants_1 = require("../constants");
function session(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var cookiesToSet, tokenCookieValue, customerCartData, cart, customerCartId, guestCartIdCookieValue, guestCartData, cart, obtainSessionData, guestCartId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cookiesToSet = [];
                    tokenCookieValue = nodeCookieHelpers_1.getCookieValue(req, constants_1.COOKIES.M2_CUSTOMER_TOKEN);
                    if (!tokenCookieValue) return [3 /*break*/, 2];
                    return [4 /*yield*/, cart_2.default(tokenCookieValue)];
                case 1:
                    customerCartData = _a.sent();
                    if (customerCartData.error) {
                        return [2 /*return*/, {
                                error: customerCartData.error,
                            }];
                    }
                    cart = customerCartData.cart, customerCartId = customerCartData.customerCartId;
                    cookiesToSet.push(nodeCookieHelpers_1.prepareSetCookie(constants_1.COOKIES.M2_CUSTOMER_TOKEN, tokenCookieValue, { maxAge: 3600 * 24 * 30 })); // renew customer token cookie for 30 more days
                    cookiesToSet.push(nodeCookieHelpers_1.prepareSetCookie(constants_1.COOKIES.M2_CUSTOMER_CART_ID, customerCartId, { maxAge: 3600 * 24 * 30 })); // set/renew customer cart ID cookie for 30 days
                    cookiesToSet.push(nodeCookieHelpers_1.prepareKillCookie(constants_1.COOKIES.M2_GUEST_CART_ID)); // kill guest cart ID cookie just in case (prevents possible cart merges issues)
                    nodeCookieHelpers_1.setCookies(res, cookiesToSet);
                    return [2 /*return*/, {
                            signedIn: true,
                            cart: cart,
                        }];
                case 2:
                    // ### 2 - GUEST SESSION
                    // # 2.1 - Obtain returning guest session
                    cookiesToSet.push(nodeCookieHelpers_1.prepareKillCookie(constants_1.COOKIES.M2_CUSTOMER_CART_ID)); // kill customer cart ID cookie just in case (prevents possible cart merges issues)
                    guestCartIdCookieValue = nodeCookieHelpers_1.getCookieValue(req, constants_1.COOKIES.M2_GUEST_CART_ID);
                    if (!guestCartIdCookieValue) return [3 /*break*/, 4];
                    return [4 /*yield*/, cart_1.default(guestCartIdCookieValue)];
                case 3:
                    guestCartData = _a.sent();
                    if (guestCartData.error) {
                        nodeCookieHelpers_1.setCookies(res, cookiesToSet);
                        return [2 /*return*/, {
                                error: guestCartData.error,
                            }];
                    }
                    cart = guestCartData.cart;
                    cookiesToSet.push(nodeCookieHelpers_1.prepareSetCookie(constants_1.COOKIES.M2_GUEST_CART_ID, guestCartIdCookieValue, { maxAge: 3600 * 24 * 7 })); // renew cookie for 7 more days
                    nodeCookieHelpers_1.setCookies(res, cookiesToSet);
                    return [2 /*return*/, {
                            signedIn: false,
                            cart: cart,
                        }];
                case 4: return [4 /*yield*/, obtainSession_1.default()];
                case 5:
                    obtainSessionData = _a.sent();
                    if (obtainSessionData.error) {
                        nodeCookieHelpers_1.setCookies(res, cookiesToSet);
                        return [2 /*return*/, {
                                error: obtainSessionData.error,
                            }];
                    }
                    guestCartId = obtainSessionData.guestCartId;
                    cookiesToSet.push(nodeCookieHelpers_1.prepareSetCookie(constants_1.COOKIES.M2_GUEST_CART_ID, guestCartId, { maxAge: 3600 * 24 * 7 })); // set guest cart id cookie for 7 days
                    nodeCookieHelpers_1.setCookies(res, cookiesToSet);
                    return [2 /*return*/, {
                            signedIn: false,
                            cart: {
                                items: [],
                            },
                        }];
            }
        });
    });
}
exports.default = session;
