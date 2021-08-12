"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simpleProduct = "\n    id\n    url_key,\n    url_suffix,\n    disable\n    image {\n      label\n      url\n    },\n    name,\n    cantidad,\n    thumbnail { url }\n    description {\n      html\n    },\n    sku,\n    media_gallery {\n      label\n      url\n    },\n    only_x_left_in_stock,\n    stock_status,\n    short_description{html},\n    vino_cepa,\n    vino_bodega,\n    vino_variedad,\n    vino_seleccion,\n    descuento_socios,\n    dos_por_uno,\n    qty,\n    new_from_date,\n    new_to_date,\n    envio_gratis,\n    stock_status,\n    price_range {\n      maximum_price {\n        final_price {\n          currency,\n          value\n        },\n        discount{\n          amount_off,\n          percent_off\n        },\n        fixed_product_taxes{\n          amount {\n            currency,\n            value\n          }, \n          label\n        }\n        regular_price{\n          currency,\n          value\n        }\n      }\n    }\n";
var filtersSchema = "\n  aggregations {\n    attribute_code\n    count\n    label\n    options {\n      count\n      label\n      value\n    }\n  }\n";
var sortSchema = "\n  sort_fields {\n    default\n    options {\n      label\n      value\n    }\n  }\n";
var pageInfoSchema = "\n  total_count\n  page_info {\n    page_size\n    current_page\n    total_pages\n  }\n";
/**
 * Magento 2: subcategory Graph QL query
 */
var query = function (_a) {
    var _b = _a.categoryId, categoryId = _b === void 0 ? null : _b, _c = _a.pageSize, pageSize = _c === void 0 ? 16 : _c, _d = _a.currentPage, currentPage = _d === void 0 ? 1 : _d, _e = _a.filter, filter = _e === void 0 ? "" : _e, _f = _a.sort, sort = _f === void 0 ? "" : _f, _g = _a.search, search = _g === void 0 ? "" : _g;
    var searchQuery = search ? "search: \"" + search + "\"" : "";
    var sortQuery = sort ? "sort: { " + sort + " }" : "";
    var categoryIdQuery = categoryId
        ? "category_id: { eq: \"" + categoryId + "\" }"
        : "";
    var filterQuery = categoryIdQuery || filter
        ? "\n    filter: {\n      " + categoryIdQuery + "\n      " + filter + "\n    }"
        : "";
    return {
        query: "\n      {\n        products(\n          pageSize: " + pageSize + "\n          currentPage: " + currentPage + "\n          " + sortQuery + "\n          " + filterQuery + "\n          " + searchQuery + "\n        ) {\n          " + filtersSchema + "\n          " + sortSchema + "\n          " + pageInfoSchema + "\n          items {\n            " + simpleProduct + "\n          }\n        }\n      }\n    ",
    };
};
exports.default = query;
