'use strict';

define(function() {
  var helpers = function(obj) {
    return {
      set: function(keypath) {
        return function(data) {
          obj.set(keypath, data);
        };
      }
    };
  };

  return {
    on: function(obj) {
      return helpers(obj);
    }
  };
});
