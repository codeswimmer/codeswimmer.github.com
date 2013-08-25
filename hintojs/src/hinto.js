(function(exports){
  'use strict';

  exports.create = function(canvas, editor) { 
    this.prototype = Function.prototype;

    var that = { 
      get canvas(){return _canvas;},
      get editor(){return _editor;}
    };

    that.initialize = function() {configureHomeScreen();};
    that.updateHomeScreenBackgroundText = function(text) {_homeScreen.updateBackgroundText(text);};

    function configureHomeScreen() {
      var spec = {"canvas":canvas, "options":_options};
      _homeScreen = HomeScreen(spec);
      _homeScreen.initialize();
    }

    var _canvas
      , _editor
      , _homeScreen
      , _options = {};

    return that;
  };

  // 'static' functions  
  exports.test = function(thing){return thing;};

  exports.hinto = undefined;
})(typeof exports === 'undefined'? this.HintoJS={}: exports);

