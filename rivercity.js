////@ts-check

//TODO:
//walking jump, running jump, walking punch, running punch, walking kick, running kick
//collision detection for both movement and damage
//enemies
//damage system
//enemy AI
//is init() even actually necessary?
//sprite scaling
//init() may not be necessary
//seperate x/y of playerEntity from where sprite is drawn, so that jump is animated while keeping player's position consistent

//settings

settings.settings(
  {
    gameCanvasSize: {x:240,y:256}
  }
);

//import assets
let sprite = new js80.assets.sprite("rivercity.png", 16);
let bg = new js80.assets.sprite("riverbackground.png", 16);
let healthUnit = new js80.assets.sprite("river health.png", 16);

let music1 = new js80.assets.audio("RCR Stage1.mp3");
let punchSound = new js80.assets.audio("punch2.wav");

function gravity(array){
  //pass in an array of objects to be affected by gravity
  let grav = 2;
  for(i in array){
    if(array[i].z > 0){
      array[i].z -= grav;
      array[i].y += grav;
      array[i].ground = false;
    }else {
      array[i].ground = true;
    }

  }
};

let timeToTriggerRun = 20;

function input(){
  //check for running
  if(js80.btnp("ArrowRight") || js80.btnp("d")){
    if(playerEntity.runCheck){
      playerEntity.running = true;
    }else
    playerEntity.runCheck = true;
    js80.timer.new(timeToTriggerRun, function(){
      playerEntity.runCheck = false;
    });
  }
  if(js80.btnp("ArrowLeft") || js80.btnp("a")){
    if(playerEntity.runCheck){
      playerEntity.running = true;
    }else
    playerEntity.runCheck = true;
    js80.timer.new(timeToTriggerRun, function(){
      playerEntity.runCheck = false;
    });
  }
  //right now you can trigger a run by pressing "right-left".  fix this?

  //walking
  if(js80.btn("ArrowRight") || js80.btn("d")){
      if(playerEntity.idle){
        playerEntity.components.render.flip = false;
        //collision detection
        if(ecs.systems.collision.collisionCheck(playerEntity.id).length <= 0 ){
        //if(js80.mget(map1, player.x + 18, player.y + 40) < 0){
        
        playerEntity.components.animation.setAnimation("walk");
        //check if running
        if(playerEntity.running){
          playerEntity.components.animation.setAnimation("run");
          playerEntity.x += playerEntity.runSpeed;
        }else
        //if not, walk
        playerEntity.x += playerEntity.speed;
      }
    }
  }
  if(js80.btn("ArrowLeft") || js80.btn("a")){
    if(playerEntity.idle){
      //if(js80.mget(map1, player.x +14, player.y + 40) < 0){
      playerEntity.components.render.flip = "x";
      playerEntity.components.animation.setAnimation("walk");
      //check if running
      if(playerEntity.running){
        playerEntity.components.animation.setAnimation("run");
        playerEntity.x -= playerEntity.runSpeed;
      }else
      //if not, walk
      playerEntity.x -= playerEntity.speed;
    }
  }
  if((js80.btn("ArrowUp") || js80.btn("w")) ){//&& player.data.ground){
    if(playerEntity.idle){  
      playerEntity.components.animation.setAnimation("walk");
      playerEntity.y -= playerEntity.vSpeed;
    }
  }
  if(js80.btn("ArrowDown") || js80.btn("s")){
    if(playerEntity.idle){
      playerEntity.components.animation.setAnimation("walk");
      playerEntity.y += playerEntity.vSpeed;
    }
  }
  //punch/kick
  if(js80.btnp("q") || js80.btnp("z")){
    if(playerEntity.idle){
      //playerEntity.components.animation.setAnimation("punch");
      js80.sfx(punchSound);
      playerEntity.components.animation.setNoLoop("punch");
      playerEntity.running = false;
      playerEntity.idle = false;
      js80.timer.new(15, function(){
        //playerEntity.components.animation.interrupt("idle");
        playerEntity.idle = true;
      });
    }
  }
  if(js80.btnp("e") || js80.btnp("x")){
    if(playerEntity.idle){
      //playerEntity.components.animation.setAnimation("kick");
      js80.sfx(punchSound);
      playerEntity.components.animation.setNoLoop("kick");
      playerEntity.running = false;
      playerEntity.idle = false;
      js80.timer.new(15, function(){
        //playerEntity.components.animation.interrupt("idle");
        playerEntity.idle = true;
      });
    }
  }
  //jump
  if(playerEntity.ground && ((js80.btn("z") && js80.btn("x")) || (js80.btn("q") && js80.btn("e")))){
    //if stationary jump, walking jump, and running jump
    playerEntity.components.animation.setAnimation("jump");
    
    playerEntity.z += playerEntity.jump;
    playerEntity.y -= playerEntity.jump; //change this!
  };
  //pausemenu
  if(js80.btnp("Enter")){
    //toggle menu
  }
  //return to idle //build a better way in ecs.systems.animation
  if(playerEntity.idle){
    if(!(js80.btn("w")) && !(js80.btn("a")) && !(js80.btn("s")) && !(js80.btn("d")) &&!(js80.btn("ArrowUp")) && !(js80.btn("ArrowLeft")) && !(js80.btn("ArrowDown")) && !(js80.btn("ArrowRight")) && !(js80.btn("q")) && !(js80.btn("e")) && !(js80.btn("z")) && !(js80.btn("x"))){
      playerEntity.components.animation.setAnimation("idle")
      playerEntity.running = false;
  };
  }

  // if(!(js80.btn("w")) && !(js80.btn("a")) && !(js80.btn("s")) && !(js80.btn("d")) &&!(js80.btn("ArrowUp")) && !(js80.btn("ArrowLeft")) && !(js80.btn("ArrowDown")) && !(js80.btn("ArrowRight")) && !(js80.btn("q")) && !(js80.btn("e")) && !(js80.btn("z")) && !(js80.btn("x"))){
  //     playerEntity.components.animation.setAnimation("idle")
  // };
};

