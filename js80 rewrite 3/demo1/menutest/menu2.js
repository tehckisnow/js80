//TODO:
//should options' position be handled in menu? or is that a task for textbox?
//!menu header offset (centering)

let engine = {
  ui: {
    textbox:{
      new: function(){
        let textbox = {};
        return textbox;
      },
    },

    menu:{
      new: function(header, options, indicator, theme, themeMods){
        let menu = {};
        menu.header = header || "";
        menu.theme = theme;
        menu.active = false;
        let leftMargin = menu.theme.topMargin || 0;
        let topMargin = menu.theme.topMargin || 0;
        let verticalSpacing = menu.theme.verticalSpacing || menu.theme.fontSize || 10;
        let headerSpace = verticalSpacing;
        if(menu.header == ""){verticalSpacing = 0};
        //! theme
        for(i in mods){
          menu.theme.themeMods[i] = themeMods[i];
        };

        //! indicator
        menu.indicator = indicator || '';
        
        menu.updateOptions = function(){
          let currentPosition = 0;
          menu.options = [];
          for(i in options){
            let curr = options[i];
            //! if vertical:
            let currentX = (verticalSpacing * currentPosition) + topMargin + headerSpace;
            let currentY = leftMargin;
            menu.options.push(engine.ui.menu.newOption(curr.text, curr.effect, curr.closePrevMenu, currentX, currentY));
            currentPosition++;
          };
        };//menu.updateOptions()
        menu.updateOptions();
        
        menu.draw = function(){
          if(menu.theme.bgColor){};
          if(menu.theme.border){};
          if(menu.theme.bgImage){};
          //! if vertical (this may not be necessary)
          if(menu.header !== ""){};
          for(i in menu.options){};
          if(menu.drawIndicator){};
        };//menu.draw()
        menu.open = function(){
          menu.active = true;
        };//menu.open()
        menu.close = function(){
          menu.active = false;
        };//menu.close()
        menu.next = function(){
          menu.indicator.currentOption++;
        };//menu.next()
        menu.prev = function(){
          menu.indicator.currentOption--;
        };//menu.prev()
        menu.select = function(){
          menu.options[menu.indicator.currentOption].effect();
        };//menu.select()
        menu.update = function(){
          if(menu.active){
            //menu.updateOptions();//! remove this? (only update when menu changes?)
            menu.draw();
          };
        };//menu.update()
        return menu;
      },//new()
      newOption: function(text, effect, closePrevMenu, x, y){
        let option = {};
        option.text = text || "-";
        option.effect = effect || function(){};
        option.closePrevMenu = closePrevMenu || false;
        //!option theme!
        option.x = x || 0;
        option.y = y || 0;
        return option;
      },//newOption
      newIndicator: function(funct, xOffset, yOffset){
        let indicator = {};
        indicator.currentOption = 0;
        indicator.x = 0;
        indicator.y = 0;
        indicator.optionOffsetX = xOffset || 0;
        indicator.optionOffsetY = yOffset || 0;
        indicator.funct = funct;
        indicator.draw = function(){
          //calculate relative position and apply x/y offset
          //!

        };
        return indicator;
      },//newIndicator()
      defaultIndicator: engine.ui.menu.newIndicator(function(){
        //draw arrow
        //!
      }, -10, -10),
      update: function(game){
        //get current scene's list of active menus and iterate through

      },//update()
    },//menu
  },//ui
};//engine

let mainMenuTheme = engine.iu.menu.newTheme({
  x: 20, y: 20,
  width: 200, height: 200,
  bgColor: 'blue', bgImage: '',
  border: true, borderColor: 'white',
  font: 'ariel', fontSize: '14', fontColor: 'white', 
  lines: 4,
  text: '', charLength: 30,
  handleOverflow: true, overflowIcon: function(){},
  render: false,
  drawIndicator: true
});

function newGame(){console.log('new')};
function loadGame(){console.log('load')};

let mainMenu = engine.ui.menu.new([
  'main menu',
  {text: 'new', effect: function(){newGame()}, closePrevMenu: true},
  {text: 'load', effect: function(){loadGame()}, closePrevMenu: true}
  ], 
  'default',
  mainMenuTheme
);

/*

textbox(text, theme, mods)

menu(options, indicator, theme, mods)
x, y, 
indicator
theme, (width, height, bgcolor
options
  text
  function
  optiontheme?
  x, y

menu:
  open
  close
  next
  prev
  select

*/