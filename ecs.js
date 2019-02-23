//todo:
//create() functions should get entity id without it being passed in!

//collision tags

//componentsToAdd argument in ecs.systems.entities.create() (faster way of creating entities)

//ECS.newEntity shortcut doesn't work (ECS is not defined)
//prefabs / archetypes
//default collision detection
// this may or may not be important: "Instead of an Update function, we now have an OnUpdate in which we are getting all of our entities and we iterate through them executing the behavior."
//should ECS be inside engine.js or as an optional module?
//parent/child
//default event manager
//events = {}; eventManager(){for(i in events){ if(event[i].conditions === true){for(x in event[i].subscribers){event[i].subscribers[x].call(); }}}}


//should there be a single global animation timer and framerate instead of many?
//ecs settings like default framerate?
//write external find function and reference in ecs.systems.X.find() ?
//write external iteration loop and reference in each component's system?
//manage drawing layers
//background/image render component
//establish priority ordering of ECS systems
//change frame() call to use deltaTime instead
//error messages

//-------------------------------------------------
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

//ecs system
let ecs = {
  nextId: 0,
  entities: [],
  components: [],
  systems: {
    manager: {
      //build components list in ecs.components
      init: function(){
        for(i in ecs.systems){
          if(ecs.systems[i].type){
            ecs.components[ecs.systems[i].type] = [];
            ecs.systems.manager.add[ecs.systems[i].type] = ecs.systems[i].create;
          }
        }
      },
      add: {},//this holds reference to each systems' create() method (ecs.systems.manager.add.render() )
      activeSystems: [],//all systems with an active component are listed here
      update: function(){//call all active systems
        //clear active systems
        ecs.systems.manager.activeSystems = [];
        //populate list of active systems
        for(i in ecs.components){
          if(ecs.components[i].length > 0){
            ecs.systems.manager.activeSystems.push(ecs.components[i][0].type);
          }
        }
        //call all active systems
        for(i in ecs.systems.manager.activeSystems){
          let toRender = false;
          if(ecs.systems.manager.activeSystems[i] === "render"){
            toRender = true;
          }else {
            ecs.systems[ecs.systems.manager.activeSystems[i]].update();
          }
          //call render last
          if(toRender){
            ecs.systems.render.update();
          }
        }
      },
      //return component
      find: function(componentType, id){
        for(i in ecs.components){
          if(ecs.components[i].type === componentType && ecs.components[i].id === id){
            return ecs.components[i];
          }
        }
      },
    },//manager

    entities: {
      type: "entities",
      init: function(){},//set up the system
      create: function(x, y, z){
        let newEntity = {};
        newEntity.id = ecs.nextId++;
        newEntity.x = x || 0;
        newEntity.y = y || 0;
        newEntity.z = z || 0;
        newEntity.components = [],
        newEntity.addComponent = ecs.systems.manager.add;
        ecs.entities.push(newEntity);
        return newEntity;
      },
      //destroy an instance of an entity
      destroy: function(id){},
      //return entity
      find: function(id){
        for(i in ecs.entities){
          if(ecs.entities[i].id === id){
            return ecs.entities[i];
          }
        }
      },
      //iterate over all of this system's components
      update: function(){},
    },//entities

    render: {
      type: "render", 
      init: function(){},
      //create new render component
      create: function(id, sprite, frame, width, height, flip, rotation){
        let newComponent = {};
        newComponent.type = "render";
        newComponent.id = id;
        newComponent.sprite = sprite;
        newComponent.frame = frame || 0;
        newComponent.width = width || 1;
        newComponent.height = height || 1;
        newComponent.flip = flip || "none"; //what default value?
        newComponent.rotation = 0;
        ecs.components.render.push(newComponent);
        ecs.systems.entities.find(id).components.render = ecs.systems.render.find(id);
      },
      //destroy an instance of a render component
      destroy: function(id){},
      //return render component
      find: function(id){
        for(i in ecs.components.render){
          if(ecs.components.render[i].id === id){
            return ecs.components.render[i];
          }
        }
      },
      //draw all entities with render components to screen
      update: function(){
        for(i in ecs.components.render){
          js80.spr(
            ecs.components.render[i].sprite, 
            ecs.systems.entities.find(ecs.components.render[i].id).x, 
            ecs.systems.entities.find(ecs.components.render[i].id).y, 
            ecs.components.render[i].frame, 
            ecs.components.render[i].width, 
            ecs.components.render[i].height, 
            ecs.components.render[i].flip
            //add rotation support here?
          );
        }
      },
    },//render

    animation: {
      type: "animation",
      init: function(){},
      //create a new animation component
      create: function(id, anims, defaultAnim, defaultFrameRate){
        let newComponent = {};
        newComponent.type = "animation";
        newComponent.id = id;
        newComponent.anims = anims;
        newComponent.defaultAnim = defaultAnim;
        newComponent.frameRate = defaultFrameRate;
        newComponent.currentAnim = defaultAnim;
        newComponent.currentFrame = 0;
        newComponent.timerToNextFrame = defaultFrameRate;
        newComponent.loop = true;
        newComponent.setAnimation = function(anim){ //this isn't really necessary
          //this.currentAnim = anim;
          let a = ecs.systems.entities.find(id);
          a.components.animation.currentAnim = anim;
          a.components.animation.loop = true;
        },
        //immediately switch animation 
        //this can be called right after a call to setAnimation, or instead of if the new animation is passed in
        newComponent.interrupt = function(anim){
          //find component
          let a = ecs.systems.entities.find(id);
          if(anim){a.components.animation.currentAnim = anim};
          a.components.animation.currentFrame = a.components.animation.anims[a.components.animation.currentAnim][0];
          ecs.systems.entities.find(a.id).components.render.frame = a.components.animation.currentFrame;
          a.components.animation.timerToNextFrame = -1;
        };
        newComponent.setLoop = function(anim){
          let a = ecs.systems.entities.find(id);
          if(anim){a.components.animation.currentAnim = anim;
            a.components.animation.currentFrame = 0;//a.components.animation.anims[a.components.animation.currentAnim][0];
            a.components.render.frame = a.components.animation.currentFrame;
          };
          a.components.animation.loop = true;
        };
        newComponent.setNoLoop = function(anim){
          let entity = ecs.systems.entities.find(id);
          if(anim){entity.components.animation.currentAnim = anim;
            entity.components.animation.currentFrame = 0;//entity.components.animation.anims[entity.components.animation.currentAnim][0];
            entity.components.render.frame = entity.components.animation.currentFrame;
          };
          entity.components.animation.loop = false;
        };
        ecs.components.animation.push(newComponent);
        ecs.systems.entities.find(id).components.animation = ecs.systems.animation.find(id);
      },
      //remove an animation component
      destroy: function(){},
      //return animation component
      find: function(id){
        for(i in ecs.components.animation){
          if(ecs.components.animation[i].id === id){
            return ecs.components.animation[i];
          }
        }
      },
      //main animation method
      update: function(){
        for(i in ecs.components.animation){
          let a = ecs.components.animation[i];
          a.timerToNextFrame--;
          if(a.timerToNextFrame < 0){
            a.timerToNextFrame = a.frameRate;
            a.currentFrame++;
            if(a.currentFrame > a.anims[a.currentAnim].length - 1){
              a.currentFrame = 0;
              if(a.loop){
                //do nothing
              }else {
                a.currentAnim = a.defaultAnim;
              }
            }
            //set render frame to current animation frame
            ecs.systems.entities.find(a.id).components.render.frame = a.anims[a.currentAnim][a.currentFrame];
          }
        }
      },
    },//animation

    collision: {
      type: "collision", 
      init: function(){},
      //create new collision component
      create: function(id, shape, widthOrRadius, height, xOffset, yOffset, tags){
        let newComponent = {};
        newComponent.type = "collision";
        newComponent.id = id;
        newComponent.shape = shape || "rect";
        if(shape === "circ"){
          newComponent.radius = widthOrRadius;
        }else if(shape === "rect"){
          newComponent.width = widthOrRadius;
          newComponent.height = height;
        };
        newComponent.xOffset = xOffset || 0;
        newComponent.yOffset = yOffset || 0;
        newComponent.tags = tags; //these are not yet implemented
        ecs.components.collision.push(newComponent);
        ecs.systems.entities.find(id).components.collision = ecs.systems.collision.find(id);
      },
      //destroy an instance of a collision component
      destroy: function(id){},
      //return collision component
      find: function(id){
        for(i in ecs.components.collision){
          if(ecs.components.collision[i].id === id){
            return ecs.components.collision[i];
          }
        }
      },
      //holds all current collisions
      collisionEvents: [],
      //takes id and returns an array of objects colliding with it
      collisionCheck: function(id){
        let collisions = [];
        for(i in ecs.systems.collision.collisionEvents){
          if(ecs.systems.collision.collisionEvents[i].a.id === id){
            collisions.push(ecs.systems.collision.collisionEvents[i].b);
          }
        }
        return collisions;
      },
      //compare all entities with a collision component and assign collisions reports to array
      update: function(){
        //clear collisionEvents
        ecs.systems.collision.collisionEvents = [];
        for(i in ecs.components.collision){
          //compare each collision component to each other one
          let objectA = ecs.systems.entities.find(ecs.components.collision[i].id);
          for(u in ecs.components.collision){
            let objectB = ecs.systems.entities.find(ecs.components.collision[u].id);
            //do not compare an object to itself
            if(objectA !== objectB){
              //detect collisions and add them to list
              if(objectA.x < objectB.x + objectB.components.collision.width &&
                objectA.x + objectA.components.collision.width > objectB.x &&
                objectA.y < objectB.y + objectB.components.collision.height &&
                objectA.y + objectA.components.collision.height > objectB.y){
                  
                  //determine side(s) and append to object
                  let horizontal = "";
                  let vertical = "";
                  if(objectA.x + (objectA.width / 2) > objectB.x + (objectB.width / 2)){
                    horizontal = "right";
                  }else{
                    horizontal = "left";
                  }
                  if(objectA.y + (objectA.y / 2) > objectB.y + (objectB.height / 2)){
                    vertical = "bottom";
                  }else{
                    vertical = "top";
                  }

                  ecs.systems.collision.collisionEvents.push({a: objectA, b: objectB, horizontal: horizontal, vertical: vertical});
                }
            }
          }
        }
        //iterate over list of collisions

      }//update
    },//collision

    physics: {},//physics //acts on entities based on forces and (potentially)collisions
    input: {},//input //acts on entities based on input
    events: {},//events //acts on entities based on queued events/triggers
    behaviors: {},//behaviors //acts on entities based on scripted behaviors (ai)
  },
};