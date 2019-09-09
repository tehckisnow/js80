//Todo:
//tile-based collision detection be fucked, yo.  (could be due to map, remake map first and test)
//running might also break collision detection
//pressing shift blocks WASD, but not arrow keys.
//releasing a direction button before shift causes player to continously move.  revamp release commands in input?
//global state manager conflates states and their indexes
//input constructor

//fix timer to return npc to facing south
//control z depth of map layers (incorporate render system into map generator)
//redevelop dialogue system
//make themes scalable and everything responsive
//ensure menus are nestable
//define map and sprite assets explicitly
//test camera controls

//settings.settings({gameCanvasSize: {x:160, y:144}});


//global state data manager
let global = {
  //main game state
  _gameState: "normal",
  //default state.  sets this state when calling global.revertDefault();
  _default: "normal",
  //list of possible states
  _states: ["normal", "pause", "menu", "reading"],
  //holds a history of the previous game states up to this._maxPreviousStates for later reference
  _previousStates: [],
  //number of previous game states to remember
  _maxPreviousStates: 10,
  //add a new state to state manager or an array of states.  ensures new states do not already exist and returns the index of the newly created states
  addState: function(state){
    if(state.isArray()){
      let indexes = [];
      for(i in state){
        if(!this._states.includes(state[i])){
          this._states.push(state[i]);
          indexes.push(this._states.length - 1);
        };
      };
      return indexes;
    }else{
      if(!this._states.includes(state)){
        this._states.push(state);
        return this._states.length - 1;
      };
    };
  },
  //set default state that is used by revertDefault().  if no argument is passed in, sets first state to default.  returns undefined if fails
  setDefault: function(state){
    if(state){
      if(this._states.includes(state)){
        this._default = state;
      }else{
        return undefined;
      };
    }else{
      if(this._states[0]){
        this.setDefault(this._states[0]);
      }else return undefined;
    };
  },
  //revert to default state
  revertDefault: function(){
    if(this._default){
      this.setState(this._default);
    };
  },
  //return current state as a string, unless true is passed as an argument
  getState: function(state, index){
    if(index){
      return this._states.findIndex(state);
    }else{
      return this[state] || this._gameState;
    };
  },
  //set the current game state
  setState: function(state){
    if(this._states.includes(state)){
      this._previousStates.push(this._gameState);
      this.gameState = state;
      this.limit();
    };
  },
  //revert to previously set state
  revert: function(){
    this.gameState = this._previousStates[this._previousStates.length];
    this._previousStates.pop();
  },
  //
  empty: function(){
    let last = this._previousStates[this._previousStates.length];
    this.previousStates = [];
    this._previousStates.push(last);
  },
  //remove oldest states until this._previousStates is within maximum previous states to store
  limit: function(){
    while(this._previousStates.length > this._maxPreviousStates){
      this._previousStates.shift();
    };
  },
  //set maximum previous states to store
  setMaxPreviousStates: function(num){
    this._maxPreviousStates = num;
  },
};

//temporary global state test(remove later)
// let nglobal = new global();
// let normal = global.addState("normal");
// let states = global.addState(["pause", "menu", "reading"]);
// global.setDefault("default");

//import assets
let sprNpc = js80.assets.sprite("assets/gb/npc.png", 16);
let sprNpc2 = js80.assets.sprite("assets/gb/npc2.png", 16);
let sprNpc3 = js80.assets.sprite("assets/gb/npc3.png", 16);
let sprPlayer = js80.assets.sprite("assets/gb/player.png", 16);
let tileSheet1 = js80.assets.sprite("assets/gb/tileSheet1.png", 16);
let testSprite = js80.assets.sprite("assets/gb/spritesheet11111.png", 16);
let tileSet1 = js80.assets.sprite("assets/gb/tileset1.png", 16);

console.log(TileMaps);

//maps
//let mainMap = js80.assets.processMap(TileMaps[0], "assets/gb/");
let mainMap = js80.assets.processMap(TileMaps.demo, "");

let collide = TileMaps.demo.layers[1].data;

//?automate this?
function drawMaps(map, xOffset, yOffset){
  for(i in map.layers){
    js80.map(map.layers[i].data, tileSheet1, map.tileWidth, xOffset, yOffset);
  };
};

