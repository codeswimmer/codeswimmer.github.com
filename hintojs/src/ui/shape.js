(function(exports){
  'use strict';

  exports.create = function(spec) {
    var _name = existy(spec) ? spec.name : 'Shape';
    var _bounds = existy(spec) ? spec.bounds : new createjs.Rectangle(0, 0, 100, 100);
    var _backgroundColor = existy(spec) && existy(spec.backgroundColor) ? spec.backgroundColor : '#777777';
    var _visible = existy(spec) && existy(spec.visible) ? spec.visible : true;
    var _alpha = existy(spec) && existy(spec.alpha) ? spec.alpha : 1;
    var _shape = new createjs.Shape();
    _shape.alpha = _alpha;
    _shape.name = _name;

    var that = { 
      get type() {return 'shape'},
      get shape() {return _shape} 
    };

    that.render = function() {
      _shape.graphics.beginFill(_backgroundColor)
        .drawRect(_bounds.x, _bounds.y, _bounds.width, _bounds.height);
    }

    if (_visible)
      that.render();

    return that;
  };

})
(typeof exports === 'undefined' ? 
  this.Shape = function(spec){return Shape.create(spec);}: exports);
