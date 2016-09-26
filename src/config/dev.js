import baseConfig from './base';

const config = {
  appEnv: 'dev',
  laptopsUrl: 'http://www.plonter.co.il/pnp/alonLP.tmpl',
  filtersUrl: 'http://www.plonter.co.il/pnp/alondtlp.tmpl',
  addToCart: 'http://www.plonter.co.il/Products_ShoppingCart.tmpl?command=add&cart={{timestamp}}&db=%5Ecatalog.txt&lang=heb&sku={{sku}}&quantity=1'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
