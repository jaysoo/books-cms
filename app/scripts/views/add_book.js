'use strict';

define([
    'ractive',
    'text!templates/add_book.html'
  ],

  function(Ractive, AddBookHtml) {

    var AddBook = Ractive.extend({
      template: AddBookHtml,

      data: {}
    });

    return AddBook;
  }
);
