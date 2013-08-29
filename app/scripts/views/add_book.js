'use strict';

define([
    'base64',
    'ractive',
    'text!templates/add_book.html'
  ],

  function(Base64, Ractive, AddBookHtml) {

    var AddBook = Ractive.extend({
      template: AddBookHtml,
      data: {},

      init: function() {
        this.on('upload', _.bind(this.upload, this));
      },

      upload: function (e) {
        var evt = e.original;
        var files = evt.target.files; // FileList object
        var self = this;

        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

          // Only process image files.
          if (!f.type.match('image.*')) {
            continue;
          }

          var reader = new FileReader();

          // Closure to capture the file information.
          reader.onload = (function(theFile) {
            return function(e) {
              // Render thumbnail.
              var data = e.target.result;
              self.set('image_url', data);
            };
          })(f);

          // Read in the image file as a data URL.
          reader.readAsDataURL(f);
        }
      }
    });

    return AddBook;
  }
);
