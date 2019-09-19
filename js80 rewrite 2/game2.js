
//TODO:
//mapObjects are off by one tile in y axis.  why?
//textbox sys
//menu sys

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

//create game object
let game1 = engine.newGame();
//create first scene and set it active
let scene1 = game1.scenes.new();
scene1.setActive();

//create assets
//  spritesheet
//    create entity
let spriteSheetEntity =  scene1.newEntity();
//    add spritesheet asset component
let spriteSheet1 = spriteSheetEntity.add.assets(scene1, "spriteSheet", "sheet1.png", 16, 16);
//  map entity
let mapEntity1 = scene1.newEntity();

let tileSetEntity1 = scene1.newEntity();
let tileSet1 = tileSetEntity1.add.assets(scene1, "tileSet", "tileset1.png", 16);

let mapData = TileMaps.map1;
let mapAsset = mapEntity1.add.assets(scene1, "map", mapData.layers, mapData.width, tileSet1, -1);
mapEntity1.add.render(scene1, "map", mapAsset, 0, 0, 0);

let mapData2 = TileMaps.map2;
let mapEntity2 = scene1.newEntity();
let mapAsset2 = mapEntity2.add.assets(scene1, "map", mapData2.layers, mapData2.width, tileSet1, -1);
mapEntity2.add.render(scene1, "map", mapAsset2, 0, 0, 0);

//create player entity from npc.js
let centerPosition = {x: 8 * 16, y: 6 * 16};
let player1 = npc.new(scene1, centerPosition.x, centerPosition.y, 1, ["woah"], spriteSheet1, 0, defaultAnims, 16, 16, 0, 0, []);
function getPlayerPosition(){
  return {x: -currentMap.x + centerPosition.x, y: -currentMap.y + centerPosition.y};
};
function setPlayerPosition(entity, x, y){
  entity.x = -x + centerPosition.x;
  entity.y = -y + centerPosition.y;
};
let npc1 = npc.new(scene1, 5 * 16, 5 * 16, 1, [""], spriteSheet1, 0, defaultAnims, 16, 16, 0, 0, []);

//add entities to iterable arrays to be processed by systems in game loop
let animatedEntities = [player1, npc1];
let renderedEntities = [npc1, player1];
let collidableEntities = [npc1, player1];
let currentMap = mapEntity1;

let mapEffects = [
  function(){},
  function(){uiController.write("You have found a wrench!", dialogue)},
  function(thisEffect){uiController.write("You found $5.00!"); console.log("$5.00!"); mapEffects[thisEffect] = function(){}},
];

function inspectMapObject(x, y, map, layer){
  //! Tiled Offset
  y = y + 16;

  let mapObjects =  map.layers[layer].objects;
  for(g in mapObjects){
    if(mapObjects[g].x < x && mapObjects[g].x + mapObjects[g].width > x && mapObjects[g].y < y && mapObjects[g].y + mapObjects[g].height > y){
      if(mapObjects[g].properties){
        for(u in mapObjects[g].properties){
          if(mapObjects[g].properties[u].name === "effect"){
            mapEffects[mapObjects[g].properties[u].value](mapObjects[g].properties[u].value);
          };
          if(mapObjects[g].properties[u].name === "desc"){
            uiController.write(mapObjects[g].properties[u].value, dialogue);
            inputManager.setMode(readMode);
          };
          //!handle these elsewhere because they are triggered differently
          ////!if(mapObjects[i].properties[u].name === "exit"){};
          //!if(mapObjects[i].properties[u].name === "entity"){};
        };
      };
    };
  };
};//inspectMapObjects()

let timerManager = engine.timer.newManager();

let dialogueTheme = engine.ui.textbox.newTheme({
  x: 10, y: 150, height: game1.settings.height - 160, width: game1.settings.width - 20,
  bgColor: colors[3], borderColor: colors[1], fontColor: colors[1],
  charLength: 50, vertOffset: 10, lines: 2,
  overflowIconColor: colors[0],
});

let uiController = engine.ui.textbox.newController(game1, dialogueTheme);
let dialogue = uiController.new("", dialogueTheme);

//get a properties object from a mapObject
function getProperties(mapObject){
  let properties = {};
  for(i in mapObject.properties){
    properties[mapObject.properties[i].name] = mapObject.properties[i].value;
  };
  return properties;
};

function checkExit(map, layer, x, y){
  //! Tiled Offset
  y = y + 16;
  
  let mapObjects = map.assets[0].layers[layer].objects;
  for(g in mapObjects){
    if(mapObjects[g].x < x && mapObjects[g].x + mapObjects[g].width > x && mapObjects[g].y < y && mapObjects[g].y + mapObjects[g].height > y){
      //!move this to asset creation!
      let properties = getProperties(mapObjects[g]);
      if(properties.exit !== undefined){
        let setMap = maps[properties.exit];
        let setX = properties.destinationX;
        let setY = properties.destinationY;
        let setFacing = properties.facing;
        exit(setMap, setX, setY, setFacing);
      };
    };
  };
};//checkExit()

let fade = engine.ui.effects.fade(game1, "0,0,0", 100, "to");
let maps = [mapEntity1, mapEntity2];
function exit(map, x, y, facing){
  //set mode to disable input
  inputManager.currentMode.disable();
  //fade to black
  fade = engine.ui.effects.fade(game1, "0,0,0", 100, "to");
  fade.start();
  //sound effect
  console.log("sound effect here");

  timerManager.timer(100, function(){
    setPlayerPosition(currentMap, 0, 0);
    //set map
    currentMap = map;
    //set x/y
    setPlayerPosition(currentMap, x, y);
    //set facing
    player1.facing = facing || "down";
    //fade back
    fade = engine.ui.effects.fade(game1, "0,0,0", 100, "from");
    fade.start();
  });

  //check map events


  //set mode to reenable input
  timerManager.timer(200, function(){
    inputManager.currentMode.enable();
  });

};//exit()

//main game loop
game1.frame = function(){

  timerManager.update();
  //clear the screen
  engine.render.cls(game1, "black");
  //update input states
  engine.input.update(inputManager);
  //update animations
  engine.animation.update(animatedEntities);
  //manually draw currentMap to canvas
  engine.render.map(game1, currentMap);
  //draw entities to game canvas
  engine.render.update(game1, renderedEntities);
  //draw ui
  fade.update();
  uiController.update();
  //console.log(getPlayerPosition());
};

//start game
game1.start();