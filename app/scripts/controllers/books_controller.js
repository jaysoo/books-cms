'use strict';

define([
    'lodash',
    'ractive',

    'utils/object_utils'
  ],

  function(_, Ractive, ObjectUtils) {
    var BooksCtrl = Ractive.extend({
      template: null,

      init: function() {
        this.listeners = [];

        this.bindEvents();

        this.on('teardown', this.unbindEvents);
      },

      bindEvents: function() {
        this.listenTo(this.data.listView, 'showdetails', this.showDetails);
        this.listenTo(this.data.listView, 'addbook', this.addBook);
        this.listenTo(this.data.addView, 'cancel', this.cancelAdd);
        this.listenTo(this.data.addView, 'submit', this.submitAdd);
        this.listenTo(this.data.detailsView, 'closedetails', this.closeDetails);
      },

      listenTo: function(view, eventName, callback) {
        var listener = view.on(eventName, _.bind(callback, this));
        this.listeners.push(listener);
      },

      unbindEvents: function() {
        _.each(this.listeners, ObjectUtils.call('cancel'));
      },

      showDetails: function(e) {
        var book = e.context;
        this.data.detailsView.set('book', book);
        this.data.containerView.showDetails();
      },

      closeDetails: function() {
        this.data.containerView.showList();
      },

      addBook: function() {
        this.data.containerView.showAddForm();
      },

      cancelAdd: function() {
        this.data.containerView.hideAddForm();
      },

      submitAdd: function(e) {
        e.original.preventDefault();
      }
    });

    return BooksCtrl;
  }
);

