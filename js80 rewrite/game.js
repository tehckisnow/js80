let game1 = new Game();

game1.build();

//--------------------------
let player = game1.entity.new(200, 200);
//movement
//  add wasd-style movement
function add2AxisFreeMove(entity, speed){
  entity.speed = speed;
  entity.moveDown = function(){entity.y += entity.speed};
  entity.moveUp = function(){entity.y -= entity.speed};
  entity.moveLeft = function(){entity.x -= entity.speed};
  entity.moveRight = function(){entity.x += entity.speed};
};
//  add left-right platformer-style movement
function add1AxisFreeMove(entity, speed){
  entity.speed = speed;
  entity.moveLeft = function(){entity.x -= entity.speed};
  entity.moveRight = function(){entity.x += entity.speed};
};
//  add basic vertical jump
function addJump(entity, speed, height){
  entity.moveJump = function(){

  };
};
//moving jump?

add1AxisFreeMove(player, 2);
addJump(player, 2, 10);

game1.input.newMode("normal");
game1.input.normal.newKey("a", function(){player.moveLeft()});
game1.input.normal.newKey("d", function(){player.moveRight()});
game1.input.normal.newKey("w", function(){player.moveUp()});
game1.input.normal.newKey("s", function(){player.moveDown()});
game1.input.normal.newKey("space", function(){player.moveJump()});

function frame(){

};