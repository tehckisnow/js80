let distance = 16;

function convertDirection(dir){
  let x = 0;
  let y = 0;
  switch(dir){
    case "up":
      y = -1;
      break; 
    case "down":
      y = 1;//!
      break; 
    case "left":
      x = -1;
      break; 
    case "right":
      x = 1;//!
      break; 
    default:
  };
  let dirObject = {};
  dirObject.x = x;
  dirObject.y = y;
  return dirObject;
};//convertDirection()

function collisionTest(entity, dir){
  let map = mapAsset;
  let layer = 2;
  let group = collidableEntities;
  //!remove these later

  let direction = convertDirection(dir);
  if(engine.collision.checkPoint(entity.x + direction.x, entity.y + direction.y, group, "physical")){
    return true;
  }
  if(engine.collision.collideLayer(map, layer, entity, direction.x, direction.y)){
    return true;
  };
  return false;
};//collision()

function move(entity, dir, distance){
  //!move this to inside of the collision detection below?
  let direction = convertDirection(dir);
  let x = direction.x;
  let y = direction.y;  

  //collision detection
  if(!collisionTest(entity, dir)){
    //move
    //!
    moveWorld(nonPlayer, x, y);
  };

  //moveWorld(nonPlayer, x, y);
};//move()

let inputManager = engine.input.newManager(game1);
let playMode = inputManager.newMode("play");

let steppingMode = inputManager.newMode("stepping");
//steppingMode.noKey sets mode to play if player state is idle

playMode.newKey("a", function(){
  //inputManager.setMode(steppingMode);
  player1.facing = "left";
  player1.animation.setAnim("walkLeft");
  //collision detection

  //movement
  move(player1, "left", distance);
}, true);
playMode.newKey("d", function(){
  //inputManager.setMode(steppingMode);
  player1.facing = "right";
  player1.animation.setAnim("walkRight");
  //movement
  move(player1, "right", distance);
}, true);
playMode.newKey("w", function(){
  //inputManager.setMode(steppingMode);
  player1.facing = "up";
  player1.animation.setAnim("walkUp");
  //movement
  move(player1, "up", distance);
}, true);
playMode.newKey("s", function(){
  //inputManager.setMode(steppingMode);
  player1.facing = "down";
  player1.animation.setAnim("walkDown");
  //movement
  move(player1, "down", distance);
}, true);
playMode.newKey(" ", function(){
  inspect();
  //!
}, true);
playMode.noKey(function(){
  let anim = "";
  switch(player1.facing){
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
  player1.animation.setAnim(anim);
  //inputManager.setMode(playMode);
});
