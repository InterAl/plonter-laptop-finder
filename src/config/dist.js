import baseConfig from './base';

const config = {
  appEnv: 'dist',
  laptopsUrl: '/pnp/alonLP.tmpl',
  filtersUrl: '/pnp/alondtlp.tmpl',
  addToCart: '/Products_ShoppingCart.tmpl?command=add&db=%5Ecatalog.txt&lang=heb&sku={{sku}}&quantity=1'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
