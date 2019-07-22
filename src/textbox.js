//consider how to incorporate render system and entity system
//consider referencing data in theme instead of copying everything over in to textbox
//textbox.drawAllTextboxes should sort based on z-axis before drawing OR use render system.
//should positions be an attribute of themes, textboxes, or both?
//instead of having the 'global' textbox.textboxes, consider each controller having it's own textboxes array, and can control multiple textboxes
//    this would make controllers mandatory(is that ok?)

let textbox = {

	//holds themes
  themes: {default: textbox.defaultTheme},
  //default theme used if no other is specified.  also used as template for new themes.
  defaultTheme: {
    name: "default",
    x: 0, y: 0, z: 0, width: 100, height: 100,
    backgroundColor: "blue", borderColor: "white",
    font: "ariel", fontSize: 14, fontColor: "white",
    lines: 4, lineLength: 40, //(this was called CharLength in orig)
    positions: [],
    verticalOffset: 10, horizontalOffset: 10,
    text: "",
    handleOverflow: true,
    overflowIcon: {xOffset: 10, yOffset: 10, draw: function(){}},
  },
  //default theme if specified in gamefile
  gameDefault: {},

  //position constructor for themes
  newPosition: function(xOffset, yOffset){}, //! finish this!
  //? what else do positions have? background style or image? height and width? font size, style, and color?

  //pass an object of properties modifying the new theme
	newTheme: function(settings){
    //start with default theme (or gameDefault if specified)
    let newTheme = {};
    textbox.themes.gameDefault ? Object.assign(newTheme, textbox.themes.gameDefault) : Object.assign(newTheme, textbox.defaultTheme);
    //modify theme based on properties in the options argument object
    Object.assign(newTheme, settings);
    //adds theme to textbox.themes and then returns the theme for reference
		textbox.themes.push(newTheme);
		return newTheme;
  },//newTheme()

	//holds textboxes
  textboxes: [],
  //textbox constructor
	newTextbox: function(text, theme, settings){
    let newTextbox = {};

    function setTheme(theme){
      newTextbox.theme = theme;
      Object.assign(newTextbox, theme);
    };

    //if a theme is passed in, use it.
    //if not, or if the string, "default", is passed in, check for a gameDefault.
    //if that has not been created, use default as last resort.
    if(theme && theme !== "default"){
      setTheme(theme);
    }else if(textbox.themes.gameDefault){
      setTheme(textbox.themes.gameDefault);
    }else{
      setTheme(textbox.themes.default);
    };
    
    //override theme with any properties passed in through settings object
    if(settings){
      Object.assign(newTextbox, settings);
    };

    //assign text
    if(text){
      newTextbox.text = text;
    };
    //add textbox-specific functionality
    newTextbox.overflow = "";
    newTextbox.advance = function(){}; //! finish this!
    newTextbox.remove = function(){}; //! finish this!
    
    //push to textbox.textboxes and return newTextbox
    textbox.textboxes.push(newTextbox);
    return newTextbox;
  },//newTextbox()

  //controller contructor; offers optional persistent management of textboxes.
  newController: function(){
    let newController = {};
    newController.on = false;
    newController.textbox = {};
    newController.write = function(text, theme, settings){}; //! finish this!
    newController.advance = function(){}; //! finish this!
    newController.close = function(){}; //! finish this!
    newController.switchTheme = function(theme){}; //!
    return newController;
  },

  //system methods for manually managing textboxes
  removeTextboxByIndex: function(index){},
  drawTextbox: function(textbox){},
  drawAllTextboxes: function(){},
};

/*
let textbox = {
  themes: {},
  //controllers: [],
  //textboxes: [],
  newTheme: function(){},
  newController: function(){},
  newTextbox: function(){},

};

developer can call textbox.new() to manually draw a textbox to the screen for more nuanced or customized control
developer can call textbox.newController() to create a controller object to easily manupulate textboxes automatically

 */