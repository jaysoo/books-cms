'use strict';

define([
    'ractive',
    'services/books_service',
    'utils/update_utils',
    'views/books_table'
  ],

  function(
    Ractive,
    BooksService,
    UpdateUtils,
    BooksTable
  ) {

    return {
      start: function() {
        this.booksTable = new BooksTable();

        BooksService.all().done(UpdateUtils.setter(this.booksTable, 'books'));

        return this;
      },

      stop: function() {
        this.booksTable.tearDown();
      }
    };
  }
);
