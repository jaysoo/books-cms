'use strict';

define([
    'ractive',
    'text!templates/books_table.html'
  ],

  function(Ractive, BooksTableHtml) {

    var BooksTable = Ractive.extend({
      el: 'books',
      template: BooksTableHtml
    });

    return BooksTable;
  }
);
