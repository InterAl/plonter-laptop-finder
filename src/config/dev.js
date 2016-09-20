import baseConfig from './base';

const config = {
  appEnv: 'dev',
  laptopsUrl: 'http://www.plonter.co.il/pnp/alonLP.tmpl'
  // laptopsUrl: 'laptops.tsv'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
