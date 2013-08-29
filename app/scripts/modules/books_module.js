'use strict';

define([
    'ractive',

    'controllers/books_controller',
    'services/books_service',
    'utils/update_utils',

    'views/add_book',
    'views/books_container',
    'views/books_list',
    'views/book_details'
  ],

  function(
    Ractive,

    BooksCtrl,
    BooksService,
    UpdateUtils,

    AddBook,
    BooksContainer,
    BooksList,
    BookDetails
  ) {

    return {
      start: function() {
        this.booksContainer = new BooksContainer({
          el: 'booksContainer'
        });

        this.addBook = new AddBook({
          el: 'addBook'
        });

        this.booksList = new BooksList({
          el: 'booksList'
        });

        this.bookDetails = new BookDetails({
          el: 'booksDetails'
        });

        this.booksCtrl = new BooksCtrl({
          data: {
            containerView: this.booksContainer,
            addView: this.addBook,
            listView: this.booksList,
            detailsView: this.bookDetails
          }
        });

        BooksService.all().done(UpdateUtils.on(this.booksList).set('books'));

        return this;
      },

      stop: function() {
        this.addBook.teardown();
        this.booksDetails.teardown();
        this.booksList.teardown();

        this.booksContainer.teardown();

        this.booksListCtrl.teardown();
      }
    };
  }
);
