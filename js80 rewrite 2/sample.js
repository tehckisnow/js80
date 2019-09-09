//this is a sample of what the game's API should look like when used
//write engine to accomodate this
//TODO:
//event system

//API:
//defaultSettings
//engine = {
//  start: sets up initial main gameloop which iterates over all active scenes, calling their update() method
//  newGame: returns an object that will hold all game data
//  DOM: manages and creates DOM elements
//  assets: manages and creates assets
//  render: draws content to the screen and manages entities with render components
//    camera: optional component to control rendering to the screen.  offers offset
//  entity: manages and creates entities, which are objects that contain references to the constructors of every component for each system
//  animation: a system for managing animation data and updating an entity's currently active sprite
//  collision: a system for checking for collisions
//  events: a system for managing, creating, and resolving events
//  input: a system for managing keyboard and mouse input
//  save: a system for managing saves and save data
//};

//create settings object to pass into engine.newGame, specifying only the properties that differ from defaultSettings
let settings = {
  width: 300,
  height: 200,
};
//create a new game object and pass in custom settings.  
let game = engine.newGame(settings);
//create a new scene and set it to be active
let scene1 = game.scenes.new();
scene1.setActive();

//import needed assets and assign them to the current scene
let image1 = scene1.assets.image("tileset1.png");
let spriteSheet = scene1.assets.spriteSheet("tileset1.png", 16);
let tileSet1 = scene1.assets.tileSet("tileset1.png", 16);
//below is the most manual way to create a map.  using a Tiled .js file is simplest
let map1Layer1 = scene1.assets.mapLayer([0,0,0,0], visible);
let map1Layer2 = scene1.assets.mapLayer([0,1,1,1,1], visible);
let map1 = scene1.assets.map(tileSet, 20, [map1Layer1, map1Layer2, {data:[0,0,0,0]},{data:[1,1,1,1]}]); //!...

//alternative: using engine methods to create assets and assigning them to a scene manually
let image2 = engine.assets.image("image.png");
scene1.add.assets(image2);

//event data
let events = []; //!...  //this could be pulled from Tiled mapdata!

//creating an entity for the map so that the render system will handle drawing the map
let mapEntity = scene.add.entity(0,0,-1);
mapEntity.add.render("map", map1, tileSet1);

//collisions
entity443.destroy(); //removes from current scene!
entity443.collision.new(["projectile"], function(){entity443.destroy()});

scene1.collision.addTileLayer(map, layer);
scene1.collision.addCollidableTiles(map, layer, [tiles]);
//?merge these into one method?

let defaultAnims = {anims: {idleSouth: [4,4,4]}}; //!...

let npcData = [[20, 20, 0, spritesheet1, defaultAnims, "Hello!", [0,0,16,16]]]; //!...
let npcs = npc.batchGen(npcData);

