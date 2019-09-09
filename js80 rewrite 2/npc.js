//let npcEventManager = engine.events.newEventManager();
let npcEventTimer = engine.timer.newManager();
let npc = {
  new: function(scene, x, y, z, dialogue, asset, spriteIndex, anims, collisionWidth, collisionHeight, collisionXOffset, collisionYOffset, tags){
    let npc = scene.newEntity(x, y, z);
    npc.add.render(scene, "sprite", asset, spriteIndex);
    npc.add.animation(anims, 10, "walkDown", "walkDown");
    npc.add.collision(scene, collisionWidth, collisionHeight, collisionXOffset, collisionYOffset, tags);
    npc.collision.tags.push("physical");
    npc.dialogue = dialogue;
    npc.facing = "down";
    npc.state = "idle";
    npc.behavior = {
      update: function(){},
      idle: function(dir){
        if(dir){
          npc.facing = dir;
        };
        npc.animation.setAnim("idle" + npc.facing);//! npc.facing needs to be capitalized!
        npc.state = "idle";
      },
      find: function(target){
        let x = npc.x - target.x;
        let y = npc.y - target.y;
        if(Math.abs(x) > Math.abs(y)){
          if(x < 0){
            return "Right";
          }else{
            return "Left";
          };
        }else{
          if(y < 0){
            return "Down";
          }else{
            return "Up";
          };
        };
      },
      turn: function(dir){
        npc.facing = dir;
        npc.animation.setAnim("idle" + dir); //! dir capitalization
      },
      step: function(dir, distance, rate, animation, collisionTest){
        //!if collisionTest is undefined...

        if(collisionTest){
          npc.state = "stepping";
          npc.facing = dir;
          npc.distanceRemaining = distance;
          npc.rate = rate;
          npc.animation.setAnim(animation);

          let xMove = 0;
          let yMove = 0;
          switch(dir){
            case "up":
              yMove = -1;
              break;
            case "down":
              yMove = 1;
              break;
            case "right":
              xMove = 1;
              break;
            case "left":
              xMove = -1;
              break;
            default:
          };
          //apply movement
          function move(x, y){
            npc.x += x;
            npc.y += y;
            npc.distanceRemaining--;
          };

          function moveTest(x, y){
            if(npc.state === "stepping" && npc.distanceRemaining > 0){
              npc.x += x;
              npc.y += y;
              npc.distanceRemaining--;
              npcEventTimer.new(rate, moveTest);
            }else{
              npc.state = "idle";
            };
          };

          npcEventTimer.new(rate, function(){moveTest(xMove, yMove)});

          //schedule event
          // let contMove = npcEventManager.new(npcEventManager, "frame", function(){
          //   if(npc.state === "stepping" && npc.distanceRemaining > 0){
          //     move(xMove, yMove);
          //   }else{
          //     npc.state = "idle";
          //     //delete event
          //     //!
          //     npcEventManager.destroy(contMove);
          //   };
          // });//scheduled event
          
        };
      },
      follow: function(){},
      wander: function(){},
      speak: function(){},
    };//behavior
    return npc;
  },//new
};//npc