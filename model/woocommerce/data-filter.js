const validKeys = [
  'slug',
  'sku',
  'date_created_gmt',
  'date_modified_gmt',
  'description',
  'price',
  'sale_price',
  'short_description',
  'date_on_sale_from_gmt',
  'date_on_sale_to_gmt',
  'stock_quantity',
  'regular_price',
  'low_stock_amount',
  'tax_status',
  'tax_class',
  'weight',
  'manage_stock',
  'type',
  'cross_sell_ids',
  'dimensions',
  'status',
  'parent_id',
  'categories',
  'images',
  'catalog_visibility',
  'variations',
  'related_ids',
  'meta_data',
  'name'
];

let WoocommerceDataFilter = function() {
  this.attributes = [];
}

WoocommerceDataFilter.prototype.checkAttributeFromKey = function(key) 
{
  return (validKeys.indexOf(key)>-1);
}

WoocommerceDataFilter.prototype.addValidAttributeOptions = function(options)
{
  // if (options === null) {
  //   return;
  // }

  // for(let i = 0; i < attributesOptions.length; i++) {
  //   let elem = 
  //   if (this.checkAttributeFromKey())
  //   this.attributes.push(attributesOptions[i]);
  // }
}

module.exports = WoocommerceDataFilter;