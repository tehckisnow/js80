//TODO:
//organize and reintroduce the missing functions from game.js as a single module
//move uiController out of textbox so that menu can use it, too
//write system for getting Tiled objectLayer properties and use in asset creation (instead of checking map layers while the game is running)
//    talk(), inspectMapObject(), and checkExit() will be based on this
//fix spriteSheet (breaks if dimensions are not manually set)
//asset preloader
//finish npc behavior system
//menu system

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
scene1.setActive();
game1.scenes.setCurrent(scene1);

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
function getStart(layer){
  for(obj in mapAsset.layers[layer].objects){
    for(prop in mapAsset.layers[layer].objects[obj].properties){
      if(mapAsset.layers[layer].objects[obj].properties[prop].name === "start"){
        return {
          x: mapAsset.layers[layer].objects[obj].x,
          y: mapAsset.layers[layer].objects[obj].y,
          facing: mapAsset.layers[layer].objects[obj].properties[prop].value,
        };
      };
    };
  };
};//getStart()
let startingPosition = getStart(2);

let player1 = npc.new(scene1, startingPosition.x, startingPosition.y, 1, ["woah"], spriteSheet1, 0, defaultAnims, 16, 16, 0, 0, []);

let camera = engine.render.camera.new(scene1);
let centerPosition = {x: 8 * 16, y: 6 * 16};
camera.follow(player1, -centerPosition.x, -centerPosition.y);

//!generate npcs from map instead
// let mapNpcs = [{x: 6 * 16, y: 4 * 16, z: 1, text: ["holla!"]}, {x: 16 * 16, y: 4 * 16, z: 1, text: ["hiya!", "later!"]}, {x: 7 * 16, y: 4 * 16, z: 10, text: ["I am at z-level 10!"]}, {x: 8 * 16, y: 4 * 16, z: -1, text: ["I am at z-level -1!"]}];
// function genNpcs(list){
//   let npcs = [];
//   for(i in mapNpcs){
//     npcs.push(npc.new(scene1, mapNpcs[i].x, mapNpcs[i].y, mapNpcs[i].z, mapNpcs[i].text, spriteSheet1, 0, defaultAnims, 16, 16, 0, 0, []));
//   };
//   return npcs;
// };
// let generatedNpcs = genNpcs(mapNpcs);

//!!!! use these entries from game.js to rewrite the following

//!mapEvents (previously called mapEffects)

//!talk()
//!inspectMapObject()
//!getProperties()
//!checkExit()
function checkExit(){};
//!exit()

//!uiController
//!dialogue

//!effects

//!audioController
//!music and sfx assets

game1.frame = function(){
  game1.update();
};//game1.frame()
game1.start();