
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
let tileSet1 = mapEntity1.add.assets(scene1, "tileSet", "tileset1.png", 16);
let mapData = TileMaps.map1;
let mapAsset = mapEntity1.add.assets(scene1, "map", mapData.layers, mapData.width, tileSet1, -1);
mapEntity1.add.render(scene1, "map", mapAsset, 0, -32, -32);

//create player entity from npc.js
let player1 = npc.new(scene1, 64, 32, 1, "woah", spriteSheet1, 0, defaultAnims, 12, 16, 2, 0, []);

//add entities to iterable arrays to be processed by systems in game loop
let animatedEntities = [player1];
let renderedEntities = [mapEntity1, player1];
let collidableEntities = [player1];

//main game loop
game1.frame = function(){
  //clear the screen
  engine.render.cls(game1, "black");
  //update timers
  npcEventTimer.update();
  //update input states
  engine.input.update(inputManager);
  //update animations
  engine.animation.update(animatedEntities);
  //draw entities to game canvas
  engine.render.update(game1, renderedEntities);
 
  //console.log(inputManager.currentMode.name);
};

//start game
game1.start();