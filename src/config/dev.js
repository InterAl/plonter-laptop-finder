import baseConfig from './base';

const config = {
  appEnv: 'dev',
  laptopsUrl: 'http://www.plonter.co.il/pnp/alonLP.tmpl',
  filtersUrl: 'http://www.plonter.co.il/pnp/alondtlp.tmpl',
  productLink: 'http://www.plonter.co.il/detail.tmpl?sku={{sku}}'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
