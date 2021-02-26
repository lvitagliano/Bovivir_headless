"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cartItemProductDefaultSchema = "\n  name\n  sku\n  url_key\n  url_suffix\n  thumbnail { url }\n  price_range {\n    maximum_price {\n      regular_price { value currency }\n      final_price { value currency }\n      discount { amount_off percent_off }\n    }\n  }\n";
exports.default = cartItemProductDefaultSchema;
