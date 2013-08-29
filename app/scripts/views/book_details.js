'use strict';

define([
    'ractive',
    'text!templates/book_details.html'
  ],

  function(Ractive, BookDetailsHtml) {

    var BookDetails = Ractive.extend({
      template: BookDetailsHtml,

      data: {
        // Empty initially
        book: {}
      }
    });

    return BookDetails;
  }
);

