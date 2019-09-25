let game1 = engine.newGame();
let scene1 = game1.scenes.new();

engine.render.cls(game1, "blue");
let fade = engine.ui.effects.fade2(game1, "black", 300, 1);
fade.start();

let opacity = 0;

game1.frame = function(){
  engine.render.cls(game1, "orange");
  engine.render.rect(game1, 20, 20, 20, 20, "green");
  //console.log(fade);
  //engine.render.rect(game1, 0, 0, game1.settings.width, game1.settings.height, "rgba(100,0,0," + opacity + ")");
  game1.update();
  fade.update();
  //opacity += 0.01;
};//game1.frame()
game1.start();