//TODO:
////move uiController out of textbox so that menu can use it, too
////write system for getting Tiled objectLayer properties and use in asset creation (instead of checking map layers while the game is running)
////    talk(), inspectMapObject(), and checkExit() will be based on this
////organize and reintroduce the missing functions from game.js as a single module
////make title intro skippable
////Fade isn't working.  rebuild?
//revise event system (i have three different implementations here.  consolidate them!)
//fix spriteSheet (breaks if dimensions are not manually set)
//asset preloader
//finish npc behavior system
//menu system
//an entity should have a destroy function which will find all of it's components and destroy them, too

//!Do I need a variation of engine.assets.checkMapObject() that will
//      !return ALL objects that fit the parameters?

//! is newLayer.findProperty redundant now that I have newLayer.checkMapObject?

//! deal with newLayer.mget's first line, "y = y + 16"

//! how to set a tileEvent's desc to a new value?
//!   change map data? probably

//game data
//  this game's color reference;
let colors = [ //darkest to lightest
  "#0f380f",
  "#306230",
  "#8bac0f",
  "#9bbc0f"
];
//  default animations
let defaultAnims = {default: [0], idle: [0,0,1,1,0,0,2,2], idleDown: [0], idleRight: [3], idleLeft: [6], idleUp: [9], walkLeft: [6,7,6,8], walkRight: [3,4,3,5], walkUp: [9,10,9,11], walkDown: [0,1,0,2]};

let game1 = engine.newGame();
let scene1 = game1.scenes.new();
//scene1.setActive();
//game1.scenes.setCurrent(scene1);

let doorSfx = scene1.audio.manager.newTrack("sfx", "punch.wav");

let dialogueTheme = engine.ui.textbox.newTheme({
  x: 10, y: 150, height: game1.settings.height - 160, width: game1.settings.width - 20,
  bgColor: colors[3], borderColor: colors[1], fontColor: colors[1],
  charLength: 50, vertOffset: 10, lines: 2,
  overflowIconColor: colors[0],
});

let spriteSheet1 = engine.assets.spriteSheet(scene1, "sheet1.png", 16, 16);
let tileSet1 = engine.assets.tileSet(scene1, "tileset1.png", 16);
let mapEntity1 = scene1.newEntity();
let mapData = [TileMaps.testMap1];
let mapAsset = mapEntity1.add.assets(scene1, "map", mapData[0], mapData[0].width, tileSet1, 2, -1);
mapEntity1.add.render(scene1, "map", mapAsset, 0, 0, 0);
mapAsset.layers[1].visible = false;
scene1.map.setCurrent(mapEntity1);

//find player starting position
let startingPosition = mapAsset.layers[2].findProperty("start");
let player1 = npc.new(scene1, startingPosition.x, startingPosition.y, 1, ["woah"], spriteSheet1, 0, defaultAnims, 16, 16, 0, 0, []);

let camera = engine.render.camera.new(scene1);
let centerPosition = {x: 8 * 16, y: 6 * 16};
camera.follow(player1, -centerPosition.x, -centerPosition.y);

//!move this stuff into npc manager
function generateNpcsFromMap(map, layer, data, TiledOffset){
  let preNpcs = [];
  let npcs = [];
  let objects = map.assets[0].layers[layer].objects;
  for(i in objects){
    if(objects[i].entity !== undefined){preNpcs.push(objects[i])};
  };
  for(i in preNpcs){
    npcs.push(npc.new(scene1, preNpcs[i].x, preNpcs[i].y + TiledOffset, 1, data[preNpcs[i].entity].text, spriteSheet1, 0, defaultAnims, 16, 16, 0, 0, []));
  };
  return npcs;
};//generateNpcs()
let npcData = [{text: ["holla!"], interaction: function(){}}, {text:["hiya!", "later!"], interaction: function(){}}, {text: ["I am at z-level 10!"], interaction: function(){}}];
let generatedNpcs = generateNpcsFromMap(scene1.map.current, 2, npcData, -16);

function checkNpcs(list, x, y, tag){
  let result = engine.collision.checkPoint(x, y, list, tag);
  if(result){
    //! set up a way to ensure this only ever fires once!
    result.interaction();
    if(result.dialogue !== ""){
      result.behavior.turn(result.behavior.find(player1));
      inputManager.setMode(readMode);
      dialogue.open(result.dialogue[result.dialogueLine], function(){inputManager.setMode(readMode)});
      if(result.dialogueLine < result.dialogue.length - 1){result.dialogueLine++};
    };
  };
};
//!store npcs in map?  or use the current scene entities!

function checkExit(game, map, layer, x, y, tiledOffset){
  let result = engine.assets.checkMapObject(map, layer, x, y, "exit");
  if(result){
    exit(game, result.exit, result.destinationX, result.destinationY + tiledOffset, result.facing);
  };
};

//! a better way to do this?
//mapTransition
let exits = [mapEntity1];
function exit(game, map, x, y, facing){
  playMode.disable();
  //fade to black
  let transitionFade1 = game.scenes.current.ui.manager.effect.new("fade", game1, "black", 100, "to");
  //transitionFade1.start();
  scene1Fade.start("black", 100, 1);
  //sound effect
  doorSfx.play();
  player1.behavior.idle();
  game.scenes.current.timer.manager.timer(100, function(){
    player1.x = 0; player1.y = 0;
    //set map
    //  exits[map]
    //!
    
    //set player position
    player1.x = x; player1.y = y; player1.facing = facing || "down";
    //fade back
    //let transitionFade2 = game.scenes.current.ui.manager.effect.new("fade", game1, "black", 100, "from");
    scene1Fade.start("black", 100, -1);
    //check map events

  });
  game.scenes.current.timer.manager.timer(150, function(){
    inputManager.currentMode.enable();
  });
};//exit()

let dialogue = scene1.ui.manager.textbox.new("", dialogueTheme);

//!mapEvents (previously called mapEffects)
//!Rename this (and in input.js)  I need checkMapInteractions as well
let mapEvents = [
  function(){console.log("event 0!")}, 
  function(){dialogue.open("You have found the treasure!", function(){inputManager.setMode(readMode)}); inputManager.setMode(readMode); mapEvents[1] = function(){}},
  function(){console.log("test")},
];
function checkMapEvents(map, layer, x, y){
  let result = map.assets[0].layers[layer].checkMapObject(x, y, "event");
  if(result){
    mapEvents[result.event]();
  };
};

function checkMapDescription(map, layer, x, y){
  let result = map.assets[0].layers[layer].checkMapObject(x, y, "desc");
  if(result){
    if(result.desc === ""){return};
    inputManager.setMode(readMode);
    dialogue.open(result.desc, function(){inputManager.setMode(readMode)});
  };
};//checkMapDescription()

scene1Fade = scene1.ui.manager.effect.new("fade", game1, "black", 100, 1);

let music1 = scene1.audio.manager.newTrack("music", "music.mp3");

game1.frame = function(){
  game1.update();
};//game1.frame()
game1.start();