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
var blocks_1 = require("../cms/blocks");
var _1 = require(".");
var id_1 = require("./id");
var sub_categories_1 = require("./sub-categories");
var first_1 = __importDefault(require("lodash/first"));
var get_1 = __importDefault(require("lodash/get"));
var groupBy_1 = __importDefault(require("lodash/groupBy"));
var isArray_1 = __importDefault(require("lodash/isArray"));
var isEmpty_1 = __importDefault(require("lodash/isEmpty"));
var last_1 = __importDefault(require("lodash/last"));
var withAppData_1 = __importDefault(require("../app/withAppData"));
function subcategory(params, req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, withAppData_1.default(req, function () { return __awaiter(_this, void 0, void 0, function () {
                    var slug, _a, q, filters, _b, sort, _c, page, defaultSort, isSearch, isLanding, lastSlug, urlKey, id, name, navMenu, rawIdData, idData, rawSubCategoriesData, rawData, data, cmsBlocks, identifiers, rawCmsBlocks;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                slug = params.slug, _a = params.q, q = _a === void 0 ? '' : _a, filters = params.filters, _b = params.sort, sort = _b === void 0 ? 'position: DESC' : _b, _c = params.page, page = _c === void 0 ? 1 : _c;
                                if (!isArray_1.default(slug)) {
                                    slug = (slug || '').split('/');
                                }
                                defaultSort = 'position: DESC';
                                isSearch = !isEmpty_1.default(q);
                                isLanding = get_1.default(slug, 'length', 0) === 1 && !isSearch // 1st level pages (/women, /men, etc.) are landings
                                ;
                                lastSlug = last_1.default(slug) || '';
                                urlKey = lastSlug.replace('.html', '');
                                if (sort === 'rating') {
                                    sort = defaultSort; // remove default RSF filter
                                }
                                if (filters) {
                                    filters = JSON.parse(filters);
                                }
                                else {
                                    filters = [];
                                }
                                navMenu = null;
                                if (!isSearch) return [3 /*break*/, 1];
                                id = "Search: " + q;
                                name = "Results for \"" + q + "\"";
                                return [3 /*break*/, 4];
                            case 1: return [4 /*yield*/, id_1.fetchSubcategoryId({ urlKey: urlKey })];
                            case 2:
                                rawIdData = _d.sent();
                                idData = id_1.normalizeSubcategoryId(rawIdData);
                                id = idData.id;
                                name = idData.name;
                                return [4 /*yield*/, sub_categories_1.fetchSubcategorySubCategories({ urlKey: urlKey })];
                            case 3:
                                rawSubCategoriesData = _d.sent();
                                navMenu = sub_categories_1.normalizeSubcategorySubCategories(rawSubCategoriesData);
                                _d.label = 4;
                            case 4: return [4 /*yield*/, _1.fetchSubcategory({
                                    categoryId: isSearch ? null : id,
                                    sort: sort,
                                    currentPage: page,
                                    filter: filtersToQuery(filters),
                                    search: q,
                                })];
                            case 5:
                                rawData = _d.sent();
                                data = _1.normalizeSubcategory(rawData);
                                cmsBlocks = [];
                                if (!isLanding) return [3 /*break*/, 7];
                                identifiers = resolveCmsBlocksIdentifiers(urlKey);
                                return [4 /*yield*/, blocks_1.fetchCmsBlocks({ identifiers: identifiers })];
                            case 6:
                                rawCmsBlocks = _d.sent();
                                cmsBlocks = blocks_1.normalizeCmsBlocks(rawCmsBlocks).items;
                                _d.label = 7;
                            case 7: 
                            // collect all page data
                            return [2 /*return*/, {
                                    id: id,
                                    name: name,
                                    title: name,
                                    total: get_1.default(data, 'total', 0),
                                    page: get_1.default(data, 'currentPage', 1),
                                    totalPages: get_1.default(data, 'totalPages', 0),
                                    isLanding: isLanding,
                                    cmsBlocks: cmsBlocks,
                                    products: get_1.default(data, 'products', []),
                                    sort: sort,
                                    sortOptions: get_1.default(data, 'sortOptions', [])
                                        .map(function (option) { return [
                                        {
                                            // split up for ASC/DESC sort for demo
                                            name: get_1.default(option, 'name') + " \u2B07\uFE0F",
                                            code: get_1.default(option, 'code') + ": DESC",
                                        },
                                        {
                                            name: get_1.default(option, 'name') + " \u2B06\uFE0F",
                                            code: get_1.default(option, 'code') + ": ASC",
                                        },
                                    ]; })
                                        .flat(),
                                    filters: filters,
                                    facets: get_1.default(data, 'facets', []),
                                    navMenu: navMenu,
                                    breadcrumbs: [
                                        {
                                            text: 'Home',
                                            href: '/',
                                        },
                                    ],
                                }];
                        }
                    });
                }); })];
        });
    });
}
exports.default = subcategory;
function filtersToQuery(filters) {
    var filtersGrouped = groupBy_1.default(filters, function (x) { return x.split(':')[0]; });
    var keys = Object.keys(filtersGrouped);
    return keys
        .map(function (key) {
        var values = filtersGrouped[key].map(function (f) { return f.replace(key + ":", ''); });
        if (key !== 'price') {
            return key + ": { in: " + JSON.stringify(values) + " }";
        }
        var prices = values
            .map(function (x) { return x.split('_').map(Number); })
            .flat()
            .sort();
        var from = first_1.default(prices);
        var to = last_1.default(prices);
        if (!from && !to) {
            return null;
        }
        var fromQuery = from ? "from: \"" + from + "\"" : '';
        var toQuery = to ? "to: \"" + to + "\"" : '';
        return "\n      " + key + ": { \n        " + fromQuery + "\n        " + toQuery + "\n      }\n    ";
    })
        .filter(Boolean)
        .join('\n');
}
function resolveCmsBlocksIdentifiers(urlKey) {
    if (urlKey === 'what-is-new') {
        urlKey = 'new'; // eslint-disable-line no-param-reassign
    }
    return urlKey + "-block";
}
