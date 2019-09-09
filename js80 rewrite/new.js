//default settings
let defaultSettings = {
  width: 480,
  height: 240,
  title: "title",
  frameRate: 60,
};

//engine methods
const engine = {
  build: function(width, height){},
};

//settingsObject constructor
function settings(width, height, frameRate, title){
  this.width = width;
  this.height = height;
  this.title = title;
  this.frameRate = frameRate;

};

//game object constructor
function Game(settingsObject){
  //set default settings
  this.settings = defaultSettings;
  //update settings if settingsObject is passed in
  if(settingsObject){
    for(i in settingsObject){
      this.settings[i] = settingsObject[i];
    };
  };
  let canvas = document.createElement("canvas");
  this.canvas = canvas;
  document.body.appendChild(this.canvas);
  this.canvas.style.width = this.settings.width;
  this.canvas.style.height = this.settings.height;
};