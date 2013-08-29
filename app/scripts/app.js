'use strict';

define([
    'lodash',
    'utils/object_utils',
    'modules/books_module'
  ],

  function(_, ObjectUtils, BooksModule) {
    var App = {
      modules: {
        Books: BooksModule.start()
      },

      teardown: function() {
        _.each(this.modules, ObjectUtils.callOn('teardown'));
      }
    };

    return App;
  }
);