//set up themes
//main text window
let theme1 = js80.textbox.themes.gameDefault = js80.textbox.newTheme({
  x: 15, y: 135,
  width: 450, height: 100,
  bgColor: "#306230", bgImage: "",
  border: true, borderColor: "#0f380f",
  font: "ariel", fontSize: "16", fontColor: "#9bbc0f", lines: 4, 
  text: "", charLength: 30,
  vertOffset: 0, horOffset: 20,
  handleOverflow: true, overflowIcon: "", overflowIconOffset: {x: 20, y: 15},
});
//player menu
let playerTheme = js80.textbox.newTheme({
  x: 300, y: 20,
  width:170, height: 200,
  bgColor: "#306230", borderColor: "#9bbc0f",
  font: "ariel", fontSize: "16", fontColor: "#9bbc0f", lines: 6,
  text: "", charLength: 30,
  vertOffset: 0, horOffset: 20,
  handleOverflow: false, overflowIcon: "", overflowIconOffset: {x: 20, y: 15},
});

//input
function input(){
  
  switch(global._gameState){
    case "normal":
      normal();
      break;
    case "pause":
      pause();
      break;
    case "menu":
      menu();
      break;
    case "reading":
      reading();
      break;
    default:
  }

  function normal(){
    //modify movement speed if shift is held
    player1.running = false;
    if(js80.btn("Shift")){
      player1.running = true; //added to movement speed if shift is held
    }else{
      player1.running = false;
    };

    if(js80.btn("ArrowRight") || js80.btn("d")){
      //player1.animation.setAnim("walkRight");
      //player1.facing = "east";
      //if(!ecs.collision.checkCollision(player1, 1, 0, ["physical"]) && !ecs.collision.collideTile(mainMap.layers.collide.data, player1, player1.collision.width + 1, player1.collision.height / 2)){
      //  player1.x += player1.speed + runModifier;
      takeStep(player1, "east", 16, "walkRight");
      //};
    }else if(js80.btn("ArrowLeft") || js80.btn("a")){
      // player1.animation.setAnim("walkLeft");
      // player1.facing = "west";
      // if(!ecs.collision.checkCollision(player1, -1, 0, ["physical"]) && !ecs.collision.collideTile(mainMap.layers.collide.data, player1, -1, player1.collision.height / 2)){
      //   player1.x -= player1.speed + runModifier;
      takeStep(player1, "west", 16, "walkLeft");
      //};
    }else if(js80.btn("ArrowUp") || js80.btn("w")){
      // player1.animation.setAnim("walkUp");
      // player1.facing = "north";
      // if(!ecs.collision.checkCollision(player1, 0, -1, ["physical"]) && !ecs.collision.collideTile(mainMap.layers.collide.data, player1, player1.collision.width / 2, -1)){
      //   player1.y -= player1.speed + runModifier;
      takeStep(player1, "north", 16, "walkUp");
      //};
    }else if(js80.btn("ArrowDown") || js80.btn("s")){
      // player1.animation.setAnim("walkDown");
      // player1.facing = "south";
      // if(!ecs.collision.checkCollision(player1, 0, 1, ["physical"]) && !ecs.collision.collideTile(mainMap.layers.collide.data, player1, player1.collision.width / 2, player1.collision.height + 1)){
      //   player1.y += player1.speed + runModifier;
      takeStep(player1, "south", 16, "walkDown");
      //};
    };

    //interact //!add mode conditionals later
    if(js80.btnp(" ")){
      interactions.check(player1, 16);
    };

    //release
    if(!js80.btn("ArrowRight") && !js80.btn("ArrowLeft") && !js80.btn("ArrowUp") && !js80.btn("ArrowDown") && !js80.btn("d") && !js80.btn("a") && !js80.btn("w") && !js80.btn("s")){
      switch(player1.facing){
        case "north":
          player1.animation.setAnim("idleNorth");
          break;
        case "south":
          player1.animation.setAnim("idleSouth");
          break;
        case "east":
          player1.animation.setAnim("idleEast");
          break;
        case "west":
          player1.animation.setAnim("idleWest");
          break;
        default:
          player1.animation.setAnim("default");
      }
    };

    //menu
    if(js80.btnp("z")){
      global._gameState = "menu";
      callMenu();
    };
  };

  function pause(){
    if(js80.btn("Enter")){
      global._gameState = global.previousState;
    };
  };

  function reading(){
    if(js80.btnp(" ")){
      global._gameState = "normal"; //!instead check for last state(save in textbox controller?)
      dialogue.remove();
    };
  };

  function menu(){
    if(js80.btnp("z")){
      global._gameState = "normal";//!This could break recursive menus! consider adding a check of if(js80.menu.menus.length < 1){}
      js80.menu.menus[js80.menu.menus.length - 1].cancel();
    };
    if(js80.btnp(" ")){
      js80.menu.menus[js80.menu.menus.length - 1].select();
    };
    if(js80.btnp("ArrowUp") || js80.btn("w")){
      js80.menu.menus[js80.menu.menus.length - 1].moveUp();
    };
    if(js80.btnp("ArrowDown") || js80.btn("s")){
      js80.menu.menus[js80.menu.menus.length - 1].moveDown();
    };
  };
};


  //what is a better way of doing this?
