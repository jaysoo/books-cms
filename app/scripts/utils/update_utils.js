'use strict';

define(function() {
  return {
    setter: function(ractive, keypath) {
      return function(data) {
        ractive.set(keypath, data);
      };
    }
  };
});
