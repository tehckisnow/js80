//@ts-check
//!Todo:
//restructure to allow parallel event-lists for concurrent events
//simplify

//call ecs.systems.manager.init() before using ecs features

let ecs = {
  settings: {
    defaultFrameRate: 10,
  },
  entities: [],
  components: {}, //object so that ecs.components.render/etc is useable
  systems: {
    manager: {
      //has no component
      component: false,
      //not shown in activeSystems
      active: false,
      activeSystems: [],
      //call ecs.systems.manager.init() before using ecs features
      init: function(){
        //populate ecs.components and activeSystems
        for(let i in ecs.systems){
          if(ecs.systems[i].component){
            ecs.components[ecs.systems[i].name] = [];
          };
          if(ecs.systems[i].active){
            ecs.systems.manager.activeSystems.push(ecs.systems[i]);
            //sort activeSystems here
            ecs.systems.manager.activeSystems.sort(function(a, b){return a.priority - b.priority});
          };
        };
      },//init()
      update: function(){
        for(let i in ecs.systems.activeSystems){
          //sort components first?
          ecs.systems.activeSystems[i].update();
        };
      },//update()
    },//manager
    entity: {
      //has no component
      component: false,
      active: false,
      nextId: 0,
      create: function(x, y, z){
        this.id = ecs.systems.entity.nextId++;
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.addComponent = {};
        this.addComponent.parent = this;
        for(let e in ecs.systems){
          if(ecs.systems[e].component){
            this.addComponent[ecs.systems[e].name] = ecs.systems[e].create;
            this.addComponent[ecs.systems[e].name].parent = this;
          };
        };
        ecs.entities.push(this);
      },//create()
      destroy: function(id){},//destroy()
    },//entity()
    render: {
      name: "render",
      //listed in ecs.components
      component: true,
      //shown in activeSystems
      active: true,
      priority: 10, //higher numbers run later in game loop
      create: function(sprite, frame, tileSize){
        
        this.parent.render = {};
        this.parent.render.sprite = sprite;
        this.parent.render.frame = frame || 0;
        this.parent.render.tileSize = tileSize;
        ecs.components.render.push(this);
      },//create()
      update: function(){
        for(let ren in ecs.components.render){
          let current = ecs.components.render[ren];
          //js80.spr(current.sprite, current.parent.x, current.parent.y, current.frame, current.tileWidth, current.tileHeight);
        };
      },//update()
    },//render
    animation: {
      name: "animation",
      //listed in ecs.components
      component: true,
      //shown in activeSystems
      active: true,
      priority: 3,
      create: function(anims, frameRate, defaultAnim){

        this.parent.animation = {};
        this.parent.animation.currentFrame = 0;
        this.parent.animation.animTimer = 0;
        this.parent.animation.frameRate = frameRate || ecs.settings.defaultFrameRate;
        this.parent.animation.defaultAnim = defaultAnim
        this.parent.animation.currentAnim = defaultAnim || "idle";
        this.parent.animation.anims = anims || {};

        // let entity = this.parent;
        // entity = newComponent;
        ecs.components.animation.push(this);
      },//create()
      update: function(){
        for(let anim in ecs.components.animation){
          console.log("animating " + ecs.components.animation[anim].number);

            let current = ecs.components.animation[anim];
            current.animTimer--;
            if(current.animTimer < 0){
              current.animTimer = current.frameRate;
              current.currentFrame++;
              if(current.currentFrame > current.anims[current.currentAnim].length - 1){
                current.currentFrame = 0;
              };
            };
            current.parent.render.sprite = current.anims[current.currentAnim][current.currentFrame];
          };

        },//update()
      },//animate()
    events: {
      name: "event",
      //no component
      component: false,
      //shown in activeSystems
      active: true,
      priority: 0,
      //holds all active events
      queue: [],
      //event constructor
      create: function(action, shouldContinue){
        let newEvent = {};
        newEvent.isEvent = true;
        newEvent.action = action || function(){};
        newEvent.continue = shouldContinue || true;
        ecs.systems.events.queue.push(newEvent);
        //return newEvent;
      },//create()
      //called each frame, iterates through events in order
      update: function(currentEvent){
        currentEvent = currentEvent || 0;
        ecs.systems.events.queue[currentEvent].action();
        let event = ecs.systems.events.queue.splice(currentEvent, 1)[currentEvent];
        //does this event successfully get stored as 'event'?
        //do I even need the 'continue' property/feature?
        if(event.continue && currentEvent < ecs.systems.events.queue.length - 1){
          ecs.systems.events.update(currentEvent);
        };
      },//update()
      //shortcut for common events (store common events here)
      common: {
        //creates a group of wait events to pass time
        wait: function(time){
          while(time > 0){
            time--;
            new ecs.systems.events.create(function(){}, false); //revise this later
          };
        },//wait()
      },//common
    },//events

  },//systems
};//ecs

ecs.systems.manager.init();

ecs.systems.events.create(function(){console.log("hi!")});
ecs.systems.events.create(function(){console.log("hi!")});
ecs.systems.events.common.wait(20);

ecs.systems.manager.update();

console.log("complete");