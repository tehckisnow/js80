
//if(!engine.collision.collideEntity(collidableEntities, player, 0, -1, ["physical"])){
  //if(!engine.collision.collideLayer(mapAsset, 2, player, 0, -1)){

let inputManager = engine.input.newManager(game1);
let playMode = inputManager.newMode("play");
//inputManager.setMode(playMode); 

let steppingMode = inputManager.newMode("stepping");
steppingMode.noKey(function(){
  if(player1.distanceRemaining <= 0){
    inputManager.setMode(playMode);
  };
});

playMode.newKey("a", function(){
  inputManager.setMode(steppingMode);
  player1.behavior.step("left", 16, 10, "walkLeft", function(){return false});
    });
playMode.newKey("d", function(){
  inputManager.setMode(steppingMode);
  player1.behavior.step("right", 16, 10, "walkRight", function(){return false});
    });
playMode.newKey("w", function(){
  inputManager.setMode(steppingMode);
  player1.behavior.step("up", 16, 10, "walkUp", function(){return false});
    });
playMode.newKey("s", function(){
  inputManager.setMode(steppingMode);
  player1.behavior.step("down", 16, 10, "walkDown", function(){return false});
    });
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