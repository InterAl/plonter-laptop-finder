import baseConfig from './base';

const config = {
  appEnv: 'dist',
  laptopsUrl: '/pnp/alonLP.tmpl',
  optionsUrl: '/pnp/alondtlp.tmpl'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
