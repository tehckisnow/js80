//!TODO:
//values in defaultSettings should be numbers so that math can be applied?
//  OR they should be strings so that unit can be defined? (%)
// document.body.onload()

//new game constructor
function Game(settingsObject){
  js80.log(js80.strings.initText);
  //set up new game object
  this.settings = settingsObject || js80.settings;
  this.start = js80.start;
  //assign settings
  for(i in settingsObject){
    this.settings[i] = settingsObject[i];
    //!Could cause a problem if this.settings[i] doesn't exist?
  };
  this.data = {};
};

//global engine single-instance object (like Math object)
let js80 = {
  //default settings used if a settings object is not passed to game constructor
  settings: {
    canvas: {},
    gameCanvasName: "gameCanvas",
    canvasWidth: 480,
    canvasHeight: 240,
    frameRate: 60,
    frameInterval: function(){return 1000 / this.frameRate},
    windowTitle: "js80",
    renderBezel: true,
    theme: {
      font: "Ariel",
      fontSize: "12px",
    },
  },
  strings: {
    consoleText: "[js80]: ",
    initText: "building new game",
    startingText: "starting game",
  },
  data: {
    canvas: {},
  },
  log: function(text){console.log(js80.strings.consoleText + text)},
  start: function(){
    js80.log(js80.strings.startingText);
    //initialize
    //set up canvas
    if(this.settings.canvas === {}){
      //create new canvas
      js80.dom.newCanvas();
    }else{};
    //set up interval and call main game loop
  },
  dom: {
    new: function(){},
    newCanvas: function(){
      let newCanvas = document.createElement("canvas");
      newCanvas.setSize = function(width, height){
        newCanvas.setAttribute("width", width);
        newCanvas.setAttribute("height", height);
      };
      newCanvas.setSize(js80.settings.canvasWidth, js80.settings.canvasHeight);

      newCanvas.setAttribute("id", this.settings.gameCanvasName);
      document.body.appendChild(newCanvas);
      this.settings.canvas = newCanvas;
      return newCanvas;
    },
    buildBezel: function(){},
  },

};