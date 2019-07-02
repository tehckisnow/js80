//1. text/dialogue test
//2. menu test

//box (x, y, w, h, bg
//border (spacing, x, y, w, h, color, style/width
//text (text, x, y, color, size, font, lineLength, numberOfLines, spacing
//write (box(), border(), text())

//pause
//change control mode
//typewriter animation
//speed
//dropshadow (for box and for text
//"more text" icon

//text units:
  // conversation (a series of messages triggered at one time.  cutscene, or when examining an object)
  // messages (an entire message.  may be made up of multiple lines and screens, depending on length)
  // screens (all the lines that can be printed on the current screen)
  // lines (one line of text [ x letters] )
  // chunks (one or more letters.  used for typewriter effect.  might replace with "letter")
//styles: default: lines: 3,
//styles default: textWidth: 42 //character width
//calculateTextWidth(font, fontsize, boxWidth)//how does this determine the width of a font?

//support both automatically calculated lines as well as automatically calculated spacing as two alternatives

//line spacing (spacing between lines)
//top margin spacing (space between top of box and first line of text)
//left margin spacing (space b)
//borderSpacing (used instead of top margin and left margin)
//
//method for automatic spacing (equidistant, divide box height by number of lines and subtract font height (and add spacing))

//text manager object
let text = {
  dialogue: [],
  currentDialogue: [],
  //styles
  styles: {
      default: {
        x: 20,//text.default.outsideSpacing,
        y: 20,
        spacing: 25,
        borderSpacing: 20,
        width: 400,
        height: 100,
        background: "blue",
        border: "2px",
        borderColor: "white",
        font: "ariel",
        size: 20,
        color: "white",
        rows: 3,
        rowLength: 29,
    },
  },
  newStyle: function(){},

  //!
  new: function(sometext){
    text.dialogue.push(sometext);
  },
  //
  useStyle: function(style){
    if(style == undefined || style === 0) return "default";
  },
  drawBox: function(style, x, y, h, w){
    //check for defaults and custom
    let useX;
    let useY;
    let useH;
    let useW;
    if(x != undefined){useX = x}else {useX = text.styles[text.useStyle(style)].x};
    if(y != undefined){useY = y}else {useY = text.styles[text.useStyle(style)].y};
    if(w != undefined){useW = w}else {useW = text.styles[text.useStyle(style)].width};
    if(h != undefined){useH = h}else {useH = text.styles[text.useStyle(style)].height};
    //draw box
    js80.rect(useX, useY, useW, useH, text.styles[text.useStyle(style)].background);
    js80.rectb(useX, useY, useW, useH, text.styles[text.useStyle(style)].borderColor);
  },
  text: function(sometext, style, x, y, h, w){
    //!duplicate code: create new function? or merge text with drawbox?
    //check for defaults and custom
    let useX;
    let useY;
    let useH;
    let useW;
    if(x != undefined){useX = x}else {useX = text.styles[text.useStyle(style)].x};
    if(y != undefined){useY = y}else {useY = text.styles[text.useStyle(style)].y};
    if(w != undefined){useW = w}else {useW = text.styles[text.useStyle(style)].width};
    if(h != undefined){useH = h}else {useH = text.styles[text.useStyle(style)].height};
    //draw text
    js80.text(sometext, useX + text.styles[text.useStyle(style)].spacing, useY + text.styles[text.useStyle(style)].spacing, text.styles[text.useStyle(style)].color, text.styles[text.useStyle(style)].size, text.styles[text.useStyle(style)].font);
  },
  //draws textbox and text to screen
  box: function(sometext, style, x, y, h, w){
    text.drawBox(style, x, y, h, w);
    //write text if any
    if(sometext) text.text(sometext, style, x, y, h, w);
  },
  //breaks text up into lines, controls states, and optionally
  write: function(message, style, x, y, h, w, typeSpeed){
    //check for defaults and custom
    let useX;
    let useY;
    let useH;
    let useW;
    if(x != undefined){useX = x}else {useX = text.styles[text.useStyle(style)].x};
    if(y != undefined){useY = y}else {useY = text.styles[text.useStyle(style)].y};
    if(w != undefined){useW = w}else {useW = text.styles[text.useStyle(style)].width};
    if(h != undefined){useH = h}else {useH = text.styles[text.useStyle(style)].height};
    //!break output up into lines and calculate fontsize

      //determine line length
    let charWidth = text.styles[text.useStyle(style)].size / 2.5;
      //line length ( in characters)
    let lineLength = Math.floor((useW - (2 * (text.styles[text.useStyle(style)].borderSpacing))) / charWidth);
      //determine number of lines in current message
    let numberOfLinesInMessage = message.length / lineLength
      
      //divide up message into lines and store
    let current = 0;
    let lines = [];
    while (numberOfLinesInMessage > 0){
      lines.push(message.slice(current, current + lineLength));
      current += lineLength;
      numberOfLinesInMessage--;
    };
    for(i in lines){
      text.dialogue.push(lines[i]);
    };

    //draw first line, second line, etc
    text.box(text.dialogue[0], style, useX, useY);
    text.text(text.dialogue[1], style, useX, useY + text.styles[text.useStyle(style)].spacing);
    text.text(text.dialogue[2], style, useX, useY + text.styles[text.useStyle(style)].spacing + text.styles[text.useStyle(style)].spacing);
      //draw additional message icon if overflow
    if(text.dialogue.length > 3) console.log("more"); //this wont work right for now because text.write() is called every frame


  },
  //create/display a new menu
  menu: function(name, text, choices, effects, x, y, w, h){},//add menu defaults into style
};

function init(){};

function frame(){
  js80.cls();
  //text.box("text!");
  text.write("So this is a story all about how my life got flipped, turned upside down!");
};

//text.queue = [];

//text.update(){
//  
//}

// in game loop
//    text()
//function text(){
  //if(text.draw === true){
    //pause/game state
    //text.write()
  //}

/*

text.dialogue = [];

if(btn(0)) text.advance();


function advance(){
  text.dialogue.pop()
  if(text.dialogue.length < text.styles.default.rows){ text.dialogue.push("") };
};

rows:
  messageSplit = message.split(" ");
  let current = lineLength
  for(i in messageSplit){
    if(current - messageSplit[i].length < 0){
      current -= messageSplit[i].length;

    }else{

    };
  };

*/