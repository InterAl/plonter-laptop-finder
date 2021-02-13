import baseConfig from './base';

const config = {
  appEnv: 'dev',
  laptopsUrl: 'https://www.plonter.co.il/pnp/alonLP.tmpl',
  filtersUrl: 'https://www.plonter.co.il/pnp/alondtlp.tmpl',
  productLink: 'https://www.plonter.co.il/detail.tmpl?sku={{sku}}'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
