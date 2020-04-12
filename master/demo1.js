//--------
//TEST

let settings = {
  debug: false,
};
let game1 = engine.newGame(settings);
let scene1 = game1.newScene();
scene1.activate();
let player = scene1.newEntity(10, 50, 0);

game1.loop = function(){

},//game1.loop()

game1.start();