let interactions = {
  interactables: [],
  new: function(entity, interaction){
    entity.interact = function(){interaction()};
    interactions.interactables.push(entity);
  },
  check: function(entity, area){
    //consider replacing tileSize with entity's height and width
    let tileSize = area || 16;
    for(i in interactions.interactables){
      switch(entity.facing){
        case "north":
          if(entity.y - tileSize <= interactions.interactables[i].y + (tileSize / 2) && interactions.interactables[i].y + (tileSize / 2) <= entity.y){
            if(entity.x <= interactions.interactables[i].x + (tileSize / 2) && interactions.interactables[i].x + (tileSize / 2) <= entity.x + tileSize){
              interactions.interactables[i].interact();
            };
          };
          break;
        case "south":
          if(entity.y + tileSize <= interactions.interactables[i].y + (tileSize / 2) && interactions.interactables[i].y + (tileSize / 2) <= entity.y + (tileSize * 2)){
            if(entity.x <= interactions.interactables[i].x + (tileSize / 2) && interactions.interactables[i].x + (tileSize / 2) <= entity.x + tileSize){
              interactions.interactables[i].interact();
            };
          };
          break;
        case "east":
          if(entity.y <= interactions.interactables[i].y + (tileSize / 2) && interactions.interactables[i].y + (tileSize / 2) <= entity.y + tileSize){
            if(entity.x + tileSize <= interactions.interactables[i].x + (tileSize / 2) && interactions.interactables[i].x + (tileSize / 2) <= entity.x + (tileSize * 2)){
              interactions.interactables[i].interact();
            };
          };
          break;
        case "west":
          if(entity.y <= interactions.interactables[i].y + (tileSize / 2) && interactions.interactables[i].y + (tileSize / 2) <= entity.y + tileSize){
            if(entity.x - tileSize <= interactions.interactables[i].x + (tileSize / 2) && interactions.interactables[i].x + (tileSize / 2) <= entity.x){
              interactions.interactables[i].interact();
            };
          };
          break;
        default:
      };
    };
  },
};


