
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
let player1 = npc.new(scene1, 8 * 16, 6 * 16, 1, ["woah"], spriteSheet1, 0, defaultAnims, 16, 16, 0, 0, []);
let npc1 = npc.new(scene1, 5 * 16, 5 * 16, 1, [""], spriteSheet1, 0, defaultAnims, 16, 16, 0, 0, []);

//add entities to iterable arrays to be processed by systems in game loop
let animatedEntities = [player1, npc1];
let renderedEntities = [mapEntity1, npc1, player1];
let collidableEntities = [npc1, player1];

player1.moveSpeed = 1;
player1.player = true;

function createDescription(x, y, text, interaction){
  let desc = scene1.newEntity(x, y, 0);
  desc.behavior = {};
  desc.behavior.speak = function(){
    console.log(text);
    //! create a textbox
  };
  desc.interaction = interaction || function(){};
  return desc;
};//createDescription()

let interactions = [];
interactions.push(createDescription(8 * 16, 32, "just a stool."));

function inspect(x1, y1, dir, entities){
  let height = 16;
  let width = 16;
  let x = 0;
  let y = 0;
  switch(dir){
    case "up":
      y = -height;
      break;
    case "down":
      y = height;
      break;
    case "left":
      x = -width;
      break;
    case "right":
      x = width;
      break;
    default:
  };
  //check for npc entity at coordinates player.x + x, player.y + y
  for(i in entities){
    //if there is an entity, call it's npc.behavior.speak();
    if(entities[i].x === x1 + x && entities[i].y === y1 + y){
      if(entities[i].behavior.speak){
        entities[i].behavior.speak();
      };
      entities[i].interaction();
    };
  };
};

//moveWorld(nonPlayer, -1, 0);
let nonPlayer = [mapEntity1, npc1];
function moveWorld(things, x, y){
  for(i in things){
    //! changed these to negative for tile-based movement
    things[i].x += -x;
    things[i].y += -y;
  };
};

let clock = engine.timer.newManager();
clock.timer(300, function(){console.log("first timer up!")});

let stepTrigger = engine.events.newEventManager();
stepTrigger.newEvent(function(){if(mapEntity1.y > 100){return true}else{return false}}, function(){console.log("effect triggered")});

let sequenceManager = engine.sequence.newManager();
let seq1 =  [function(){console.log("I")}, function(){console.log("cannot")}, function(){console.log("believe")}, function(){console.log("it")}, function(){console.log("is")}, function(){console.log("not")}, function(){console.log("butter")}]

stepTrigger.newEvent(function(){if(mapEntity1.x > 100){return true}else{return false}}, function(){sequenceManager.new(seq1)});
//main game loop
game1.frame = function(){
  sequenceManager.update();
  stepTrigger.update();
  //update game clock
  clock.update();
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

  //console.log("game:", inputManager.currentMode.name);
  //console.log("player:", player1.state);
};

//start game
game1.start();