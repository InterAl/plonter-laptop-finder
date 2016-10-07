import baseConfig from './base';

const config = {
  appEnv: 'dist',
  laptopsUrl: '/pnp/alonLP.tmpl',
  filtersUrl: '/pnp/alondtlp.tmpl',
  productLink: 'http://www.plonter.co.il/detail.tmpl?sku={{sku}}'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
