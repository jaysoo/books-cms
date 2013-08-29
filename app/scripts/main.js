'use strict';

require.config({
  shim: {
    lodash: {
      exports: '_'
    },
    ractive: {
      exports: 'Ractive'
    },
    base64: {
      exports: 'Base64'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    }
  },
  paths: {
    jquery: '../bower_components/jquery/jquery',
    lodash: '../bower_components/lodash/lodash',
    ractive: '../bower_components/Ractive/ractive',
    bootstrap: 'vendor/bootstrap',
    text: '../bower_components/requirejs-text/text',
    base64: '../bower_components/js-base64/base64'
  }
});

require(['app']);
