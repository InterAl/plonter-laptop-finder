import baseConfig from './base';

const config = {
  appEnv: 'dev',
  laptopsUrl: 'http://www.plonter.co.il/pnp/alonLP.tmpl',
  optionsUrl: 'http://www.plonter.co.il/pnp/alondtlp.tmpl'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