let npcGenerator = {
  npcs: [],
  new: function(spriteSheet, x, y, anims, dialogue, interact){
    //dialogue is an array of strings ["hello!", "how are you?"]
    let newNpc = ecs.entity.new(x, y);
    newNpc.facing = "south";
    newNpc.add.render(spriteSheet);
    newNpc.add.collision();
    newNpc.collision.tags.push("npc", "physical");
    newNpc.add.animation(anims);
    newNpc.behavior = npcGenerator.behavior;
    newNpc.variables = {};
    newNpc.dialogue = {
      line: 0,
      text: dialogue,
      controller: js80.textbox.newController(),
      next: function(npc){
        if(npc.dialogue.line < npc.dialogue.text.length - 1){
          npc.dialogue.line++;
        }
        interact();
      },
    },
    npcGenerator.npcs.push(newNpc);
    return newNpc;
  },
  behavior: {
    turn: function(newNpc, dir){
      newNpc.facing = dir;
      switch(dir){
        case "south":
        newNpc.animation.setAnim("idleSouth");
        break;
      case "east":
        newNpc.animation.setAnim("idleEast");
        break;
      case "west":
        newNpc.animation.setAnim("idleWest");
        break;
      case "north":
        newNpc.animation.setAnim("idleNorth");
        break;
      default:
        newNpc.animation.setAnim("idleSouth");
      };
    },
    findEntity: function(newNpc, target){
      let vertical = Math.abs(target.y - newNpc.y);
      let horizontal = Math.abs(target.x - newNpc.x);
      
      if(vertical > horizontal){
        if(target.y > newNpc.y){return "south"};
        if(target.y < newNpc.y){return "north"};
      }else{
        if(target.x > newNpc.x){return "east"};
        if(target.x < newNpc.x){return "west"};
      };

      // if(target.x > newNpc.x && Math.abs(target.y - newNpc.y) < 16){return "east"};
      // if(target.x < newNpc.x && Math.abs(target.y - newNpc.y) < 16){return "west"};
      // if(target.y > newNpc.y && Math.abs(target.x - newNpc.x) < 16){return "south"};
      // if(target.y < newNpc.y && Math.abs(target.x - newNpc.x) < 16){return "north"};
    },
    talk: function(newNpc, target, text){
      newNpc.behavior.turn(newNpc, newNpc.behavior.findEntity(newNpc, target));
      //js80.textbox.new(text);
      newNpc.dialogue.controller.write(newNpc.dialogue.text[newNpc.dialogue.line]);
      if(!newNpc.dialogue.controller.on)newNpc.dialogue.next(newNpc);
      newNpc.behavior.resume(newNpc);
    },
    interact: function(target){
      newNpc.turn(newNpc.findPlayer());
      //npc.dialogue.controller.write(npc.dialogue.text[npc.dialogue.line]);
      //if(!npc.dialogue.controller.on)npc.dialogue.next();
    },
    resume: function(newNpc){
      if(!newNpc.dialogue.controller.on){
        newNpc.behavior.turn(newNpc, "south");
        newNpc.animation.setAnim("walkDown");
      }else{
        //!Why is this delay not working?
        js80.timer.new(5000, function(newNpc){npcGenerator.behavior.resume(newNpc)});
      };
    },
  },
};

//camera translates between global and screen coordinates
let camera = {
  x: 0,
  y: 0,
  xOffset: 0,
  yOffset: 0,
  width: 160,
  height: 144,
  buffer: 20, //render anything that is -20 to screenwidth +20 and -20 to screenheight + 20
  target: "",
  //tell ecs.render to use camera
  init: function(){
    ecs.render.useCamera = true;
  },
  //convert from global to screen coords
  getScreen: function(x, y){
    return [x - (camera.x + camera.xOffset), y - (camera.y + camera.yOffset)];
  },
  //update position or choose new target
  follow: function(target){
    if(target){camera.target = target};
    camera.x = camera.target.x;
    camera.y = camera.target.y;
  },
  move: function(dir, speed){
    switch(dir){
      case  "up":
      case "north":
        camera.y += speed || 1;
        break;
      case "down":
      case "south":
        camera.y -= speed || 1;
        break;
      case "right":
      case "east":
        camera.x -= speed || 1;
        break;
      case "left":
      case "west":
        camera.x += speed || 1;
        break;
      default:
    };
  },
  fadeTo: function(color, speed, layer){},
  update: function(){
  },
};