//use ECS system: (must come before any calls to ecs)
ecs.systems.manager.init();

// let wall = ecs.systems.entities.create(0, 0, 0);
// wall.addComponent.collision(wall.id, "rect", 249, 100);
// let ground = ecs.systems.entities.create(0, 200);
// ground.addComponent.collision(ground.id, "rect", 249, 200);

let playerEntity = ecs.systems.entities.create(32, 125);
playerEntity.addComponent.render(playerEntity.id, sprite, 1, 2, 2);
playerEntity.addComponent.animation(
  playerEntity.id, 
  {//anims
    idle: [1],
    walk: [0, 0, 1, 1, 2, 2],
    jump: [3],
    land: [4],
    block: [5],
    run: [0, 1, 2, 6],
    punch: [7, 8, 9],
    kick: [10, 11, 12],
    hit: [13, 14, 15, 16]
  }, 
  "idle", 
  5);
  playerEntity.z = 0;
  playerEntity.ground = true;
  playerEntity.jump = 30;
  playerEntity.speed = 1;
  playerEntity.vSpeed = 0.5;
  playerEntity.idle = true;
  playerEntity.runCheck = false;
  playerEntity.running = false;
  playerEntity.runSpeed = 3;
  playerEntity.stamina = 50;
  playerEntity.maxStamina = 50;
  playerEntity.width = 16;
  playerEntity.height = 32;
  playerEntity.addComponent.collision(playerEntity.id, "rect", playerEntity.width, playerEntity.height);

    let wall = ecs.systems.entities.create(0, 0, 0);
    wall.addComponent.collision(wall.id, "rect", 249, 110);
    let ground = ecs.systems.entities.create(0, 200);
    ground.addComponent.collision(ground.id, "rect", 249, 200);
    let block = ecs.systems.entities.create(100, 100, 0);
    block.addComponent.collision(block.id, "rect", 50, 50);
  

function drawHealth(health){
  let horizontalPosition = 50;
  while(health > 0){
    js80.spr(healthUnit, horizontalPosition, 14);
    horizontalPosition += 5;
    health -= 10;
  }
};

function init(){
  engine.draw.imageSmoothingEnabled = false;
  js80.setTitle("River City Ransom");
  //js80.mset(map1, 15, 8, 7);
  js80.music(music1, true);
};

function frame(){
  js80.timer.update();
  gravity([playerEntity]);
  //handle input
  input();
  //update background
  js80.cls("black");
  js80.spr(bg, -1, 40);


  //update ECS system
  ecs.systems.manager.update();
  js80.text("ALEX", 15, 25, "white", 14, "wintermute");
  drawHealth(playerEntity.stamina);

  //debugging
  js80.rect(0, 0, 249, 135, "rgba(100,0,0,0.8)");
  js80.rect(0, 200, 249, 200, "rgba(100,0,0,0.8)");
  js80.rect(100, 100, 50, 50, "rgba(100,0,0,0.8)");
  js80.rect(playerEntity.x, playerEntity.y, playerEntity.width, playerEntity.height, "rgba(100,0,0,0.8)");
  //js80.log(ecs.systems.collision.collisionEvents);
  //if(ecs.systems.collision.collisionEvents.length > 0)js80.log("colliding");

  let collArray = [];
  let coll = ecs.systems.collision.collisionCheck(playerEntity.id);
  for(i in coll){collArray.push(coll[i].id)};
  js80.log(collArray);
};