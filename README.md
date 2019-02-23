# js80

//----------------------------------------------
//HTML/JS 2d Game Engine
//----------------------------------------------
//create an html doc and set a script src to this file as well as
//a file that contains the functions: "init()" and "frame()". (optionally: preload() and settings())
//This is the game file.  Also link the optional ecs system file "ecs.js" before the game file if using the ecs system features

//this file does the following:
// 1. sets up the game
// 2. calls init() in game file
// 3. calls frame() 50(adjustable) times per second
// 4. provides some useful methods to call, such as
////      spr() //draw a sprite
////      drawLine()  //draw a line
////      btn() //returns true if passed key is currently pressed
// API:

//TODO:
  //sprite scaling
  //onresize()
  //pick name for engine (currently js-80)
  //bootup intro animation?
  //check buildGame and BuildBezel for css shorthand properties to use
  //reset()
  //mouse()
  //click()
  //spr() should loop back over beginning of spritesheet if it's parameters are outside of it's area
  //spr() should support multi-row sprite sheets
  //consider seperating spritesheet and sprites
  //toggle setting to make edges of screen collidable (ECS system?)
  //loading screen
  //preload function for audio/visual assets
  //sprite rotations (fix rSpr()/testSpr() and incorporate into spr())
  //support DYNAMIC scaling (both canvas and sprites)
  //scenes manager
  //test like crazy!
  //research accessibility layer and screen reader support?
  //error messages/ handling
  //write API documentation


//----------------------------------------------
//ECS System
//link this in yout html file after engine.js but before the game file.  This file is optional.
//many game engines have an ECS (Entity Component System) system for memory resource optimization.  This one is here primarily for project organization and making common tasks faster with less repeated code necessary.

//overview:
//import ecs.js to an html document AFTER engine.js but BEFORE the game file
//call this to initialize the ecs system:
//ecs.systems.systemsManager.init();
//this dynamically populates ecs.components based on what systems are present
//it also assigns the various systems create() method to the systems manager to be added to new entities

//in game loop, call
//ecs.systems.systemsManager.update();
//this populates ecs.systems.manager.activeSystems with a list of 
//all systems that have an active component, then iterates this list
//and calls all active systems' update() method.

//each system's update() method iterates over only it's own components

//todo:
  //create() functions should get entity id without it being passed in! (use class-based inheritance?)
  //collision tags
  //componentsToAdd argument in ecs.systems.entities.create() (faster way of creating entities)
  //ECS.newEntity shortcut doesn't work (ECS is not defined)
  //prefabs / archetypes
  //default collision detection system
  //parent/child
  //default event manager
  //events = {}; eventManager(){for(i in events){ if(event[i].conditions === true){for(x in event[i].subscribers){event[i].subscribers[x].call(); }}}}
  //should there be a single global animation timer and framerate instead of many?
  //ecs settings like default framerate?
  //write external find function and reference in ecs.systems.X.find() ?
  //write external iteration loop and reference in each component's system?
  //manage drawing layers
  //background/image render component
  //establish priority ordering of ECS systems?
  //change frame() call to use deltaTime instead
  //error messages/ handling


//------------------------------------------------------------------
//Test Game (River City Ransom clone)

//TODO:
  //additional moves: walking jump, running jump, walking punch, running punch, walking kick, running kick
  //collision detection for both movement and damage (working on this in the ecs system first)
  //enemies
  //damage system
  //enemy AI
  //is init() even actually necessary?
  //seperate x/y of playerEntity from where sprite is drawn, so that jump is animated while keeping player's position consistent
    //consider drawing a shadow to help indicate the playerEntity's actual position?

//-------------------------------------------------------------------
ChangeLog:

  Saturday, Feb 23rd:
    restructured project
    moved notes/to from original file to README
    organized README/removed already completed tasks from the TODOs