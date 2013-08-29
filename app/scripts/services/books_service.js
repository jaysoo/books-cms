'use strict';

define(['jquery'], function($) {
  return {
    all: function() {
      return $.get('fixtures/books.json');
    }
  };
});
