var _ = require('lodash');

process.env.ENV = 'test';
initBabelRegister();
initJsdom();
initGlobals();
initIgnoreStyles();

var mockCssModules = require('mock-css-modules');
mockCssModules.register(['.icss', '.scss', '.gif']);

function initBabelRegister() {
    require('babel-register')({
        ignore: function(filename) {
            if (_.endsWith(filename, '.gif'))
                return true;
            if (/..\/node_modules\/@wix\/restaurants\-components/.test(filename))
                return false;
            if (/@wix\/.*?\/node_modules/.test(filename))
                return true;
            if (filename.indexOf('@wix') !== -1)
                return false;
            if (filename.indexOf('node_modules') !== -1)
                return true;
            return false;
        },
        'presets': ['react', 'es2015', 'stage-2'],
        'plugins': ['transform-runtime', 'transform-decorators-legacy']
    });
}

//required for node testing.
function initJsdom() {
    var jsdom = require('jsdom').jsdom;

    var exposedProperties = ['window', 'navigator', 'document'];

    global.document = jsdom('');
    global.window = document.defaultView;
    Object.keys(document.defaultView).forEach((property) => {
      if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
      }
    });

    delete global['XMLHttpRequest'];

    global.navigator = {
      userAgent: 'node.js'
    };
}

function initIgnoreStyles() {
    require('ignore-styles').default(['.sass', '.scss', '.less', '.icss', '.css']);
}

function initGlobals() {
    // var globalize = require('./specUtils/globalize');
    // var _ = require('lodash');
    // var React = require('react');
    // var ReactDOM = require('react-dom');
    // var $ = require('jquery');
    // var enzymeHelper = require('@wix/wixrest-test-utils').enzymeHelper;
    // var ReactWrapper = require('enzyme').ReactWrapper;
    //
    // enzymeHelper.extendReactWrapper(ReactWrapper);
    //
    // React.addons = {CSSTransitionGroup: ({children}) => children};
    // globalize('XMLHttpRequest', function(){});
    // globalize('GlobalActiveXObject', {});
    // globalize('_', _);
    // globalize('React', React);
    // globalize('ReactDOM', ReactDOM);
    // globalize('$', $);
    // globalize('jQuery', $);
    // $.Velocity = { animate: () => Promise.resolve() };
    // require('jquery-ui');
    // globalize('google', require('./stubs/googleMaps'));
    // globalize('localStorage', require('./stubs/localStorageStub').default);
    // globalize('Wix', require('./stubs/WixApi').default);
    // require('./testLogger').default();
    //
    // global.window.open = () => ({
    //     document: {
    //         open: _.noop, write: _.noop, close: _.noop
    //     },
    //     print: _.noop,
    //     focus: _.noop,
    //     close: _.noop
    // });
}
