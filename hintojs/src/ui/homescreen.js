(function(exports){
  'use strict';
  
  exports.create = function(spec) {
    var that = Container.create('HomeScreen');
    var _canvas = (existy(spec) && existy(spec.canvas)) ? spec.canvas : fail('HomeScreen needs canvas');
    var _stage = new createjs.Stage(canvas);
    var _options = {};
    var _sizes = {};

    var backgroundText = new createjs.Text("hinto-easlejs", "24px Courier", "#ddd");

    that.initialize = function() {
      configureTicker();
      configureSizes();
      configureBackgroundText();
      configurePanels();

      _stage.update();
    }

    function configureStage() {
      _stage.enableMouseOver();
      _stage.mouseMoveOutsize = true;
    }

    function configureTicker() {
      createjs.Ticker.addEventListener("tick", function(event) {
        _stage.update();
      });
      createjs.Ticker.setFPS(16);
    }

    function configureSizes() {
      _sizes.quarterHeight = _canvas.height / 4;
      _sizes.quarterWidth = _canvas.width / 4;
      _sizes.eighthHeight = _sizes.quarterHeight / 2;
      _sizes.eighthWidth = _sizes.quarterWidth / 2;
      _sizes.sixteenthHeight = _sizes.eighthHeight / 2;
      _sizes.sixteenthWidth = _sizes.eighthWidth / 2;
    }

    function configureBackgroundText() {
      positionBackgroundText();
      _stage.addChild(backgroundText);
    }

    function configurePanels(){
      var panels = new Container('HomeScreen.Panels');
      var width = _sizes.eighthWidth
        , height = _canvas.height;

      panels.addChild(createAndConfigureLeftPanel());
      panels.addChild(createAndConfigureRightPanel());

      panels.addToStage(_stage);
    }

    function createAndConfigureLeftPanel() {
      var container = new Container('leftPanel');
      configurePreloadQueue(container);
      return container.container;
    }

    function configurePreloadQueue(container) {
      var queue = new createjs.LoadQueue(true);
      
      queue.addEventListener("complete", function(event) {
        onPreloadComplete(event, container);
      });

      queue.loadManifest([
          {id: "closeButtonImage", src:"./res/images/circle-southwest.png"},
          {id: "closeButtonImage", src:"./res/images/circle-northeast.png"}
      ]);
    }

    function onPreloadComplete(event, container) {
      var closeImage = event.target.getItem('closeButtonImage');

      var width = _sizes.eighthWidth
        , height = _canvas.height
        , leftPanel = createPanel('leftPanel', '#973700', 0, 0, width, height)
        , closeButton = configureCloseButton(width)
        , openButton = configureOpenButton();

      container.addChild(leftPanel);
      container.addChild(closeButton);
      container.addChild(openButton);

      configureOpenCloseButtonListeners(closeButton, openButton, container);
    }

    function configureCloseButton(width) {
      var closeButton = new createjs.Bitmap('./res/images/circle-southwest.png');
      closeButton.x = width - 28 - 5;
      closeButton.y = 5;
      closeButton.alpha = 0.65;
      return closeButton;
    }

    function configureOpenButton() {
      var openButton = new createjs.Bitmap('./res/images/circle-northeast.png');
      openButton.x = 10;
      openButton.y = 10;
      openButton.alpha = 0.65;
      openButton.visible = false;
      return openButton;
    }

    function configureOpenCloseButtonListeners(closeButton, openButton, container) {
      closeButton.addEventListener('click', function(event) {
        closeLeftPanel(container, closeButton, openButton);
      });
      openButton.addEventListener('click', function(event){
        openLeftPanel(container, openButton, closeButton);
      });
    }

    function createAndConfigureRightPanel() {
      var rightPanelX = _canvas.width - _sizes.quarterWidth
        , width = _sizes.quarterWidth
        , height = _canvas.height;

      // rightPanel is not visible, for now
      return createPanel('rightPanel', '#973797', rightPanelX, 0, width, height, false);
    }

    function closeLeftPanel(leftPanel, closeButton, openButton) {
      var toX = -_sizes.eighthWidth + 36
        , toY = _canvas.height - _sizes.sixteenthHeight + 8;
      createjs.Tween.get(leftPanel.container)
                    .wait(0)
                    .to({x:toX, y:toY}, 250)
                    .call(function(tween) {
                      _options.isLeftPanelClosed = true;
                      closeButton.visible = false;
                      openButton.visible = true;
                    });
      createjs.Tween.get(closeButton)
                    .wait(0)
                    .to({alpha:0}, 125)
                    .call(function(tween){
                      openButton.x = closeButton.x;
                      openButton.y = closeButton.y;
                      createjs.Tween.get(openButton)
                                    .wait(0)
                                    .to({alpha:0.65}, 125)
                                    .call(function(tween){
                                      openButton.visible = true;
                                    });
                    });
    }

    function openLeftPanel(leftPanel, openButton, closeButton) {
      createjs.Tween.get(leftPanel.container)
                    .wait(0)
                    .to({x:0, y:0}, 250)
                    .call(function(tween) {
                      _options.isLeftPanelClosed = false;
                    });
      createjs.Tween.get(openButton)
                    .wait(0)
                    .to({alpha:0}, 125)
                    .call(function(tween){
                      openButton.visible = false;
                      closeButton.x = openButton.x;
                      closeButton.y = openButton.y;
                      createjs.Tween.get(closeButton)
                                    .wait(0)
                                    .to({alpha:0.65}, 125)
                                    .call(function(tween){
                                      closeButton.visible = true;
                                    });
                    });
    }

    function createPanel(name, backgroundColor, x, y, width, height, visible) {
      return new Shape({
        name:name, 
        bounds:new createjs.Rectangle(x, y, width, height), 
        backgroundColor:backgroundColor, 
        visible:visible, 
        alpha:0.65});
    }

    that.updateBackgroundText = function(text) {
      backgroundText.text = text;
      _stage.update();
    };

    function enterEditMode(x, y, text) {
      var point = new createjs.Point(x, y);
      editModeCallback(point, text); 
    }

    function displayText(message) {
      backgroundText.text = message;
      positionBackgroundText();
    }

    function positionBackgroundText() {
      var x, y, textWidth, textHeight;
      textWidth = backgroundText.getMeasuredWidth();
      textHeight = backgroundText.getMeasuredHeight();
      x = 50;
      y = (_canvas.height - textHeight) / 2;
      backgroundText.x = x;
      backgroundText.y = y;

      backgroundText.addEventListener('click', 
        function(event){
          event.nativeEvent.preventDefault();
          enterEditMode(backgroundText.x, backgroundText.y, backgroundText.text);
        });
    }

    Object.defineProperty(that, 'canvas', {
      get : function() {return _canvas;},
      enumerable : true
    });

    return that;
  };
})
(typeof exports === 'undefined' ? 
  this.HomeScreen = function(spec){return HomeScreen.create(spec);} : 
  exports);
