"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var get_1 = __importDefault(require("lodash/get"));
var isEmpty_1 = __importDefault(require("lodash/isEmpty"));
function getThumbnail(rawProduct) {
    return {
        src: get_1.default(rawProduct, 'image.url', ''),
        alt: get_1.default(rawProduct, 'image.label', 'thumbnail'),
        type: 'image',
    };
}
function getMedia(rawProduct) {
    var thumbnail = getThumbnail(rawProduct);
    var thumbnails = get_1.default(rawProduct, 'media_gallery', []).map(function (item, i) { return ({
        src: get_1.default(item, 'url', ''),
        alt: get_1.default(item, 'label', "thumbnail " + i),
    }); });
    return {
        thumbnail: thumbnail,
        thumbnails: thumbnails,
        full: thumbnails,
    };
}
function getSpecs(rawProduct, rawCustomAttributes) {
    var specsAttributes = [
        {
            name: 'Style',
            key: 'style_general',
        },
        {
            name: 'Material',
            key: 'material',
        },
        {
            name: 'Pattern',
            key: 'pattern',
        },
        {
            name: 'Climate',
            key: 'climate',
        },
        {
            name: 'Activity',
            key: 'activity',
        },
        {
            name: 'Gender',
            key: 'gender',
        },
        {
            name: 'Category',
            key: 'category_gear',
        },
    ];
    return specsAttributes
        .map(function (specsAttribute) {
        var spec = specsAttribute.key;
        var specName = specsAttribute.name;
        var attr = rawCustomAttributes.find(function (_attr) { return get_1.default(_attr, 'attribute_code') === spec; });
        var rawValue = get_1.default(rawProduct, spec) || '';
        var value = rawValue
            .split(',')
            .map(function (x) {
            var opts = get_1.default(attr, 'attribute_options', []);
            var opt = opts.find(function (_attr) { return _attr.value === x.trim(); });
            return get_1.default(opt, 'label', '');
        })
            .join(', ');
        if (!value) {
            return null;
        }
        return {
            name: specName,
            value: value,
        };
    })
        .filter(Boolean);
}
function specsToHtml(specs) {
    return specs
        .filter(function (spec) { return spec.name && spec.value; })
        .map(function (spec) { return "<b>" + spec.name + ":</b> " + spec.value; })
        .join('<br/>');
}
/**
 * Magento 2: product normalizer
 */
function normalizer(rawData, productId) {
    var rawProduct = get_1.default(rawData, 'data.products.items[0]');
    var rawRelatedProducts = get_1.default(rawData, 'data.products.items[0].related_products');
    var rawCustomAttributes = get_1.default(rawData, 'data.customAttributeMetadata.items', []);
    if (!rawProduct) {
        return null;
    }
    var isConfigurableProduct = !isEmpty_1.default(get_1.default(rawProduct, 'configurable_options'));
    var price = get_1.default(rawProduct, 'price_range.maximum_price.regular_price.value');
    return {
        isConfigurableProduct: isConfigurableProduct,
        id: productId,
        disable: get_1.default(rawProduct, 'disable'),
        reviewsKey: get_1.default(rawProduct, 'id'),
        sku: get_1.default(rawProduct, 'sku'),
        url: "/p/" + productId + ".html",
        name: get_1.default(rawProduct, 'name'),
        description: get_1.default(rawProduct, 'description.html'),
        short_description: get_1.default(rawProduct, 'short_description.html'),
        price: price,
        basePriceText: "$" + new Intl.NumberFormat("de-DE").format(price),
        thumbnail: getThumbnail(rawProduct),
        media: getMedia(rawProduct),
        vino_cepa: get_1.default(rawProduct, 'vino_cepa'),
        vino_bodega: get_1.default(rawProduct, 'vino_bodega'),
        vino_variedad: get_1.default(rawProduct, 'vino_variedad'),
        vino_seleccion: get_1.default(rawProduct, 'vino_seleccion'),
        specs: specsToHtml(getSpecs(rawProduct, rawCustomAttributes)),
        relatedProducts: rawRelatedProducts && rawRelatedProducts.map(function (rp) { return normalizer({ data: { products: { items: [rp] } } }, rp.id); })
    };
}
exports.default = normalizer;
