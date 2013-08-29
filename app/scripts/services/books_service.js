'use strict';

define(['jquery', 'lodash'], function($, _) {
  var localStorage = window.localStorage;

  return {
    all: function() {
      var promise = $.Deferred();
      var ids = localStorage.getItem('books') || '[]';
      var books = [];

      ids = JSON.parse(ids);
      _.each(ids, function(id) {
        var book = JSON.parse(localStorage.getItem('books:' + id));
        books.push(book);
      });

      promise.resolve(books);

      return promise;
    },

    create: function(data) {
      var promise = $.Deferred();

      var id = localStorage.getItem('next:id') || '1';
      localStorage.setItem('next:id', Number(id) + 1);

      var ids = localStorage.getItem('books') || '[]';
      ids = JSON.parse(ids);
      ids.push(id);
      localStorage.setItem('books', JSON.stringify(ids));

      data.id = id;
      localStorage.setItem('books:' + data.id, JSON.stringify(data));
      promise.resolve(data);
      return promise;
    }
  };
});
