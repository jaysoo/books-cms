'use strict';

define([
    'ractive',
    'text!templates/books_container.html'
  ],

  function(Ractive, BooksContainerHtml) {

    var BooksContainer = Ractive.extend({
      template: BooksContainerHtml,

      showDetails: function() {
        this.nodes.booksSlidebox.slideTo(2);
      },

      showList: function() {
        this.nodes.booksSlidebox.slideTo(1);
      },

      showAddForm: function() {
        this.nodes.booksSlidebox.slideTo(0);
      },

      hideAddForm: function() {
        this.nodes.booksSlidebox.slideTo(1);
      }
    });

    return BooksContainer;
  }
);

