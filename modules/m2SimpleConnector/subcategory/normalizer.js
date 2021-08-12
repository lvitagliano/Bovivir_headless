"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var get_1 = __importDefault(require("lodash/get"));
function normalizeProductItem(rawItem) {
    // console.log("rawItem: ", JSON.stringify(rawItem));
    var thumbnail = get_1.default(rawItem, "thumbnail.url", "");
    var regular_price = new Intl.NumberFormat("de-DE").format(get_1.default(rawItem, "price_range.maximum_price.regular_price.value", 0));
    var final_price = new Intl.NumberFormat("de-DE").format(get_1.default(rawItem, "price_range.maximum_price.final_price.value", 0));
    var discount = new Intl.NumberFormat("de-DE").format(get_1.default(rawItem, "price_range.maximum_price.discount.percent_off", 0));
    return {
        id: get_1.default(rawItem, "id", ""),
        sku: get_1.default(rawItem, "sku", ""),
        cantidad: get_1.default(rawItem, "cantidad", null),
        disable: get_1.default(rawItem, "disable", null),
        descuento_socios: get_1.default(rawItem, "descuento_socios", 0),
        dos_por_uno: get_1.default(rawItem, "dos_por_uno", false),
        envio_gratis: get_1.default(rawItem, "envio_gratis", false),
        qty: get_1.default(rawItem, "qty", 0),
        new_from_date: get_1.default(rawItem, "new_from_date", null),
        new_to_date: get_1.default(rawItem, "new_to_date", null),
        stock_status: get_1.default(rawItem, "stock_status", null),
        url: "/p/" + get_1.default(rawItem, "url_key", "") + get_1.default(rawItem, "url_suffix", ""),
        name: get_1.default(rawItem, "name", ""),
        regular_price: "$" + regular_price,
        final_price: "$" + final_price,
        discount: "-" + discount + "%",
        price_range: get_1.default(rawItem, "price_range.maximum_price"),
        thumbnail: {
            src: thumbnail,
            alt: "thumbnail",
            type: "image",
        },
    };
}
function getSortData(rawSubcategoryData) {
    var rawSortFields = get_1.default(rawSubcategoryData, "sort_fields");
    var sortDefault = get_1.default(rawSortFields, "default", "position");
    var sortOptions = get_1.default(rawSortFields, "options", []).map(function (option) { return ({
        name: get_1.default(option, "label"),
        code: get_1.default(option, "value"),
    }); });
    sortOptions.forEach(function (opt) {
        opt.name === "Position"
            ? (opt.name = "Posición")
            : opt.name === "Price"
                ? (opt.name = "Precio")
                : opt.name === "Product Name"
                    ? (opt.name = "Nombre")
                    : opt.name;
        if (opt.name === "Destacados")
            opt.code = "relevance";
    });
    return {
        sortDefault: sortDefault,
        sortOptions: sortOptions,
    };
}
function getFacetsData(rawSubcategoryData) {
    var rawFacets = get_1.default(rawSubcategoryData, "aggregations", []).filter(function (facet) { return get_1.default(facet, "attribute_code") !== "category_id"; });
    var facetsData = {
        facets: rawFacets.map(function (rawFilter) {
            var attr = get_1.default(rawFilter, "attribute_code");
            var isColorFacet = attr === "color";
            var rawOptions = get_1.default(rawFilter, "options", []);
            return {
                name: get_1.default(rawFilter, "label"),
                ui: "buttons",
                options: rawOptions.map(function (option) { return ({
                    name: get_1.default(option, "label"),
                    code: attr + ":" + get_1.default(option, "value"),
                    matches: get_1.default(option, "count", 0),
                    css: isColorFacet ? get_1.default(option, "label", "").toLowerCase() : "",
                }); }),
            };
        }),
    };
    facetsData.facets.forEach(function (f) {
        f.name === "Price" ? (f.name = "Precio") : f.name;
    });
    facetsData.facets = facetsData.facets.filter(function (f) { return f.name !== "Color"; });
    return facetsData;
}
/**
 * Magento 2: subcategory normalizer
 */
function normalizer(rawData) {
    var rawSubcategoryData = get_1.default(rawData, "data.products", {});
    var normalizedData = __assign(__assign({ total: get_1.default(rawSubcategoryData, "total_count", 0), totalPages: get_1.default(rawSubcategoryData, "page_info.total_pages", 1), currentPage: get_1.default(rawSubcategoryData, "page_info.current_page", 1), products: get_1.default(rawSubcategoryData, "items", []).map(function (rawItem) {
            return normalizeProductItem(rawItem);
        }) }, getSortData(rawSubcategoryData)), getFacetsData(rawSubcategoryData));
    return normalizedData;
}
exports.default = normalizer;
