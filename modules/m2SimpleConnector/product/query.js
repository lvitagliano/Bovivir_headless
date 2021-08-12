"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simpleProduct = "\n    id,\n    url_key,\n    url_suffix,\n    disable,\n    cantidad,\n    image {\n      label\n      url\n    },\n    name,\n    thumbnail { url }\n    description {\n      html\n    },\n    sku,\n    media_gallery {\n      label\n      url\n    },\n    only_x_left_in_stock,\n    stock_status,\n    short_description{html},\n    vino_cepa,\n    vino_bodega,\n    vino_variedad,\n    vino_seleccion,\n    price_range {\n      maximum_price {\n        final_price {\n          currency,\n          value\n        },\n        discount{\n          amount_off\n        },\n        fixed_product_taxes{\n          amount {\n            currency,\n            value\n          }, \n          label\n        }\n        regular_price{\n          currency,\n          value\n        }\n      }\n    }\n";
/**
 * Magento 2: product query
 */
var query = function (urlKey) { return ({
    query: "\n    {\n      products(search: \"" + urlKey + "\") {\n        items {\n          " + simpleProduct + "\n          related_products {\n            " + simpleProduct + "\n          }\n        }\n      }\n    }\n  ",
}); };
exports.default = query;
