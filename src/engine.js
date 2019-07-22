//automatically start engine on load
document.body.setAttribute("onload", "engine.buildGame()");

//settings:
let settings = {
  //default canvas size
  gameCanvasSize: {x:480,y:240},
  //framerate
  frameInterval: 20, //50 frames per second
  //defaults
  defaultColor: "black",
  //default font
  defaultFont: "Ariel",
  defaultFontSize: 12,
  //build UI frame?
  renderBezel: true,
  //game title
  defaultWindowTitle: "JS-80 Engine",
  //default tilesize in pixels
  defaultTileSize: 16,
  bootText: ["booting hdd 03gf...", "js80 OS version 3.02b (14.69.234)", "login: su (automatic login)", "last login: not recorded", "#938. ggr [38vcn3k] spark 3kn8c4mds.4g", " ", "Sun Oct 29th 07:23:23 GMT 2019", "js80 OS comes with ABSOLUTELY NO GUARENTEE that you will not be swallowed by a gru", "...", "READY", "CLICK OR PRESS A KEY TO CONTINUE", ">_",],
  //this should be called in game file BEFORE init() to adjust game settings
  settings: function(settingsObject){
    for(i in settingsObject){
      settings[i] = settingsObject[i];
    }
  },
}

//these objects and methods are generally only called by the engine itself
let engine = {
  gameCanvas: {},
  draw: {},
  title: {},
  bezel: {},
  bezel2: {},
  buildGame: function(){
    //insert function to pull settings here?

    engine.gameCanvas = document.createElement("canvas");
    engine.gameCanvas.setAttribute("width", settings.gameCanvasSize.x);
    engine.gameCanvas.setAttribute("height", settings.gameCanvasSize.y);
    engine.gameCanvas.style.height = settings.gameCanvasSize.y + "px";
    engine.gameCanvas.style.width = settings.gameCanvasSize.x + "px";
    engine.gameCanvas.style.border = "solid black";
    document.body.insertBefore(engine.gameCanvas, document.body.childNodes[0]);
    engine.draw = engine.gameCanvas.getContext("2d");
    if(settings.renderBezel){engine.buildBezel()};
    engine.title = document.createElement("title");
    document.head.appendChild(engine.title);
    engine.title.text = settings.defaultWindowTitle;
    document.body.setAttribute("onkeypress", "engine.start()");//this lets you press a key at boot screen
    document.body.setAttribute("onclick", "engine.start()");
    //document.body.setAttribute("onload", "defaultTitle()");
    engine.bootScreen();
  },
  buildBezel: function(){
    engine.bezel = document.createElement("div");
    document.body.replaceChild(engine.bezel, engine.gameCanvas);
    engine.bezel2 = document.createElement("div");
    engine.bezel.appendChild(engine.bezel2);
    engine.bezel2.appendChild(engine.gameCanvas);
    engine.bezel2.style.padding = "5px";
    engine.bezel2.style.backgroundColor = "rgb(56, 56, 56)";
    engine.bezel.style.margin = "auto";
    engine.bezel.style.backgroundColor = "rgb(82, 82, 82";
    engine.bezel.style.padding = "15px";
    engine.bezel.style.display = "inline-block";
    engine.bezel.style.borderRadius = "10px";
    engine.bezel.style.boxShadow = "5px 5px 20px 10px rgba(0,0,0,0.7";
    engine.bezel.setAttribute("id", "bezel");
    document.body.style.textAlign = "center";
  },
  //this is primarily here to prevent "play() failed because the user didn't interact with the document first." error
  //player must click to start game
  bootScreen: function(){
    js80.cls("black");
    //js80.text("Click to start", (engine.gameCanvas.width/2) - 30, (engine.gameCanvas.height/2), "white");
    let font = 10 || settings.defaultFontSize;
    let verticalSpacing = font;
    for(i in settings.bootText){
      js80.text(settings.bootText[i], 5, verticalSpacing, "white", font);
      verticalSpacing += font + (font / 2);
    }
  },
  //begin game loop designated in game file (init() and frame())
  start: function(){
    engine.log("start()");
    js80.keyboard.setup();
    document.body.removeAttribute("onkeypress"); //this let you press a key at boot
    init();
    setInterval(frame, settings.frameInterval);
    document.body.removeAttribute("onclick");
    engine.gameCanvas.setAttribute("onclick", "click(event)");
  },
  //log reports from engine (to be used within this document only)
  log: function(message){
    //Style: "[js-80 Engine] ERROR: this is an error message"
    console.log("[js-80 Engine] " + message);
  },
};