function takeStep(entity, direction, distance, anim){
  global._gameState = "stepping";
  entity.animation.setAnim(anim);
  entity.facing = direction;
  entity.stepDistance = distance || 16;
  entity.currentStep = entity.stepDistance;
  entity.stepRate = 1;
  x = 0;
  y = 0;
  
  switch(direction){
    case "east":
      if(!ecs.collision.checkCollision(player1, 16, 0, ["physical"]) && !ecs.collision.collideTile(mainMap.layers.collide.data, player1, player1.collision.width + 1, player1.collision.height / 2)){
        //player1.x += player1.speed + runModifier;
        x = 1;
      };
      break;
    case "west":
      if(!ecs.collision.checkCollision(player1, -16, 0, ["physical"]) && !ecs.collision.collideTile(mainMap.layers.collide.data, player1, player1.collision.width - 1, player1.collision.height / 2)){
        //player1.x -= player1.speed + runModifier;
        x = -1;
      };
        break;
    case "north":
      if(!ecs.collision.checkCollision(player1, 0, -16, ["physical"]) && !ecs.collision.collideTile(mainMap.layers.collide.data, player1, player1.collision.width / 2, player1.collision.height - 1)){
        //player1.y -= player1.speed + runModifier;
        y = -1;
      };
      break;
    case "south":
      if(!ecs.collision.checkCollision(player1, 0, 16, ["physical"]) && !ecs.collision.collideTile(mainMap.layers.collide.data, player1, player1.collision.width / 2, player1.collision.height + 1)){
        //player1.y += player1.speed + runModifier;
        y = 1;
      };
      break;
    default:
  };

  //apply movement
  function applyMovement(x, y){
    entity.increment = 1;
    if(entity.running){
      entity.increment = entity.speed * entity.runModifier;
    }else{
      entity.increment = entity.speed;
    };
    entity.x += x * (entity.increment);
    entity.y += y * (entity.increment);
    entity.currentStep -= entity.speed;
    if(entity.currentStep < 1){
      entity.currentStep = entity.stepDistance;
      global._gameState = "normal";
    }else {
      js80.timer.new(entity.stepRate, function(){applyMovement(x, y)});
    };
  };
  applyMovement(x, y);

};

//manage generic textboxes here
let dialogue = {};

function callMenu(){
  let menu = js80.menu.new(
    "Player", ["status", "items", "save", "load", "exit"], [
      function(){menu.cancel(); global._gameState = "normal"}, 
      function(){let menu2 = js80.menu.new("Inventory", ["tons of glue", "I don't know", "soft knife"], [function(){console.log("eh."); menu2.cancel();}, function(){console.log("eeeeehhhhhhhhh."); menu2.cancel();}], {prependChoices: "    "})},
      function(){menu.cancel(); global._gameState = "reading"; save(); js80.save.save("js80.player1"); dialogue = js80.textbox.new("game saved.")},
      function(){menu.cancel(); global._gameState = "reading"; js80.save.load("js80.player1"); load(); dialogue = js80.textbox.new("game loaded.")},
      function(){menu.cancel(); global._gameState = "reading"},
    ],
      {prependChoices: "    ", theme: playerTheme});
};

camera.init();

let defaultAnims = {default: [0], idle: [0,0,1,1,0,0,2,2], idleSouth: [0], idleEast: [3], idleWest: [6], idleNorth: [9], walkLeft: [6,7,6,8], walkRight: [3,4,3,5], walkUp: [9,10,9,11], walkDown: [0,1,0,2]};

let player1 = ecs.entity.new(528, 352, 20);
player1.add.render(sprPlayer);
player1.add.collision(14, 11, 3, 2, ["player", "physical"]);
player1.facing = "south";
player1.speed = 2;
player1.runModifier = 2;
player1.add.animation({default: [0], idleSouth: [0], idleEast: [3], idleWest: [6], idleNorth: [9], walkLeft: [6,7,6,8], walkRight: [3,4,3,5], walkUp: [9,10,9,11], walkDown: [0,1,0,2]});
player1.animation.frameRate = 10;
//middle position of screen for gameboy resolution
//player1.position = {x: 80, y: 72};
player1.position = {x: 200, y: 120};//player's position relative to screen, not global coordinates
camera.xOffset = -player1.position.x;
camera.yOffset = -player1.position.y;

let npc2 = npcGenerator.new(sprNpc, 20 * 16, 22 * 16, defaultAnims, ["Hello, brave adventurer!", "cough cough", " /n /n woah."], function(){if(!npc2.variables.done){npc2.variables.done = true; console.log("success!")}});
npc2.animation.setAnim("idle");
interactions.new(npc2, function(){npc2.behavior.talk(npc2, player1, "Aloha!")});

