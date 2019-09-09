//@ts-check
//!TODO:
//values in defaultSettings should be numbers so that math can be applied?
//  OR they should be strings so that unit can be defined? (%)
// document.body.onload()

//new game constructor
function Game(settingsObject, stringsObject){
  //takes two optional objects that update settings and strings respectively
  //set up engine console output
  this.log = function(text){console.log(this.strings.consoleText + text)};

  //default string text used by engine
  this.strings = {
    consoleText: "[js80]: ",
    initText: "building new game",
    startingText: "starting game",
  };
  if(stringsObject){
    for(i in stringsObject){
      this.strings[i] = stringsObject[i];
    };
  };

  //update console
  this.log(this.strings.initText);
  
//set up new game object
  //set up default settings
  this.settings = {
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
  };
  //update settings if settingsObject has been passed in
  if(settingsObject){
    for(i in settingsObject){
      this.settings[i] = settingsObject[i];
    };
  };

  this.DOM = {
    elements: {},
    new: function(type, name, parent, attributesObject){
      let newElement = document.createElement(type);
      this.DOM.elements[name] = newElement;
      if(attributesObject){
        for(i in attributesObject){
          newElement[i] = attributesObject[i];
        };
      };
      //change this to be useable by other elements (make it optional?)
      parent.insertBefore(this.DOM.elements.canvas, document.body.childNodes[0]);
    },
  };

  //build new game
  this.build = function(){
    this.log(this.strings.startingText);
    if(this.settings.canvas === {}){
      this.DOM.new("canvas", "canvas", document.body, {id: "gameCanvas"});
    }else{
      //find existing canvas and attach to DOM here

    };
    this.DOM.elements.canvas.setAttribute("width", this.settings.canvasWidth + 'px');
    this.DOM.elements.canvas.setAttribute("height", this.settings.canvasHeight + 'px');
    this.DOM.elements.canvas.style.border = "solid black";
    
    this.DOM.new("title", "title", document.head, {id: "title", src: this.settings.windowTitle});
  };
  //!this.build = this.build.bind(this);

  //data
  this.data = {};
};