//main engine functions to use for development
let js80 = {
  //log reports from game file (to be used by developer in game file for testing)
  log: function(message){
    console.log("[GameFile] " + message);
  },

  //sets window title
  setTitle: function(newTitle){
    engine.title.text = newTitle;
  },

  //sets canvas size
  canvasSize: function(x, y){
    engine.gameCanvas.style.height = y;
    engine.gameCanvas.style.width = x;
  },

  //reset to initial game state
  reset: function(){},

  //save system:
  save: {
    saveData: {},
    empty: {}, //used for 'deleting' savedata
    settings: {},
    //set up what data is to be saved in settings
    init: function(dataToSave){
      js80.save.settings = dataToSave;
    },
    save: function(name){
      for(i in js80.save.settings){
        js80.save.saveData[i] = js80.save.settings[i]; //! this gets the data that was saved instead of the current version!
      };
      localStorage.setItem(name, JSON.stringify(js80.save.saveData));
    },
    load: function(name){
      js80.save.saveData = JSON.parse(localStorage.getItem(name));
    },
    delete: function(name){
      localStorage.setItem(name, JSON.stringify(js80.save.empty));
      js80.save.saveData = js80.save.empty;
    },
  },

  //event system
  events: {
    //hold all active threads here
    threads: [],
    nextThreadId: 0,
    //thread pseudo-constructor
    newThread: function(persistent){
      let newThread = {};
      newThread.id = js80.events.nextThreadId++;
      newThread.queue = [];
      newThread.persistent = persistent || false;
      //event pseudo-constructor
      newThread.new = function(passedAction){
        let newEvent = {};
        newEvent.action = function(){
          passedAction();
        };
        //put event in queue
        newThread.queue.push(newEvent);
      };
      //common event types here for easy creation
      newThread.common = {
        wait: function(time){
          while(time > 0){
            newThread.new(function(){});
            time--;
          };
        },//common.wait()
      };//newThread.common
      js80.events.threads.push(newThread);
      return newThread;
    },//newThread()

    update: function(){
      if(js80.events.threads.length > 0){
        for(i in js80.events.threads){
          if(js80.events.threads[i].queue.length > 0){
            js80.events.threads[i].queue[0].action();
            js80.events.threads[i].queue.shift();
          }else{
            //delete empty threads
            if(!js80.events.threads[i].persistent){
              js80.events.threads.splice(js80.events.threads[i], 1);
            };
          };
      };
      };
    }, //update()

  },//events

  //textbox manager
  textbox: {
    activeTextboxes: [],
    themes: {
      //used if no theme is defined
      default: {
        name: "default",
        x: 0, y: 0,
        width: 200, height: 200,
        bgColor: "blue", bgImage: "",
        border: true, borderColor: "white",
        font: "ariel", fontSize: "14", fontColor: "white", lines: 4, 
        text: "", charLength: 30,
        vertOffset: 0, horOffset: 20,
        handleOverflow: true, overflowIcon: "", overflowIconOffset: {x: 20, y: 15},
        //overflowIconOffset is from lower right corner, not upper left
        //overflowIcon should be an asset created by js80.assets.sprite
      },
      //used if no theme is set and gameDefault is defined. overrides default
      gameDefault: {},
    },
    newTheme: function(themeSettings){
      let newTheme = {};
      //defaults
      for(i in js80.textbox.themes.default){
        newTheme[i] = js80.textbox.themes.default;
      }
      //customize
      for(i in themeSettings){
        newTheme[i] = themeSettings[i];
      };
      js80.textbox.themes[newTheme.name] = newTheme;
      return newTheme;
    },
    //a persistent way to manage textboxes
    newController: function(){
      let newControl = {};
      //tracks textbox state. read by input
      newControl.on = false;
      //holds reference to current textbox
      newControl.tbox = {};
      //creates a textbox and passes text/theming to it
      newControl.write = function(text, theme, options){
        if(newControl.on){
          newControl.advance()
        }else{
          if(options){
            newControl.tbox = js80.textbox.new(text, theme, options);
          }else if(theme){
            newControl.tbox = js80.textbox.new(text, theme);
          }else if(text){
            newControl.tbox = js80.textbox.new(text);
          }else{
            newControl.tbox = js80.textbox.new("");
          };
          newControl.on = true;
        };
      };
      //if there is overflow, advances textbox.  if not, removes it
      newControl.advance = function(){
        if(newControl.tbox.overflow !== "" && newControl.tbox.overflow !== " "){
          newControl.tbox.advance();
        }else{
          newControl.tbox.remove();
          newControl.on = false;
        };
      };
      return newControl;
    },
    //new textbox
    new: function(text, theme, themeMods){
      let newTextbox = {};
      //set theme
      function setTheme(theme){
        newTextbox.theme = theme;
        Object.assign(newTextbox, theme);
      };
      //if a theme is passed in, set it
      if(theme && theme !== "default"){
        setTheme(theme);
      }else{
        //check if gameDefault defined
        if(js80.textbox.themes.gameDefault !== {}){
          setTheme(js80.textbox.themes.gameDefault);
        }else
        //use default as last resort
        setTheme(js80.textbox.themes.default);
      };
      //overrides theme
      if(themeMods){
        Object.assign(newTextbox, themeMods);
      };
      //assign text
      if(text){newTextbox.text = text};
      
      newTextbox.overflow = "";
      newTextbox.advance = function(){
        this.text = this.overflow;
        this.overflow = "";
      };
      newTextbox.remove = function(){
        let i = js80.textbox.activeTextboxes.indexOf(newTextbox);
        js80.textbox.activeTextboxes.splice(i, 1);
      };
      js80.textbox.activeTextboxes.push(newTextbox);
      return newTextbox;
    },
    remove: function(toRemove){
      //by index
      let index = toRemove;
      js80.textbox.activeTextboxes.splice(index, 1);
    },
    drawTextBox: function(textbox){
      //draw box
      js80.rect(textbox.x, textbox.y, textbox.width, textbox.height, textbox.bgColor);
      if(textbox.border){js80.rectb(textbox.x, textbox.y, textbox.width, textbox.height, textbox.borderColor)};
      //arrange text
        //break up into lines
          //tokenize based on spaces
          //add each token while incrementing a counter based on token's length
          //before adding each token, compare the counter to the line length
          //if greater, start on next line
          //store next batch of string for next page
      //!add support for problems, like one long unbroken string
      //!consider a different method other than split()
      //check for newline characters
      //!this does not yet work
      //textbox.text = textbox.text.replace(/\/n/g, " /n ");
      let tokens = textbox.text.split(" ");
      let charsInLine = 0;
      let lines = [];
      //prevent undefined when blank text
      let c = 0;
      while(c <= textbox.lines){
        lines[c] = "";
        c++;
      };
      let currentLine = 0;
      for(i in tokens){//add check tokens[i] < textbox.charLength
        //check for newline; " /n "
        if(tokens[i] === "/n"){
          charsInLine = 0;
          currentLine++;
          charsInLine += tokens[i].length + 1;
        }else
        //if no newline
        if(charsInLine + tokens[i].length <= textbox.charLength){
          charsInLine += tokens[i].length + 1;
          lines[currentLine] += tokens[i] + " ";
        }else{
          charsInLine = 0;
          currentLine++;
          charsInLine += tokens[i].length + 1;
          lines[currentLine] += tokens[i] + " ";
        };
      };
      //split based on current page
      let currentText = lines.splice(0, textbox.lines - 1);
      //save lines[] for next page
      //!find a way to do this without using toString()?
      //textbox.overflow = lines.toString();
      textbox.overflow = lines.join(" ");
      //determine position of lines

      //!There should probably be more than one way of doing this
      let vertOffset = textbox.height / textbox.lines;
      //add starting vertOffset?
      let horOffset = textbox.theme.horOffset;
      let textPosition = textbox.theme.vertOffset;
      //save position data
      textbox.vertOffset = vertOffset;
      textbox.horOffset = horOffset;//this can be grabbed from theme instead
      textbox.textPosition = textPosition;//this can be grabbed from theme instead
      //draw lines of text
      for(i in currentText){
        textPosition += vertOffset;
        js80.text(currentText[i], textbox.x + horOffset, textbox.y + textPosition, textbox.fontColor, textbox.fontSize, textbox.font);
      };

      //if there is overflow
      if(textbox.theme.handleOverflow){
        if(textbox.overflow.length > 1 || textbox.overflow[0].length > 1){
          //draw overflow icon
          if(textbox.theme.overflowIcon === ""){
            js80.textbox.overflowIcon(textbox.theme.width - textbox.theme.overflowIconOffset.x, textbox.theme.height - textbox.theme.overflowIconOffset.y, 1);
          
          }else{
            spr(textbox.theme.overflowIcon, textbox.theme.overflowIconOffset.x, textbox.theme.overflowIconOffset.y);
          };
        };
      };
    },
    //update- put call to this into game loop
    drawAll(){
      for(i in js80.textbox.activeTextboxes){
        js80.textbox.drawTextBox(js80.textbox.activeTextboxes[i]);
      };
    },
    overflowIcon: function(x, y, scale){
      scale = scale || 1;
      js80.line(x, y, x + 10 * scale, y, "white");
      js80.line(x + 10 * scale, y, x + 5 * scale, y + 7 * scale, "white");
      js80.line(x + 5 * scale, y + 7 * scale, x, y, "white");
    },
  },//textbox

  //menu
  //  textbox
  //  choices
  //  effects
  //  indicator
  //controller
  menu: {
    menus: [],
    nextId: 0,
    new: function(title, choices, effects, options){
      let newMenu = {};
      newMenu.id = js80.menu.nextId++;
      //defaults
      newMenu.currentOption = 0;
      newMenu.layout = "vertical";
      newMenu.title = title || "";
      newMenu.choices = choices;
      newMenu.effects = effects;
      newMenu.options = {prependChoices: "    ", theme: js80.textbox.themes.default};
      if(js80.textbox.themes.gameDefault){newMenu.options.theme = js80.textbox.themes.gameDefault};
      for(i in options){
        newMenu.options[i] = options[i];
      }
      newMenu.indicator = {};//!
      newMenu.moveDown = function(){js80.menu.controller.move(newMenu, "down")};
      newMenu.moveUp = function(){js80.menu.controller.move(newMenu, "up")};
      newMenu.select = function(){js80.menu.controller.select(newMenu)};
      newMenu.cancel = function(){js80.menu.controller.close(newMenu)};
      newMenu.drawIndicator = function(){js80.menu.controller.draw(newMenu)};

      js80.menu.menus.push(newMenu);
      js80.menu.build(newMenu);
      return newMenu;
    },
    build: function(menu){
      let text = menu.title;
      let titleSpace = 0;
      if(menu.title !== ""){
        titleSpace = 1;
        text += " /n ";
      };
      //save titlespace for use in menu.draw()
      menu.titleSpace = titleSpace;
      let rows = menu.choices.length + titleSpace;
      for(i in menu.choices){
        if(menu.options.prependChoices !== ""){
          text+= menu.options.prependChoices;
        };
        text += menu.choices[i];
        if(i < menu.choices.length - 1){
          text += " /n ";
        };
      };
      menu.textbox = js80.textbox.new(text, menu.options.theme);
    },
    destroy: function(menuId){
      let id = js80.menu.menus.findIndex(function(e){return e.id === menuId});
      js80.menu.menus.splice(id, 1);
    },
    drawIndicator: function(x, y, scale){
      scale = scale || 1;
      js80.line(x, y, x + 10 * scale, y + ((10 * scale) / 2), "#9bbc0f");
      js80.line(x + 10 * scale, y + ((10 * scale) / 2), x, y + 10 * scale, "#9bbc0f");
      js80.line(x, y + 10 * scale, x, y, "#9bbc0f");
    },
    controller: {
      move: function(menu, dir){
        if(dir === "down"){
          if(menu.currentOption < menu.choices.length -1){
            menu.currentOption++;
          }
        }else if(dir === "up"){
          if(menu.currentOption > 0){
            menu.currentOption--;
          }
        };
      },
      select: function(menu){
        menu.effects[menu.currentOption]();
      },
      close: function(menu){
        menu.textbox.remove();
        js80.menu.destroy(menu.id);
      },
      draw: function(menu){
        let textbox = menu.textbox;
        js80.menu.drawIndicator(
          textbox.x + textbox.horOffset, 
          textbox.y + (menu.titleSpace * textbox.vertOffset) + ((menu.currentOption) * textbox.vertOffset) + 15, 1); //!something is off here (15 is arbitrary)
      },
    },
    drawAll: function(){
      //only draw indicator of top menu
      if(js80.menu.menus.length > 0){
      js80.menu.menus[js80.menu.menus.length - 1].drawIndicator();
      };
    },
},

  //asset manager (create asset references)
  assets: {
    //create 2d asset
    sprite: function(file, tilesize){
      let newSprite = document.createElement("img");
      newSprite.setAttribute("src", file);
      newSprite.tileSize = tilesize || settings.defaultTileSize;
      return newSprite;
    },
    //create audio asset
    audio: function(file){
      let newAudio = document.createElement("audio");
      newAudio.setAttribute("src", file);
      return newAudio;
    },
    //takes an array and returns a 2d array
    map2d: function(array, rowLength){
        let newArray = [];
        let row = [];
        let cell= 0;
        for(i in array){
          //if in current row
          if(cell < rowLength){
            //row[cell] = array[i];
            row.push(array[i]);
            cell++;
          //if in new row
          }else {
            newArray.push(row);
            cell = 0;
            row = [];
            row.push(array[i]);
            cell++;
          }
        }
        newArray.push(row);
        return newArray;
    },
    //process map file:
    //  export map from Tiled as json file
    //  add "let mapData = " in front of the json in that file
    //  rename file from .json to .js
    //  import in to html file
    //  pass mapData in to a call to js80.assets.processMap();
    processMap: function(mapData, assetDirectory){
      let map = {
        assetDirectory: assetDirectory || "",
        width: mapData.width,
        height: mapData.height,
        tileSize: mapData.tilewidth,
        tileWidth: mapData.tilewidth,
        tileHeight: mapData.tileheight,
        numberOfLayers: mapData.layers.length,
        image: mapData.tilesets[0].image, //add support for multiple tilesets here?
        layers: {},
      };
      for(i in mapData.layers){
        map.layers[mapData.layers[i].name] = {name: mapData.layers[i].name, id: mapData.layers[i].id, width: mapData.layers[i].width, data: mapData.layers[i].data};
        //map.layers.push({name: mapData.layers[i].name, id: mapData.layers[i].id, width: mapData.layers[i].width, data: mapData.layers[i].data});
      };
      //decrement all numbers in map array so that they match tile id numbers
      for(i in map.layers){
        for(u in map.layers[i].data){
          map.layers[i].data[u]--;
        };
      };
      //convert data to 2d arrays
      for(i in map.layers){
        map.layers[i].data = js80.assets.map2d(map.layers[i].data, map.layers[i].width);
      }
      return map;
    },
    animation: function(name, sprite, framesArray){},
  },

  //generic timer service (must call js80.timer.update() in game loop for these to work)
  timer: {
    timers: [],
    //increment all timers (this should be called in main loop)
    update: function(){
      let expiredTimers = [];
      for(i in js80.timer.timers){
        js80.timer.timers[i].time--;
        if(js80.timer.timers[i].time < 0){
          js80.timer.timers[i].event();
          expiredTimers.push(js80.timer.timers[i]);
        }
      }//get rid of any timers that have expired
      for(i in expiredTimers){
        js80.timer.terminate(expiredTimers[i]);
      }
    },
    //create a new timer
    new: function(time, event, terminate){
      let newTimer = {};
      newTimer.time = time;
      newTimer.event = event;
      //newTimer.terminate = terminate;
      js80.timer.timers.push(newTimer);
      //return newTimer;
      return js80.timer.timers[js80.timer.timers.length];
    },
    //terminate an existing timer
    terminate: function(timer){
      function toRemove(element){
        return element !== timer;
      }
      js80.timer.timers = js80.timer.timers.filter(toRemove);
    },
  },

  //audio

  //play/stop music()
  musicCurrentlyPlaying: [],
  music: async function(track, loop, stop){
    //let track = track.toLowerCase();
    if((track === "stopall" || track === "stop all") && js80.musicCurrentlyPlaying.length > 0){
      for(i in js80.musicCurrentlyPlaying){
        js80.music(js80.musicCurrentlyPlaying[i], false, true);
      }
    }else if(stop){
      track.pause()
      js80.musicCurrentlyPlaying.splice(js80.musicCurrentlyPlaying.indexOf(track), 1);
    }else{
      try {
        track.load(); //this causes track to start over instead of resume from pause if called again
        await track.play();
        js80.musicCurrentlyPlaying.push(track);
      } catch(err) {
        engine.log("error: " + err);
      }
      if(loop) track.loop = true;
    }
  },

  //play a sound effect
  sfx: async function(sound){
    try {
      await sound.play();
    } catch(err) {
      engine.log("error: " + err);
    }
  },

  //drawing

  testSpr: function(id, x, y, optional){
    let frame, w, h, rot;
    if(optional.frame){frame = frame;}else frame = 0;
    if(optional.w){w = w;}else w = id.width / id.tileSize;
    if(optional.h){h = h;}else h = id.height / id.tileSize;
    if(optional.rot){rot = rot;}else rot = 0;
    let sprite = frame * id.tileSize;

    if(rot !== 0){
      engine.draw.save();
      engine.draw.beginPath();
      engine.draw.translate(x + (id.width / 2), y + (id.height / 2));
      engine.draw.rotate(rot * Math.PI / 180);
    }
    engine.draw.drawImage(id, sprite * w, 0, w * id.tileSize, h * id.tileSize, x, y, w * id.tileSize, h * id.tileSize);
    if(rot !== 0) engine.draw.restore();
  },

  //draw a sprite to the screen
  spr: function(id, x, y, frame, w, h, flip, rotation){
    //spr(id, x, y); //spr(id, x, y, frame); //spr(id, x, y, frame, w, h);
    //flip takes "x", "y", or "xy" to indicate axis to flip
    if(frame === undefined){
      engine.draw.drawImage(id, x, y);
    }else{
      let sprite = frame * id.tileSize;
      w = w || 1;
      h = h || 1;

      //save canvas state
      engine.draw.save();

      function flipSprite(){
        if(flip === "x"){
          engine.draw.scale(-1, 1);
          x = -x - ((id.tileSize * w) / w);
        }else if(flip === "y"){
          engine.draw.scale(1, -1);
          y = -y - ((id.tileSize * h) / h); //this isn't quite right
        }else if(flip === "xy"){
          engine.draw.scale(-1, -1);
        };
      };
      //flip if necessary
      if(flip){flipSprite()};

      //! TEST THIS!
      //rotate sprite if necessary
      if(rotation){
        engine.draw.translate(x + (image.width / 2), y + (image.height / 2));
        engine.draw.rotate(angle * Math.PI / 180);
      };

      engine.draw.beginPath();
      engine.draw.drawImage(id, sprite * w, 0, w * id.tileSize, h * id.tileSize, x, y, w * id.tileSize, h * id.tileSize);
      //this assumes single-row sprite sheet for now - change that later
      
      //revert if flipped
      if(flip){flipSprite()};

      engine.draw.restore();
    }
  },

  //draw a line
  line: function(x1, y1, x2, y2, color, width){
    //if color is left off, defaults to settings.defaultColor
    //if width is left off, defaults to 1
    engine.draw.beginPath();
    engine.draw.moveTo(x1, y1);
    engine.draw.lineTo(x2, y2);
    engine.draw.lineWidth = width || 1;
    let stroke = color || settings.defaultColor;
    engine.draw.strokeStyle = stroke;
    engine.draw.stroke();
  },

  //draw a filled rectangle
  rect: function(x, y, width, height, color){
    engine.draw.beginPath();
    engine.draw.fillStyle = color || settings.defaultColor;
    engine.draw.fillRect(x, y, width, height);
  },

  //draw the outline of a rectangle
  rectb: function(x, y, width, height, color){
    engine.draw.beginPath();
    engine.draw.strokeStyle = color || settings.defaultColor;
    engine.draw.strokeRect(x, y, width, height);
  },

  //draw a filled circle
  circ: function(x, y, radius, color){
    engine.draw.beginPath();
    engine.draw.fillStyle = color || settings.defaultColor;
    engine.draw.arc(x, y, radius, 0, 2 * Math.PI);
    engine.draw.fill();
  },

  //draw the outline of a circle
  circb: function(x, y, radius, color){
    engine.draw.beginPath();
    engine.draw.strokeStyle = color || settings.defaultColor;
    engine.draw.arc(x, y, radius, 0, 2 * Math.PI);
    engine.draw.stroke();
  },

  //draw text
  text: function(text, x, y, fontColor, fontSize, nfont){
    //if color, size, and font type are left off, uses defaults
    engine.draw.beginPath();
    let size = fontSize || settings.defaultFontSize;
    let color = fontColor || settings.defaultColor;
    let font = nfont || settings.defaultFont;
    engine.draw.font = size + "px " + font;
    engine.draw.fillStyle = color;
    engine.draw.fillText(text, x, y);
  },

  //clear screen
  cls: function(color){
    //if color is left off, reverts to original background
    if(color){
      engine.draw.beginPath();
      engine.draw.clearRect(0, 0, engine.draw.canvas.width, engine.draw.canvas.height);
      engine.draw.fillStyle = color;
      engine.draw.fillRect(-5, -5, engine.gameCanvas.width + 5, engine.gameCanvas.height + 5);
    } else engine.draw.clearRect(0, 0, engine.draw.canvas.width, engine.draw.canvas.height);
  },

  //draw tilesheet to screen based on tilemap
  map: function(map, tilesheet, tilesize, xOffset, yOffset){
    engine.draw.beginPath();
    x = xOffset || 0;
    y = yOffset || 0;
    let numberOfRows = tilesheet.naturalWidth / tilesize || tilesheet.tilesize;
    let currentRow;
    let currentTile;
    for(row in map){
      for(tile in map[row]){
        currentTile = map[row][tile];
        currentRow = Math.floor(currentTile / numberOfRows);
        currentTile -= currentRow * numberOfRows;
        engine.draw.drawImage(tilesheet, currentTile * tilesize, currentRow * tilesize, tilesize, tilesize, x * tilesize, y * tilesize, tilesize, tilesize);
        x++;
      }
      x = xOffset;
      y++;
    }
  },

  //returns tile id of given x,y map coordinate
  mget: function(map, x, y, tileSize){
    tileSize = map.tileSize;
    if(tileSize === undefined) tileSize = settings.defaultTileSize;
    let x2 = Math.floor(x / tileSize);
    let y2 = Math.floor(y / tileSize);
    //check if on map:
    let result;
    if(map[y2] && map[y2][x2]){
      result = map[y2][x2];
    }else result = -1  
    return result;
  },

  //set tile in tilemap
  mset: function(map, x, y, tileId){
    //x,y are tile coordinates, not pixel coordinates
    map[y][x] = tileId;
  },

  //input

  //keyboard manager object
  keyboard: {
    setup: function(){
      document.body.setAttribute("onkeydown", "js80.keyboard.keyDown(event)");
      //document.body.setAttribute("onkeypress", "keyboard.keyDown(event)");
      document.body.setAttribute("onkeyup", "js80.keyboard.keyUp(event)");
    },
    //array of keys this game will intend to watch:
    keys: [
      {id: "ArrowLeft", state: false},
      {id: "ArrowRight", state: false},
      {id: "ArrowUp", state: false},
      {id: "ArrowDown", state: false},
      {id: "Enter", state: false},
      {id: " ", state: false},
      {id: "Control", state: false},
      {id: "Alt", state: false},
      {id: "Shift", state: false},
      {id: "z", state: false},
      {id: "x", state: false},
      {id: "w", state: false},
      {id: "a", state: false},
      {id: "s", state: false},
      {id: "d", state: false},
      {id: "q", state: false},
      {id: "e", state: false},
      {id: "c", state: false},
    ],
    //sets key state in keyboard.keys to true
    keyDown: function(event){
      let key = js80.keyboard.keys.findIndex(function(element){return element.id === event.key});
      if(key !== -1) js80.keyboard.keys[key].state = true;
    },
    //sets key state in keyboard.keys to false
    keyUp: function(event){
      let key = js80.keyboard.keys.findIndex(function(element){return element.id === event.key});
      if(key !== -1) js80.keyboard.keys[key].state = false;

      //remove from pressed (for btnp)
      if(js80.keyboard.pressed.includes(event.key)){
        //remove from pressed
        let pressedKey = js80.keyboard.pressed.indexOf(event.key);
        js80.keyboard.pressed.splice(pressedKey, 1);
      };
    },
    //adds a new key to keyboard.keys to be monitored
    addKey: function(id){
      js80.keyboard.keys.push({id: id, state: false});
    },

    //add a key when pressed (for testing btnp())
    //btnp() adds to this list
    //keyup() removes from this list
    pressed: [],

  },

  //returns true if button "inp" is currently pressed
  btn: function(inp){
    let key = js80.keyboard.keys.findIndex(function(element){return element.id === inp});
    if(key !== -1) return js80.keyboard.keys[key].state;
  },

  //returns true the moment button "inp" is pressed
  btnp: function(inp, hold, period){
    //returns true the moment button "id" is pressed
    let key = js80.keyboard.keys.findIndex(function(element){return element.id === inp});
    //if inp is a valid key being watched and is currently being held
    if(key !== -1 && js80.keyboard.keys[key].state){
      //return js80.keyboard.keys[key].state;

      //check if inp is in pressed, if not, add it and return true
      if(!(js80.keyboard.pressed.includes(inp))){
        js80.keyboard.pressed.push(inp);
        return true;
      }else return false;
    }
  },

  //triggered on mouseclick
  click: function(event){
    let clickX = event.clientX;
    let clickY = event.clientY;
  },

  //returns mouse coordinates
  mouse: function(){
    //let clickX = event.clientX;
    //let clickY = event.clientY;
    return {x:clickX, y:clickY};
  },
}