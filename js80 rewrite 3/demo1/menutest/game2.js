//Knowns;
// a menu is a data structure
// menu system has method for drawing a menu

//somewhere(in a scene?) there is a list of menus to draw

// a textbox is; ???
//  
// data 'flows through' a textbox, rather than the textbox statically holding the data
// how does this make a textbox different from a menu?

// ui
// ????

//a scene is a list of elements to be updated

//a game is a canvas and a list of one or more scenes, as well as references to engine utility methods

/*

game
  scenes
    scene
      components
        component
        ui component
          theme

*/

let game1 = engine.newGame();
let scene1 = game1.scenes.new();

let ui = {
  default: {},
  newTheme: function(){},
  newTextbox: function(){},
  newMenu: function(){},
};//ui

function drawBg(x, y, width, height, bgColor, borderColor){
  engine.render.rect(game1, x, y, width, height, bgColor);
  engine.render.rectb(game1, x, y, width, height, borderColor);
};

function drawTextbox(text, theme){
  drawBg(theme.x, theme.y, theme.width, theme.height, theme.bgColor, theme.borderColor);
  //construct text position

  //draw text

};

function newTheme(propObj){
  //!add reference to default theme settings
  let theme = {};
  theme.x = propObj.x || 0;
  theme.y = propObj.y || 0;
  theme.width = propObj.width;
  theme.height = propObj.height;
  theme.bgColor = propObj.bgColor;
  theme.borderColor = propObj.borderColor;
  theme.font = propObj.font;
  theme.fontSize = propObj.fontSize;
  theme.fontColor = propObj.fontColor;
  theme.lines = propObj.lines;
  theme.paddingTop = propObj.paddingTop;
  theme.paddingLeft = propObj.paddingLeft;
  theme.getInfo = function(){
    let info = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      bgColor: this.bgColor,
      borderColor: this.borderColor,
      font: this.font,
      fontSize: this.fontSize,
      fontColor: this.fontColor,
      lines: this.lines,
      paddingTop: this.paddingTop,
      paddingLeft: this.paddingLeft
    };
    return info;
  };
  return theme;
};

function newTextbox(text, theme){
  let textbox = {};
  textbox.text = text;
  textbox.theme = theme.getInfo();
  textbox.draw = function(){
    drawTextbox(textbox.theme);
  };
  return textbox;
};

function drawMenu(text, theme, options){
  //construct text position

  //construct options position

  //draw bg

  //draw text

  //draw options

};

let theme1 = newTheme({
  x: 30,
  y: 30,
  width: 30,
  height: 30,
  bgColor: 'green',
  borderColor: 'grey',
  font: 'ariel',
  fontSize: 12,
  fontColor: 'white',
  lines: 3,
  paddingTop: 20,
  paddingLeft: 20
});

let textbox1 = newTextbox('this is a textbox', theme1);

game1.frame = function(){
  game1.update();
  textbox1.draw();
};//game1.frame()
game1.start();