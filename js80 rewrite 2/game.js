
//set up settings object
let settings = {
  height: 200,
  width: 300,
  systemOrder: ["animation", "render"],
};

//a game holds settings and scenes
let game1 = engine.newGame(settings);

//scenes hold references to their game, lists of entities, and references to useful methods
//create a new scene and set it active
let scene1 = game1.scenes.new();
scene1.setActive();

//entities hold components, and references to component constructors
//create a new entity
let player = scene1.newEntity(32, 32, 1);

//components hold data
//create new component
let spriteSheetEntity = scene1.newEntity();
let spriteSheet2 = spriteSheetEntity.add.assets(scene1, "spriteSheet", "sheet1.png", 16, 16);

//assets are also components, and must be added to an entity
player.add.render(scene1, "sprite", spriteSheet2, 3);

//new map as entity
let mapEntity1 = scene1.newEntity();
let tileSet1 = mapEntity1.add.assets(scene1, "tileSet", "tileset1.png", 16);
let mapData = TileMaps.map1;
let mapAsset = mapEntity1.add.assets(scene1, "map", mapData.layers, mapData.width, tileSet1, -1);
mapEntity1.add.render(scene1, "map", mapAsset, 0, -32, -32);
mapAsset.layers[3].visible = false;

let mapEntity2 = scene1.newEntity();
let mapAsset2 = {
  "tileheight": 16,
  "tilewidth": 16,
  "type": "map",
  "width": 20,
  "layers": [
    {"data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 20, 20, 20, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 26, 26, 26, 26, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 26, 0, 0, 26, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 109, 110, 111, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "visible": true,
    "width": 20,
    "type": "tilelayer"}]};
let map2 = mapEntity2.add.assets(scene1, "map", mapAsset2.layers, 20, tileSet1, -1);
mapEntity2.add.render(scene1, "map", map2, 0, -32, -32);

////a map entity holds collision data


//additional components
let defaultAnims = {default: [0], idle: [0,0,1,1,0,0,2,2], idleDown: [0], idleRight: [3], idleLeft: [6], idleUp: [9], walkLeft: [6,7,6,8], walkRight: [3,4,3,5], walkUp: [9,10,9,11], walkDown: [0,1,0,2]};
player.add.animation(defaultAnims, 10, "walkDown", "walkDown");
player.add.collision(scene1, 12, 16, 2, 0, ["physical"]);

let npc1 = scene1.newEntity(50, 50);
npc1.add.render(scene1, "sprite", spriteSheet2, 8);
npc1.add.animation(defaultAnims, 10, "walkDown", "walkDown");
npc1.add.collision(scene1, 12, 16, 2, 0, ["physical"]);

//UI objects work similarly to input objects in that they are usually passed in rather than created for a scene
//let playerMenu = engine.menu.new();
//scene1.add.menu(playerMenu);

//!textboxes!

