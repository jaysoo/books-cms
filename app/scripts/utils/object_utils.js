'use strict';

define(function() {
  return {
    call: function(functionName) {
      return function(obj) {
        obj[functionName].call();
      };
    }
  };
});
