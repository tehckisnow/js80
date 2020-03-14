//! add char length to options
//! options should check menu theme if parameters are not specified (such as font color)
//! set delay timer (or some other method) to lower max rate of moving through/selecting menu options
//! ensure menus are nestable (menu manager)
//! handle closePreviousMenu

let game1 = engine.newGame();
let scene1 = game1.scenes.new();

//centered: (menu.width / 2) - ((text.length / 2) * charWidthInPixels)

//!move customizations (like handling x and y offset) from engine to indicator?
let indicator = {
  xOffset: -12,
  yOffset: -8,
  color: 'white',
  scale: 10,
  draw: function(game, x, y, scale, color){
    engine.render.line(game, x, y, x + scale, y + (scale / 2), color);
    engine.render.line(game, x + scale, y + (scale / 2), x, y + scale, color);
    engine.render.line(game, x, y + scale, x, y, color);
  },
};

let defaultMenuTheme = engine.ui.menu.newMenuTheme({
  x: 10, y: 10,
  width: 200, height: 150,
  bgColor: 'blue', bgImage: '',
  border: true, borderColor: 'white',
  font: 'ariel', fontSize: '14', fontColor: 'white', 
  vertical: true, //! rename?
  leftMargin: 20,
  topMargin: 10,
  verticalSpacing: 20,
  headerX: 50, headerY: 20, spacingAfterHeader: 10,
  //!!!
  headerColor: 'yellow', headerFont: 'ebrima', headerFontSize: '40',
  render: false,
  drawIndicator: true,
  indicator: indicator,
});

function newGame(){console.log('new')};
function loadGame(){console.log('load')};
function options(){menuManager.addMenu(optionsMenu);optionsMenu.open()};
function quit(){console.log('quit')};

let optionTheme1 = {color: 'white', font: 'ariel', fontSize: '16'};

let mainMenu = engine.ui.menu.new(
  game1,
  'main menu',
  [
  {text: 'new', effect: function(){newGame()}, closePrevMenu: true, theme: optionTheme1},
  {text: 'load', effect: function(){loadGame()}, closePrevMenu: true, theme: optionTheme1},
  {text: 'options', effect: function(){options()}, closePrevMenu: false, theme: optionTheme1},
  {text: 'quit', effect: function(){quit()}, closePrevMenu: true, theme: optionTheme1},
  ], 
  defaultMenuTheme
);

let menuManager = engine.ui.menu.manager(game1);

let optionsMenu = menuManager.newMenu(
  'options', [
    {text: 'difficulty', effect: function(){}, closePrevMenu: false, theme: optionTheme1},
    {text: 'volume', effect: function(){}, closePrevMenu: false, theme: optionTheme1},
    {text: 'automatically win', effect: function(){}, closePrevMenu: false, theme: optionTheme1},
  ], defaultMenuTheme);
optionsMenu.theme.x = 150;

function next(menuManager){menuManager.getCurrent().next()};
function prev(menuManager){menuManager.getCurrent().prev()};
function select(menuManager){menuManager.getCurrent().select()};
function back(menuManager){menuManager.closeMenu()};

let inputManager = engine.input.newManager(game1);
game1.input = inputManager;
let menuMode = inputManager.newMode('menu');
inputManager.setMode(menuMode);
menuMode.newKey('w', function(){prev(menuManager)});
menuMode.newKey('s', function(){next(menuManager)});
menuMode.newKey('Enter', function(){select(menuManager)});
menuMode.newKey('Esc', function(){});

mainMenu.open();
menuManager.menus.push(mainMenu);

game1.frame = function(){
  game1.update();
  menuManager.drawMenus(game1);
  //mainMenu.update(game1);
  //engine.render.rect(game1, 29, 20, 299, 200, 'blue');
  //mainMenu.theme.indicator.draw(game1, 20, 20, 10, 'white');
};
game1.start();

//mainMenu.update(game1);
//mainMenu.draw(game1);