//game specific npc generator, modeled after the one in sample.js
// adds an entity, render, animation, and collision components
//also adds behavior components
let npcEventManager = engine.events.newEventManager();
let npc = {
  batchGen: function(npcsArray){
    let npcs = [];
    for(i in npcsArray){
      npcs.push(npc.new(npcsArray[i]));
    };
    return npcs;
  },
  new: function(scene, x, y, z, dialogue, asset, spriteIndex, anims, collisionWidth, collisionHeight, collisionXOffset, collisionYOffset, tags){
    let npc = scene.newEntity(x, y, z);
    npc.add.render(scene, "sprite", asset, spriteIndex || 0);
    npc.add.animation(anims);
    npc.add.collision(scene1, collisionWidth, collisionHeight, collisionXOffset, collisionYOffset, tags);
    npc.collision.tags.push("physical");
    npc.dialogue = dialogue;
    npc.facing = "south";
    npc.state = "idle";
    npc.behavior = {
      idle: function(dir){
        if(dir){
          npc.facing = dir;
        };
        npc.animation.setAnim("idle" + npc.facing);
        npc.state = "idle";
      },
      find: function(target){
        let x = npc.x - target.x;
        let y = npc.y - target.y;
        if(Math.abs(x) > Math.abs(y)){
          if(x < 0){
            return "Right";
          }else{
            return "Left";
          };
        }else{
          if(y < 0){
            return "Down";
          }else{
            return "Up";
          };
        };
      },
      turn: function(dir){
        npc.facing = dir;
        npc.animation.setAnim("idle" + dir);
      },
      step: function(dir, distance, animation, collisionTest){
        if(!collisionTest(npc, x, y, tags)){ //!
          npc.state = "stepping";
          npc.facing = dir;
          npc.distanceRemaining = distance;
          npc.animation.setAnim(animation);
          let xMove = 0;
          let yMove = 0;
          switch(dir){
            case "up":
              yMove = -1;
              break;
            case "down":
              yMove = 1;
              break;
            case "right":
              xMove = 1;
              break;
            case "left":
              xMove = -1;
              break;
            default:
          };
          function move(x, y){
            npc.x += x;
            npc.y += y;
            npc.distanceRemaining--;
          };
          npcEventManager.new(npcEventManager, "frame", function(){
            if(npc.distanceRemaining > 0){
                npc.condition = 3;
                move(xMove, yMove);
            }else{
              npc.state = "idle";
              if(npc.player){
                inputManager.setMode(playMode);
              };

            };
          });
        };
      },
      follow: function(target){},
      wander: function(frequency, speed, distance, ...args){
        if(newNpc.state === "wander"){
          let actions = [
            function(){newNpc.behavior.step("north")},
            function(){newNpc.behavior.step("south")},
            function(){newNpc.behavior.step("east")},
            function(){newNpc.behavior.step("west")},
            function(){newNpc.behavior.idle("north")},
            function(){newNpc.behavior.idle("south")},
            function(){newNpc.behavior.idle("east")},
            function(){newNpc.behavior.idle("west")},
          ];
          actions[engine.random(actions.length - 1)]();
          //schedule event to run again
          //! use event system
          //event(newNpc.wander(), frequency);
        };
      },
      interact: function(){},
    };

    return npc;
  },
  
};//npcGenerator

let player2 = npc.new(scene1, 76, 76, 0, "", spriteSheet2, 0, defaultAnims, 12, 16, 2, 0, []);
player2.player = true;

let npc2 = npc.new(scene1, 100, 30, 0, "woah", spriteSheet2, 0, defaultAnims, 12, 16, 2, 0, []);

let collidableEntities = [npc1, npc2, player];

let inputManager = engine.input.newManager(game1);
let playMode = inputManager.newMode("play");
inputManager.setMode(playMode); 
playMode.newKey("a", function(){
  player2.behavior.step("left", 16, "walkLeft", function(){return false});
  inputManager.setMode(steppingMode);
  //player.facing = "left";
  //player.animation.setAnim("walkLeft");
  //if(!engine.collision.collideEntity(collidableEntities, player, -1, 0, ["physical"])){
    //if(!engine.collision.collideLayer(mapAsset, 2, player, -1, 0)){
      //player.x--}}
    });
playMode.newKey("d", function(){
  player2.behavior.step("right", 16, "walkRight", function(){return false});
  inputManager.setMode(steppingMode);
  //player.facing = "right";
  //player.animation.setAnim("walkRight");
  //if(!engine.collision.collideEntity(collidableEntities, player, 1, 0, ["physical"])){
    //if(!engine.collision.collideLayer(mapAsset, 2, player, player.collision.width, 0)){
      //player.x++}}
    });
playMode.newKey("w", function(){
  player2.behavior.step("up", 16, "walkUp", function(){return false});
  inputManager.setMode(steppingMode);
  //player.facing = "up";
  //player.animation.setAnim("walkUp");
  //if(!engine.collision.collideEntity(collidableEntities, player, 0, -1, ["physical"])){
    //if(!engine.collision.collideLayer(mapAsset, 2, player, 0, -1)){
      //player.y--}}
    });
playMode.newKey("s", function(){
  player2.behavior.step("down", 16, "walkDown", function(){return false});
  inputManager.setMode(steppingMode);
  //player.facing = "down";
  //player.animation.setAnim("walkDown");
  //if(!engine.collision.collideEntity(collidableEntities, player, 0, 1, ["physical"])){
    //if(!engine.collision.collideLayer(mapAsset, 2, player, 0, player.collision.height)){
      //player.y++}}
    });
