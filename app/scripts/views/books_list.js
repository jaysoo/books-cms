'use strict';

define([
    'ractive',
    'text!templates/books_list.html'
  ],

  function(Ractive, BooksListHtml) {

    var BooksList = Ractive.extend({
      template: BooksListHtml,

      data: {
        // Empty initially
        books: [],

        shouldCreateNewRow: function(num) {
          return num % 4 === 3;
        }
      }
    });

    return BooksList;
  }
);