let npc3 = npcGenerator.new(sprNpc3, 38 * 16, 25 * 16, defaultAnims, ["AAAAAAAAAAAHHHH!!!", "AAAAAAAAAAAHHHH!!!"], function(){});
npc3.facing = "west";
npc3.animation.setAnim("walkLeft");
interactions.new(npc3, function(){npc3.behavior.talk(npc3, player1, "Aloha!")});

let npc = npcGenerator.new(sprNpc2, 25 * 16, 25 * 16, defaultAnims, ["Hey, there! gggggggggggggggggggggggg ggggggggggggggggggggggg gggggggggggggggggggg ffffffffffffffffffff", "Wait, how did you get here?"], function(){});
interactions.new(npc, function(){npc.behavior.talk(npc, player1, "Aloha!")});

let textController = js80.textbox.newController();
interactions.new({x: 46 * 16, y: 23 * 16,}, function(){textController.write("Road Closed.")});
interactions.new({x: 41 * 16, y: 22 * 16,}, function(){textController.write("Welcome!")});

//generate array of collidable tiles
//copy unique tile numbers from collision map
let unique = Array.from(new Set(collide));

//remove -1
for(i in unique){
  if(unique[i] === -1){
    unique.splice(i, 1);
  }
}
//pass to collision system
ecs.collision.addCollidableTiles([unique]);

//set up save system
js80.save.init({x: player1.x, y: player1.y, facing: player1.facing});

function save(){
  js80.save.init({x: player1.x, y: player1.y, facing: player1.facing});
};

function load(){
  player1.x = js80.save.saveData.x;
  player1.y = js80.save.saveData.y;
  player1.facing = js80.save.saveData.facing;
};

let triggers = {
  triggers: [],
  new: function(conditions, effect, persistent, check){ //! add support for passing an array of conditions and/or effects
    let newTrigger = {};
    newTrigger.conditions = conditions || function(){return true};
    newTrigger.effect = effect || function(){};
    newTrigger.check =  check || "frame";  //!when to check condition (every frame, every step, every interaction, etc)
    newTrigger.delete = function(){triggers.triggers.splice(triggers.triggers.indexOf(newTrigger), 1)};
    newTrigger.persistent = persistent || false //delete this trigger after it is triggered once
    triggers.triggers.push(newTrigger);
    return newTrigger;
  },
  defaults: {
    target: {},
    w: 16,
    h: 16,
    conditions: function(){return true},
  },
  //call as a condition in triggers.new()
  step: function(x, y, target, w, h, conditions){
    target = target || triggers.defaults.target;
    w = w || triggers.defaults.w;
    h = h || triggers.defaults.h;
    conditions = conditions || triggers.defaults.conditions;
    if(conditions()){
      if(target.x > x && target.x < x + w){
        if(target.y > y && target.y < y + h){
          return true;
        };
      };
    };
    return false;
  },
  update: function(){
    //iterate triggers in triggers.triggers
    //call .effect() of any whose .condition() returns true
    //call a trigger's .delete() if it is not set to be persistent
    for(i in triggers.triggers){
      if(triggers.triggers[i].conditions()){
        triggers.triggers[i].effect();
        if(triggers.triggers[i].persistent === false){
          triggers.triggers[i].delete();
        }
      };
    };
  },
};

triggers.defaults.target = player1;

let trigger1 = triggers.new(function(){
  if(player1.x < 460 && player1.x > 446){
    if(player1.y > 352 && player1.y < 366){
      return true;
    };
  }else return false;
}, function(){
  global._gameState = "reading";
  dialogue = js80.textbox.new("Woah! Get out of here!");
});

let trigger2 = triggers.new(
  function(){return triggers.step(368, 352)}, 
  function(){
    global._gameState = "reading";
    dialogue = js80.textbox.new("yeah! it worked!");
  }
);

//init
function init(){};

//frame
function frame(){
  js80.timer.update();
  input();
  camera.follow(player1);
  js80.events.update();
  triggers.update();
  js80.cls("#0f380f");

  let mapCoordinates = camera.getScreen(0, 0);
  drawMaps(mainMap, mapCoordinates[0] / 16, mapCoordinates[1] / 16);
  ecs.update();

  js80.textbox.drawAll();
  js80.menu.drawAll();

};