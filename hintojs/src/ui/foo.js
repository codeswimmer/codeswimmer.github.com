
(function(exports){
  'use strict';

  exports.create = function() { 
    this.prototype = Function.prototype;
    var that = {};
    that.bar = function() {return 'bar';};
    console.log('foo.create()');
    return that;
  };
  
  exports.test = function(){ return undefined; };

})(typeof exports === 'undefined'? this.Foo=function(){return Foo.create();}: exports);
