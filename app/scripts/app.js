'use strict';

define([
    'modules/books_module'
  ],

  function(BooksModule) {
    return {
      BooksModule: BooksModule.start()
    };
  }
);
