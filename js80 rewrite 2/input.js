function collision(entity, dir, group, map, layer){
  let x = 0;
  let y = 0;
  switch(dir){
    case "up":
      y = -1;
      break; 
    case "down":
      y = 16;//!
      break; 
    case "left":
      x = -1;
      break; 
    case "right":
      x = 16;//!
      break; 
    default:
  };
  //if(!engine.collision.collideEntity(group, entity, x, y, ["physical"])){
  if(!engine.collision.checkPoint(entity.x + x, entity.y + y, group, "physical")){
    //! x and y for collideLayer below should be modified
    if(!engine.collision.collideLayer(map, layer, entity, x, y)){
      return false;
    };
  };
  return true;
};

let inputManager = engine.input.newManager(game1);
let playMode = inputManager.newMode("play");
//inputManager.setMode(playMode); 

let steppingMode = inputManager.newMode("stepping");
steppingMode.noKey(function(){
  if(player1.state === "idle"){
    inputManager.setMode(playMode);
  };
});

//moveWorld(nonPlayer, x, y);

playMode.newKey("a", function(){
  inputManager.setMode(steppingMode);
  player1.animation.setAnim("walkLeft");
  moveWorld(nonPlayer, 1, 0);
  //player1.behavior.step("left", 16, player1.moveSpeed, "walkLeft", function(){return collision(player1, "left", collidableEntities, mapAsset, 2)});
    }, true);
playMode.newKey("d", function(){
  inputManager.setMode(steppingMode);
  player1.animation.setAnim("walkRight");
  moveWorld(nonPlayer, -1, 0);
  //player1.behavior.step("right", 16, player1.moveSpeed, "walkRight", function(){return collision(player1, "right", collidableEntities, mapAsset, 2)});
    }, true);
playMode.newKey("w", function(){
  inputManager.setMode(steppingMode);
  player1.animation.setAnim("walkUp");
  moveWorld(nonPlayer, 0, 1);
  //player1.behavior.step("up", 16, player1.moveSpeed, "walkUp", function(){return collision(player1, "up", collidableEntities, mapAsset, 2)});
    }, true);
playMode.newKey("s", function(){
  inputManager.setMode(steppingMode);
  player1.animation.setAnim("walkDown");
  moveWorld(nonPlayer, 0, -1);
  //player1.behavior.step("down", 16, player1.moveSpeed, "walkDown", function(){return collision(player1, "down", collidableEntities, mapAsset, 2)});
    }, true);
playMode.newKey(" ", function(){inspect(player1.x, player1.y, player1.facing, interactions)}, true);
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
});