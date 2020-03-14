//TODO: djfkdjk
////input system need buttonP() type function
////fix font
//eliminate delay in step when changing direction
//change step() so that entity first turns, then moves, so that tapping can rotate character
//    (this will be dependant on rewriting the input system first)
////speed up room transitions
//map tile animations
//test map switching (I think this works but I don;t remember testing it)
////improve font (bold, larger, fix position, darker color?)
//scale size
//improve pixel clarity (???)
//pressing enter on title screen multiple times resets transition instead of speeding it up
//implement animated maptiles
//!implement basic menu system
//implement running
//build basic demo
//I think I still need to support multi-line spritesheets
//does this engine currently support non-square (rectangular) sprites? (aside from using tile method)
//add toggle-able setting for pixel graphics, as seen on;
//    https://developer.mozilla.org/en-US/docs/Games/Techniques/Crisp_pixel_art_look
//instead of using line numbers to reference issues, use commented issue numbers

//[I320] this is an example issue
//? fjkdjfkd

//game data
//  this game's color reference;
let colors = [ //darkest to lightest
  "#0f380f",
  "#306230",
  "#8bac0f",
  "#9bbc0f"
];
//  default animations
let defaultAnims = {default: [0], idle: [0,0,1,1,0,0,2,2], idleDown: [0], idleRight: [3], idleLeft: [6], idleUp: [9], walkLeft: [6,7,6,8], walkRight: [3,4,3,5], walkUp: [9,10,9,11], walkDown: [0,1,0,2]};

let game1 = engine.newGame();
let scene1 = game1.scenes.new();

let dialogueTheme = engine.ui.textbox.newTheme({
  x: 10, y: 150, height: game1.settings.height - 160, width: game1.settings.width - 20,
  bgColor: colors[3], borderColor: colors[1], fontColor: colors[0],
  charLength: 45, vertOffset: 15, horOffset: 10, lines: 2,
  overflowIconColor: colors[0],
  font: 'ebrima',
});

let spriteSheet1 = engine.assets.spriteSheet(scene1, "spritewalk1.png", 16, 16);
let spriteSheetSoldier = engine.assets.spriteSheet(scene1, "soldierwalk1.png", 16, 16);

//let player1 = npc.new(scene1, startingPosition.x, startingPosition.y, 1, ["woah"], spriteSheet1, 0, defaultAnims, 16, 16, 0, 0, []);
let player1 = scene1.newEntity(10, 10);
player1.add.render(scene1, "sprite", spriteSheet1, defaultAnims);

let camera = engine.render.camera.new(scene1);
let centerPosition = {x: 8 * 16, y: 6 * 16};
camera.follow(player1, -centerPosition.x, -centerPosition.y);

let dialogue = scene1.ui.manager.textbox.new("", dialogueTheme);

let mainMenuTheme = engine.menu.newTheme({});
let mainMenuManager = engine.menu.newManager(game1);
let mainMenuOptions = [
  {text: "new", effect: function(){console.log('new')}},
  {text: "load", effect: function(){console.log('load')}},
  {text: "quit", effect: function(){console.log('quit')}}
];
mainMenuManager.newMenu('Main Menu', mainMenuOptions, mainMenuTheme);

game1.frame = function(){
  game1.update();
};//game1.frame()
game1.start();