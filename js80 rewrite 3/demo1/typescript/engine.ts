
//engine object
//holds engine methods, constructors, and systems
let engine = {

  //settings used if not specified in settings object(see engine.newGame())
  defaultSettings: {
    //default settings
    debug: false,
    newCanvas: true,
    appendCanvasAutomatically: true,
    width: 400,
    height: 360,
    defaultEntity: {
      x: 0, y: 0, z: 0
    },
    systemsOrder: ['input', 'animation', 'render'],
  },//engine.defaultSettings

  //create a new game object
  //game object holds scenes, the html canvas element, and references to engine methods for ease of use
  newGame: function(settings: object){
    //create game object
    let game = {
      settings: {},
      canvas: {},
      scenes: [],
      setCanvas: function(canvas){
        this.canvas = canvas;
      },
      newScene: function(){
        let scene =  engine.newScene(game);
        this.scenes.push(scene);
      },
      update: function(){},
    };
    //populate settings
    //  first default
    for(let s in engine.defaultSettings){
      game.settings[s] = engine.defaultSettings[s];
    };
    //  then specified, if necessary
    if(settings){
      for(let ss in settings){
        game.settings[ss] = settings[ss];
      };
    };
    //create canvas, if necessary
    if(game.settings.newCanvas)
      //!TS doesn't allow this
      game.setCanvas(engine.newCanvas(game));
    };
    //return game object
    return game;
  },//engine.newGame()

  newCanvas: function(game){
    //optionally supply parent element as a property to append canvas to

    //create HTML canvas element
    let canvas = document.createElement('canvas');
    //set canvas dimensions
    //!

    //append to html page
    if(game.settings.appendCanvasAutomatically){
      document.body.appendChild(canvas);
    };
    //add reference to canvas object to game object
    game.canvas = canvas;
    //! the above line will break things if multiple canvases are used
  },//engine.newCanvas()

  newScene: function(game){
    let scene = {
      game: game,
      entities: [],
      newEntity: function(...args){
        let entity = engine.newEntity(...args);
        this.entities.push(entity);
      },
      update: function(systemsOrder){
        // iterate systems here
        //! take active systems order list?
      },
    };
    return scene;
  },//engine.newScene()

  //create new entity
  newEntity: function(x: number, y: number, z: number){
    let entity = {
      x: x,
      y: y,
      z: z,
      //set entity's absolute position (globally)
      setPos: function(x: number, y: number, z: number){
        this.x = x;
        this.y = y;
        this.z = z;
      },
      //change entity position relative to current position
      modPos: function(x: number, y: number, z: number){
        this.x += x;
        this.y += y;
        this.z += z;
      },
      //get entity's position information
      getPos: function(){
        return [
          this.x,
          this.y,
          this.z,
        ];
      },
      //add a new type component to entity
      addComponent: function(name: string, ...args){
        let component = engine[name].newComponent(...args);
        component.parent = this;
        this[name] = component;
      },
    };
    //return entity
    return entity;
  },//engine.newEntity()

  //write message to browser console for debugging
  log: function(text: string){
    console.log('Engine: ' + text);
  },//engine.log()

  //write message to browser console for debugging
  error: function(text: string){
    console.log('Engine: ERROR -' + text);
  },//engine.error()

  //render system
  render: {
    newComponent: function(){},
    newCamera: function(){},
    rect: function(target){},
    rectb: function(target){},
    sprite: function(target){},
    text: function(target){},
    tileMap: function(target){},
    update: function(scene){
      if(scene.game.settings.debug){
        engine.log('calling engine.render.update()');
      };
      for(let entity in scene){
        if(scene[entity].render){
          scene[entity].render.update();
        };
      };
      if(scene.game.settings.debug){
        engine.log('engine.render.update() complete');
      };
    },
  },//engine.render

  //animation system
  animation: {
    newComponent: function(){},
    newAnimation: function(){},
    update: function(scene){
      if(scene.game.settings.debug){
        engine.log('calling engine.animation.update()');
      };
      for(let entity in scene){
        if(scene[entity].animation){
          scene[entity].animation.update();
        };
      };
      if(scene.game.settings.debug){
        engine.log('engine.animation.update() complete');
      };
    },
  },//engine.animation

  //collision system
  collision: {
    newComponent: function(){},
    checkCollision: function(){},
    //update is here to prevent errors; collision system is querried using a method above instead of calling engine.collision.update()
    update: function(scene){
      if(scene.game.settings.debug){
        engine.log('engine.collision.update()');
      };
    },
  },//engine.collision

  //input system
  input: {
    //create new input component
    newComponent: function(){

    },//engine.input.newComponent()
    //update input system
    update: function(scene){
      if(scene.game.settings.debug){
        engine.log('calling engine.input.update()');
      };

      //check game.input
      //!

      if(scene.game.settings.debug){
        engine.log('engine.input.update() complete');
      };
    },//engine.input.update()
  },//engine.input

};//engine