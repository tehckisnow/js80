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

let spriteSheetEntity = scene1.newEntity();
let spriteSheet1 = spriteSheetEntity.add.assets(scene1, "spriteSheet", "sheet1.png", 16, 16);


let tileSetEntity1 = scene1.newEntity();
let tileSet1 = tileSetEntity1.add.assets(scene1, "tileSet", "tileset1.png", 16);

let mapEntity1 = scene1.newEntity();

let mapData = [TileMaps.testMap1, TileMaps.map1, TileMaps.map2];
let mapAsset = mapEntity1.add.assets(scene1, "map", mapData[0], mapData[0].width, tileSet1, 2, -1);
mapEntity1.add.render(scene1, "map", mapAsset, 0, 0, 0);
mapAsset.layers[1].visible = false;

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

let centerPosition = {x: 8 * 16, y: 6 * 16};

let player1 = npc.new(scene1, centerPosition.x, centerPosition.y, 1, ["woah"], spriteSheet1, 0, defaultAnims, 16, 16, 0, 0, []);

let position = {
  get: function(map, entity){
    return {x: -map.x + entity.x, y: -map.y + entity.y};
  },
  set: function(map, entity, x, y){
    entity.x = -x + entity.x;
    entity.y = -y + entity.y;
  },
};

let mapNpcs = [{x: 6 * 16, y: 4 * 16, z: 1, text: ["holla!"]}, {x: 16 * 16, y: 4 * 16, z: 1, text: ["hiya!", "later!"]}, {x: 7 * 16, y: 4 * 16, z: 10, text: ["I am at z-level 10!"]}, {x: 8 * 16, y: 4 * 16, z: -1, text: ["I am at z-level -1!"]}];
function genNpcs(list){
  let npcs = [];
  for(i in mapNpcs){
    npcs.push(npc.new(scene1, mapNpcs[i].x, mapNpcs[i].y, mapNpcs[i].z, mapNpcs[i].text, spriteSheet1, 0, defaultAnims, 16, 16, 0, 0, []));
  };
  return npcs;
};

let imageTest = scene1.newEntity(0, 0, -20);
let image111 = imageTest.add.assets(game1, "image", "tileset1.png");
imageTest.add.render(scene1, "image", image111, 0, 0);

let generatedNpcs = genNpcs(mapNpcs);

scene1.map.setCurrent(mapEntity1);

position.set(scene1.map.current, startingPosition.x, startingPosition.y);

//!mapEffects (will rename mapEvents)

//!talk()

//!inspectMapObject()

//!uiController
//!dialogue

//!getProperties()

//!checkExit()

//!effects

//!exit()

//!audioController
//!music and sfx assets

game1.frame = function(){

  engine.input.update(inputManager);
  
  game1.update();

};//game1.frame()

game1.start();