declare interface ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
};

const engine = {
  //settings to be used if not otherwise specified
  //  this should contain no more than one level of depth
  //    to prevent issues with shallow copy
  defaultSettings: {
    debug: false,
    autogenScreen: true,
    screenUnits: "px",
    frameRate: 60,
    logText: "[ENGINE]: ",
    debugText: "[DEBUG]: ",
    errorText: "[ERROR]: ",
  },//engine.defaultSettings

  util: {
    log: function(text){
      console.log(engine.defaultSettings.logText + text);
    },//engine.util.log()
    debugMsg: function(text, game){
      if(game.getSetting("debug")){
        console.log(game.getSetting("debugText") + text);
      };
    },//engine.util.debugMsg
    error: function(text){
      console.log(engine.defaultSettings.errorText + text);
    },//engine.util.error()
    //generate random number between 1 and ceiling
    rnd: function(ceiling){
      return Math.floor(Math.random() * ceiling) + 1;
    },//engine.util.rnd()
  },//engine.util

  //New game object "constructor", container for scenes and 
  // references to engine utility functions for easy access
  newGame: function(settings){
    engine.util.log("building new game");
    let game = {
      settings: {},
      input: engine.newInputManager(),
      scenes: [],
      screen: undefined,
      getCurrentScene: function(){
        //return latest scene in game.scenes that is active
        //!

      },//game.getCurrentScene()
      //create new scene and link it to game
      newScene: function(){
        engine.util.debugMsg("game: building new scene", game);
        let scene = engine.newScene();
        game.addScene(scene);
        scene.setParent(game); 
        return scene;
      },//game.newScene()
      addScene: function(scene){
        game.scenes.push(scene);
      },//game.addScene()
      //!removeScene: function(){},//game.removeScene() //!!
      getSetting: function(prop){
        return game.settings[prop];
      },//game.getSetting()
      //schedule main game loop to begin
      start: function(){
        engine.util.debugMsg("Starting game", game);
        game.update();
        game.update();
        //!setInterval(function(){game.update()}, game.settings.frameRate/1000);
      },//game.start()
      //placeholder for main game loop
      loop: function(){
        engine.util.error("game.loop() has not been defined");
      },//game.loop
      //update game state by one frame
      update: function(){
        engine.util.debugMsg("calling game.loop()", game);
        game.loop();
        for(let s in game.scenes){
          if(game.scenes[s].active){
            game.scenes[s].update();
          };
        };
      },//game.update()
    };//game

    //init
    //shallow copy settings and overrite specified
    Object.assign(game.settings, engine.defaultSettings);
    for(let i in settings){
      game.settings[i] = settings[i];
    };
    //check screen
    if(game.getSetting("autogenScreen")){
      game.screen = engine.newScreen(game);
    };
    return game;
  },//engine.newGame()

  newScreen: function(game){
    let screen = {
      parent: game,
      element: document.createElement("canvas"),
      ctx: undefined,
      width: 0,
      height: 0,
      resize: function(){
        //update internal values
        screen.width = game.settings.width;
        screen.height = game.settings.height;
        //update element
        screen.element.style.width = screen.width.toString + game.settings.screenUnits;
        screen.element.style.height = screen.height.toString + game.settings.screenUnits;
      },//screen.resize()
    };
    //create context
    let ctx = screen.element.getContext("2d");
    screen.ctx = ctx;
    //return screen
    return screen;
  },//engine.newScreen()

  newInputManager: function(){
    let input = {
      modes: [],
      currentMode: 0,
      enabled: true,
      //disable input system globally
      disable: function(){
        input.enabled = false;
      },
      enable: function(){
        input.enabled = true;
      },
      keyDown: function(event){
        let key = 1;
        console.log(event);
      },
      findKey: function(keycode){},
      keyUp: function(event){},
      newMode: function(){
        let mode = {
          enabled: true,
          disable: function(){mode.enabled = false},
          enable: function(){mode.enabled = true},
          keys: [],
          pressed: [],  //!!!!!!
          noKeyEffect: function(){},
          newKey: function(keyCode, effect, exclusive, repeatLimit){
            let key = {
              state: false,
              key: keyCode,
              effect: effect || function(){},
              exclusive: exclusive || false,
              repeatLimit: repeatLimit || 0,
              repeatCount: 0,
            };
            mode.keys.push(key);
            return key;
          },//mode.newKey()
          noKey: function(effect){
            mode.noKeyEffect = effect;
          },
          noKeyTest: function(){
            let noKeys = true;
            if(mode.keys.length > 0){
              for(let k in mode.keys){
                if(mode.keys[k].state){
                  noKeys = false;
                };
              };
            };
            if(noKeys){
              mode.noKeyEffect();
            };
          },
          btn: function(inp){},
          btnp: function(inp){},
        };
        input.modes.push(mode);
        return mode;
      },
      setMode: function(mode){
        //!

      },
      update: function(){}, //!!!
    };
    //init
    document.body.setAttribute("onkeydown", "input.keyDown(event)");
    document.body.setAttribute("onkeyup", "input.keyUp(event)");
    //return input manager
    return input;
  },//engine.newInputManager()

  newScene: function(){
    let scene = {
      active: false,
      parent: {},
      entities: [],
      activate: function(){
        engine.util.debugMsg("setting scene active", scene.parent);
        scene.active = true;
      },//scene.activate()
      deactivate: function(){
        engine.util.debugMsg("deactivating scene", scene.parent);
        scene.active = false;
      },//scene.deactivate()
      setParent: function(newParent){
        engine.util.debugMsg("setting scene parent", scene.parent);
        scene.parent = newParent;
      },//scene.setParent()
      newEntity: function(x, y, z){
        engine.util.debugMsg("creating new entity", scene.parent);
        let entity = engine.newEntity(x, y, z);
        scene.entities.push(entity)
        entity.setParent(scene);
        return entity;
      },//scene.newEntity()
      addEntity: function(entity){
        engine.util.debugMsg("adding entity to scene", scene.parent);
        entity.setParent(scene);
        scene.entities.push(entity);  //! add check for multiples first?
      },//scene.addEntity()
      update: function(){
        engine.util.debugMsg("updating scene", scene.parent);
        //!iterate through active systems
        //

      },//scene.update()
    };//scene
    return scene;
  },//engine.newScene()

  newEntity: function(x, y, z){
    let entity = {
      parent: {},
      x: x || 0, y: y || 0, z: z || 0,
      setParent: function(newParent){
        entity.parent = newParent;
      },
      add: function(...args){
        //find system
        //call component constructor


      },//entity.add()
    };
    return entity;
  },//engine.newEntity()

  sys: {

  },//engine.sys

};//engine