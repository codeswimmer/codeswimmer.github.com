(function(exports){
  'use strict';

  exports.create = function(name) { 
    var _container = new createjs.Container();
    _container.name = name;

    var that = { 
      get name() {return _container.name;},
      get type() {return 'container'},
      get container() {return _container}
    };

    that.addToStage = function(stage) { stage.addChild(_container); };

    that.addChild = function(child) { 
      var isaShape = isa('shape', function(){return true;});
      if (isaShape(child))
        _container.addChild(child.shape);
      else
        _container.addChild(child);
    };
    
    return that;
  };
})(typeof exports === 'undefined'? this.Container=function(name){return Container.create(name)}: exports);
