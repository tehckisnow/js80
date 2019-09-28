
let game1 = engine.newGame();
let scene1 = game1.scenes.new();
let mapEntity = scene1.newEntity(0, 0);
let tileSet = engine.assets.tileSet(scene1, "metroid tileset.png", 16);
let mapAsset = mapEntity.add.assets(scene1, "map", TileMaps.metroid1, TileMaps.metroid1.width, tileSet, 2, -1);
let punchSfx = scene1.audio.manager.newTrack("sfx", "punch.wav");
let spriteSheet = engine.assets.spriteSheet(scene1, "metrodsprites.png", 32, 32);
mapEntity.add.render(scene1, "map", mapAsset, 0, 0, 0);
scene1.map.setCurrent(mapEntity);
scene1.setActive();
game1.scenes.setCurrent(scene1);

let player = scene1.newEntity(1 * 16, 9 * 16);
player.add.render(scene1, "sprite", spriteSheet, 3);
//player.add.animation();
//player.add.collision();

let camera = engine.render.camera.new(scene1);
camera.follow(player, -100, -100);

//input
let inputManager = engine.input.newManager();
let playMode = inputManager.newMode("play");
playMode.newKey("w", function(){});
playMode.newKey("a", function(){});
playMode.newKey("s", function(){});
playMode.newKey("d", function(){});
playMode.newKey(" ", function(){});
function input(){
  if(playMode.btn("a")){player.render.flipH = 1; player.x--};
  if(playMode.btn("d")){player.render.flipH = -1; player.x++};
  if(playMode.btn("w")){player.y--};
  if(playMode.btn("s")){player.y++};
  if(playMode.btn(" ")){player.y--};
};

//! flip sprite or add right-facing sprites

//!collision detection

//!gravity

//!jump and movement modes

//!shooting

//!enemies

game1.frame = function(){
  input();
  game1.update();
};
game1.start();