playMode.newKey(" ", function(){
  //textBox1.advance(game1);
});
playMode.newKey("m", function(){
  textBox1.open();
});
playMode.newKey("g", function(){fade3.start()});
playMode.newKey("b", function(){
  dialogue.write("So this is a story all about how my life got flipped, turned upside-down! So this is a story all about how my life got flipped, turned upside-down!", textBox1);
});
playMode.newKey("Escape", function(){console.log("esc"); menu1.open(); inputManager.setMode(menuMode)});
playMode.noKey(function(){
  let anim = "";
  switch(player2.facing){
    case "up":
      anim = "idleUp";
      break;
    case "left":
      anim = "idleLeft";
      break;
    case "right":
      anim = "idleRight";
      break;
    default:
      anim = "idleDown";
  };
  player2.animation.setAnim(anim);
});
let menuMode = inputManager.newMode("menu");
menuMode.newKey("w", function(){menu1.up()});
menuMode.newKey("s", function(){menu1.down()});
menuMode.newKey(" ", function(){menu1.select()});
menuMode.newKey("esc", function(){console.log("esc"); menu1.close(); inputManager.setMode(playMode)});
menuMode.noKey(function(){}); //! shouldn't have to do this!

let steppingMode = inputManager.newMode("stepping");
steppingMode.newKey(" ", function(){});
steppingMode.noKey(function(){}); //! shouldn't have to do this!

game1.init = function(){};


let timers = engine.timer.newManager();
timers.new(200, function(){console.log("Test Complete.")
  timers.new(200, function(){console.log("Test Complete.")});
  npc2.behavior.step("down", 16, "walkDown", function(){return false})
});

let eventManager1 = engine.events.newEventManager();
//eventManager1.new(trigger, function(){console.log("first event complete!")}, function(){player.y > 100});
//does the above need a return statement?

let colors = [ //darkest to lightest
  "#0f380f",
  "#306230",
  "#8bac0f",
  "#9bbc0f"
];

let theme1 = engine.ui.textbox.newTheme({
  x: 16, y: 16,
  width: game1.settings.width - 32, height: game1.settings.height - 32,
  bgColor: colors[3], borderColor: colors[0],
  text: "test!", fontColor: colors[0],
  vertOffset: 16,
  overflowIconColor: colors[0],
  //lines: 3,
});

let dialogue = engine.ui.textbox.newController(game1);
let textBox1 = dialogue.new("woah!", theme1);

//let textBox1 = engine.ui.textbox.new("tesssst! /n yeeeaaahhh! /n dfjkdkdfkdj /n oops /n gah", theme1);

let fade1 = engine.ui.effects.fade(game1, "0,0,0,", 200, "from");
fade1.start();

let fade3 = engine.ui.effects.transition(game1, "0,0,0,", 100, 20, 100, function(){console.log("stuff!")});

//current menu test
let options = [];
options[0] = engine.ui.menu.newOption("start", function(){console.log("starting")});
let menu1 = engine.ui.menu.new("Options:", options, theme1);

//temporarily removed for testing
let menu2 = engine.ui.menu.new("Options:", [
  engine.ui.menu.newOption("start", function(){console.log("starting")}),
  engine.ui.menu.newOption("continue", function(){console.log("continuing")}),
  engine.ui.menu.newOption("exit", function(){console.log("exiting")}),
], theme1);

game1.frame = function(){
  //game1.update();
  npcEventManager.update();
  if(playMode.btnp(" ")){textBox1.advance()};
  engine.timer.update([timers]);
  //npc2.behavior.turn(npc2.behavior.find(player));
  engine.render.cls(game1, "black");
  engine.input.update(inputManager);
  engine.animation.update([player2]);
  engine.render.update(game1, [mapEntity1, npc1, npc2, player, player2, mapEntity2]);
  //engine.ui.textbox.draw(game1, textBox1);
  dialogue.update();
  fade1.update();
  fade3.update();
  //engine.render.rect(game1, 0, 0, 1000, 1000, "rgba(0,0,0,1)");
  menu1.update();
};

game1.start();