//game specific npc generation methods
let npc = {
  batchGen: function(npcsArray){
    let npcs = [];
    for(i in npcsArray){
      npcArray.push(npc.gen(npcsArray[i]));
    };
    return npcs;
  },
  gen: function(x, y, z, spriteSheet, animations, defaultDialogue, collisionProperties){
    let newNpc = scene.add.entity(x, y, z);
    newNpc.add.render(spriteSheet, 0);
    newNpc.add.animation(animations);
    newNpc.add.collision(collisionProperties);

    newNpc.collision.tags.push("physical");

    newNpc.defaultDialogue = defaultDialogue;
    newNpc.facing = "south";
    newNpc.state = "idle";
    //set default animation here?
    newNpc.behavior = {
      currentActivity: "idle",
      active: true, //whether or not to update behavior in update(). not called if npc is passive
      update: function(){
        if(newNpc.behavior.active){
          newNpc.behavior[newNpc.behavior.currentActivity]();
        };
      },
      //used to revert back to when another action has completed
      //can optionally specify direction
      idle: function(dir){
        if(dir){
          newNpc.facing = dir;
        };
        newNpc.animation.setAnim("idle" + newNpc.facing);//!
        //!The above line is partially hardcoding animation names.  This is suboptimal
        newNpc.state = "idle";
      },
      //return direction to target
      find: function(target){
        //
        x = target.x - newNpc.x;
        y = target.y - newNpc.y;

        //!

        return dir;
      },
      //set npc's facing to dir
      turn: function(dir){
        newNpc.facing = dir;
        //!newNpc.animation = "";

      },
      //npc turns to dir, sets it's state, schedules movement, animates, and reverts state after resolving
      step: function(dir, distance, animation, collisionTest){
        //!
        if(!collisionTest(newNpc, x, y, tags)){ //!
          newNpc.state = "stepping";
          newNpc.distanceRemaining = distance;
          newNpc.animation.setAnim(animation);
          let xMove = 0;
          let yMove = 0;
          switch(dir){
            case "north":
              yMove = -1;
              break;
            case "south":
              yMove = 1;
              break;
            case "east":
              xMove = 1;
              break;
            case "west":
              xMove = -1;
              break;
            default:
          };
          //save data xMove, yMove, and distanceRemaining
          //schedule event
          event(function(){
            newNpc.x += xMove;
            newNpc.y += yMove;
            newNpc.distanceRemaining--;
            if(newNpc.distanceRemaining < 0){
              //!newNpc.state = "idle";
            }else{
              //!schedule new event

            }
          }, 1);

        };
      },
      //npc follows or approaches a target
      follow: function(target){
        //find(target);
        //if not adjacent:
        //  turn();
        //  step();
        //else
        //  idle();
      },
      //randomly selects behavior from an array
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
      interact: function(target, action, state){
        newNpc.turn(newNpc.find(target));
        newNpc.state = state || newNpc.state;
        action();
      },
    };
  },
};

//entity is made manually here instead of using npcGen()
let ent1 = scene.add.entity(50, 50, 50);
ent1.add.render(spriteSheet, 0);
ent1.add.animation(defaultAnims);
ent1.animation.setAnim("idleSouth");
ent1.add.collision(0, 0, 16, 16, ["physical"]);

let player = npc.gen(50, 50, 5, spriteSheet1, defaultAnims, "");
player.collision.xOffset = 2;
player.collision.width = 14;
player.collision.tags = ["physical", "player"];

let camera = scene.add.camera(50, 50, 20);
camera.follow(player, 0, 0, 0);

//input
let playMode = engine.input.newMode("play");
engine.input.setMode(playMode);
let steppingMode = engine.input.newMode("stepping");
let menuMode = engine.input.newMode("menu");
playMode.newKey("a", function(){
  engine.input.setMode(steppingMode);
  player.behavior.step("west", 16, "walkWest", layer3);
});
playMode.newKey("s", function(){
  engine.input.setMode(steppingMode);
  player.behavior.step("south", 16, "walkSouth", layer3);
});
playMode.newKey("w", function(){
  engine.input.setMode(steppingMode);
  player.behavior.step("north", 16, "walkNorth", layer3);
});
playMode.newKey("d", function(){
  engine.input.setMode(steppingMode);
  player.behavior.step("east", 16, "walkEast", layer3);
});

playMode.newKey(" ", function(){});
playMode.newKey("esc", function(){
  engine.input.setMode(menuMode);
  menu.open();
});
menuMode.newKey("w", function(){
  menu.up();
});
menuMode.newKey("s", function(){
  menu.down();
});
menuMode.newKey(" ", function(){
  menu.select();
});
menuMode.newKey("esc", function(){
  menu.close();
  engine.input.setMode(playMode);
});

let menu = {
  settings: {
    loop: true,
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  },
  open: function(){},
  close: function(){},
  up: function(){},
  down: function(){},
  select: function(){},
};

//save
function save(name){
  engine.save.new(name, player.x, player.y, player.facing, player.hp);
};
function load(){
  let data = engine.save.load(name);
  player.x = data.x;
  player.y = data.y;
  player.facing = data.facing;
  player.hp = data.hp;
};

game.init = function(){}; //?

game.frame = function(){
  //engine.input.update();
  game.update();
  //camera.update(); //?

};

game.start();

//----------------------------


// let game = engine.newGame();
// let scene1 = game.scenes.new();
// scene1.setActive();
// //let image1 = scene1.assets.newImage();
// //let tileset1 = scene1.assets.newTileset();
// let player = scene1.entities.new(20,20,2);

// game.frame = function(){
//   game.update();

// };

// game.start();