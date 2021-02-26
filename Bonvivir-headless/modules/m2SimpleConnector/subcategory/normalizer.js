'use strict'
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var get_1 = __importDefault(require('lodash/get'))
function normalizeProductItem(rawItem) {
  var rawRelatedProducts = get_1.default(rawItem, 'related_products')
  var thumbnail = get_1.default(rawItem, 'thumbnail.url', '')
  var regular_price = new Intl.NumberFormat('de-DE').format(
    get_1.default(rawItem, 'price_range.maximum_price.regular_price.value', 0)
  )
  var final_price = new Intl.NumberFormat('de-DE').format(
    get_1.default(rawItem, 'price_range.maximum_price.final_price.value', 0)
  )
  var discount = new Intl.NumberFormat('de-DE').format(
    get_1.default(rawItem, 'price_range.maximum_price.discount.percent_off', 0)
  )
  return {
    id: get_1.default(rawItem, 'id', ''),
    sku: get_1.default(rawItem, 'sku', ''),
    disable: get_1.default(rawItem, 'disable', null),
    url: '/p/' + get_1.default(rawItem, 'url_key', '') + get_1.default(rawItem, 'url_suffix', ''),
    name: get_1.default(rawItem, 'name', ''),
    regular_price: '$' + regular_price,
    final_price: '$' + final_price,
    discount: '-' + discount + '%',
    price_range: get_1.default(rawItem, 'price_range.maximum_price'),
    thumbnail: {
      src: thumbnail,
      alt: 'thumbnail',
      type: 'image',
    },
    relatedProducts:
      rawRelatedProducts === null || rawRelatedProducts === void 0
        ? void 0
        : rawRelatedProducts.map(function(rp) {
            return normalizeProductItem(__assign(__assign({}, rp), { related_products: [] }))
          }),
    reviewCount: 0,
  }
}
function getSortData(rawSubcategoryData) {
  var rawSortFields = get_1.default(rawSubcategoryData, 'sort_fields')
  return {
    sortDefault: get_1.default(rawSortFields, 'default', 'position'),
    sortOptions: get_1.default(rawSortFields, 'options', []).map(function(option) {
      return {
        name:
          option.label === 'Position'
            ? 'Posición'
            : option.label === 'Product Name'
            ? 'Nombre'
            : option.label === 'Price'
            ? 'Precio'
            : option.label,
        code: get_1.default(option, 'value'),
      }
    }),
  }
}
function getFacetsData(rawSubcategoryData) {
  var rawFacets = get_1.default(rawSubcategoryData, 'aggregations', []).filter(function(facet) {
    return get_1.default(facet, 'attribute_code') !== 'category_id'
  }) // skip categories
  return {
    facets: rawFacets.map(function(rawFilter) {
      var attr = get_1.default(rawFilter, 'attribute_code')
      var isColorFacet = attr === 'color'
      var rawOptions = get_1.default(rawFilter, 'options', [])
      return {
        name: rawFilter.label === 'Price' ? 'Precio' : rawFilter.label,
        ui: 'buttons',
        options: rawOptions.map(function(option) {
          return {
            name: get_1.default(option, 'label'),
            code: attr + ':' + get_1.default(option, 'value'),
            matches: get_1.default(option, 'count', 0),
            css: isColorFacet ? get_1.default(option, 'label', '').toLowerCase() : '',
          }
        }),
      }
    }),
  }
}
/**
 * Magento 2: subcategory normalizer
 */
function normalizer(rawData) {
  var rawSubcategoryData = get_1.default(rawData, 'data.products', {})
  var normalizedData = __assign(
    __assign(
      {
        total: get_1.default(rawSubcategoryData, 'total_count', 0),
        totalPages: get_1.default(rawSubcategoryData, 'page_info.total_pages', 1),
        currentPage: get_1.default(rawSubcategoryData, 'page_info.current_page', 1),
        products: get_1.default(rawSubcategoryData, 'items', []).map(function(rawItem) {
          return normalizeProductItem(rawItem)
        }),
      },
      getSortData(rawSubcategoryData)
    ),
    getFacetsData(rawSubcategoryData)
  )
  return normalizedData
}
exports.default = normalizer
