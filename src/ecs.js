let ecs = {
  update: function(){
    //ecs.collision.update(); //no need for this?
    ecs.animation.update();
    ecs.render.update();
  },
  collision: {
    //list of collidable entities
    collidables: [],
    //optional list of collidable tiles
    collidableTiles: [],
    //add an array of numbers to collidableTiles
    addCollidableTiles: function(tiles){
      for(i in tiles){
        ecs.collision.collidableTiles.push(tiles[i]);
      };
    },
    //returns true if tile is in collidableTiles list
    collideTile: function(map, entity, xMove, yMove){
      //where to get map.tileSize?
      let tile = js80.mget(map, entity.x + (xMove || 0), entity.y + (yMove || 0), map.tileSize || 16);
      if(ecs.collision.collidableTiles[0].includes(tile)){ //!why do I need the [0] after collidableTiles? fix this! it is probably a problem with addCollidableTiles()
        return true;
      }else{
        return false;
      };
    },
    //create a new collision component with entity.collision = collision.new(args);
    new: function(height, width, xOffset, yOffset, tags){
      let defaultTile = 16;//pull this from elsewhere
      let newCollision = {};
      //parent//?
      newCollision.height = height || defaultTile;
      newCollision.width = width || defaultTile;
      newCollision.xOffset = xOffset || 0;
      newCollision.yOffset = yOffset || 0;
      newCollision.tags = tags || [];
      ecs.collision.collidables.push(newCollision);
      return newCollision;
    },
    find: function(){},
    //remove an entity from the collidables list
    destroy: function(entity){},//!!
    //compare positions of two objects with collision components
    checkOverlap: function(a, b, xMove, yMove){
      let xm = xMove || 0;
      let ym = yMove || 0;
      //!change these to -xm and -ym?
      if(a.x + a.collision.xOffset + xm <= b.x + b.collision.xOffset + b.collision.width &&
        a.x + a.collision.xOffset + xm + a.collision.width >= b.x + b.collision.xOffset &&
        a.y + a.collision.yOffset + ym <= b.y + b.collision.yOffset + b.collision.height &&
        a.y + a.collision.yOffset + ym + a.collision.height >= b.y + b.collision.yOffset){
          return true;
        };
      return false;
    },//checkOverlap()
    //return an array of entities from collidables array that are overlapping with entity and have the optional tags
    checkCollision: function(entity, xMove, yMove, tags){
      let collisions = [];
      let include = false;
      for(i in ecs.collision.collidables){
        if(ecs.collision.collidables[i].parent !== entity){
          if(ecs.collision.checkOverlap(entity, ecs.collision.collidables[i].parent, xMove, yMove)){
            if(tags){
              for(u in tags){
                if(ecs.collision.collidables[i].tags.includes(tags[u])){
                  include = true;
                };
              };
            }else{include = true};
          };
          if(include){
            collisions.push(ecs.collision.collidables[i].parent);
            include = false;
          };
        };
      };
      if(collisions.length > 0){
        return collisions;
      }else return false;
    },//checkCollision()
    update: function(){},
  },//collision

  render: {
    toRender: [],
    new: function(spriteSheet, xOff, yOff, sprite){
      let newRender = {};
      newRender.spriteSheet = spriteSheet;
      newRender.xOffset = xOff || 0;
      newRender.yOffset = yOff || 0;
      newRender.sprite = sprite || 0;
      newRender.draw = function(){
        js80.spr(newRender.spriteSheet, newRender.parent.x, newRender.parent.y, newRender.sprite);
      };
      ecs.render.toRender.push(newRender);
      return newRender;
    },
    find: function(id){
      return ecs.entity.entities.findIndex(function(i){return i.id = id})
    },
    destroy: function(id){
      ecs.render.toRender.splice(ecs.render.find(id), 1);
    },
    useCamera: false,
    update: function(){
      //first sort render.toRender by parent z-value
      ecs.render.toRender = ecs.render.toRender.sort(function(a, b){return a.parent.z - b.parent.z}); //add support for z-offset
      for(i in ecs.render.toRender){
        //finish this
        if(ecs.render.useCamera){
          //convert global to screen coordinates 
          let screen = camera.getScreen(ecs.render.toRender[i].parent.x + ecs.render.toRender[i].xOffset, ecs.render.toRender[i].parent.y + ecs.render.toRender[i].yOffset);
          let screenX = screen[0];
          let screenY = screen[1];
          js80.spr(ecs.render.toRender[i].spriteSheet, screenX, screenY, ecs.render.toRender[i].sprite);
        }else{
          js80.spr(ecs.render.toRender[i].spriteSheet, ecs.render.toRender[i].parent.x + ecs.render.toRender[i].xOffset, ecs.render.toRender[i].parent.y + ecs.render.toRender[i].yOffset, ecs.render.toRender[i].sprite);
        };
      };
    },
  },

  animation: {
    toAnimate: [],
    new: function(anims, frameRate, defaultAnim, startingAnim){
      let newAnimation = {};
      newAnimation.anims = anims || {};
      newAnimation.default = defaultAnim || "default";
      newAnimation.anims.default = [newAnimation.anims[newAnimation.default]] || [0];
      newAnimation.currentAnim = startingAnim || defaultAnim || "default";
      newAnimation.frame = 0;
      newAnimation.frameRate = frameRate || 20;
      newAnimation.animTimer = frameRate || 20;
      newAnimation.setAnim = function(anim){
        if(newAnimation.currentAnim !== anim){
          newAnimation.currentAnim = anim;
          newAnimation.frame = 0;
          newAnimation.parent.render.sprite = newAnimation.anims[newAnimation.currentAnim][newAnimation.frame];
        };
      };
      newAnimation.animate = function(){
        newAnimation.animTimer--;
        if(newAnimation.animTimer < 0){
          newAnimation.animTimer = newAnimation.frameRate;
          newAnimation.frame++;
          if(newAnimation.frame > newAnimation.anims[newAnimation.currentAnim].length -1){
            newAnimation.frame = 0;
          };
          newAnimation.parent.render.sprite = newAnimation.anims[newAnimation.currentAnim][newAnimation.frame];
        };
      };
      ecs.animation.toAnimate.push(newAnimation);
      return newAnimation;
    },
    update: function(){
      for(i in ecs.animation.toAnimate){
        ecs.animation.toAnimate[i].animate();
      }
    },
  },

  entity: {
    entities: [],
    nextId: 0,
    new: function(x, y, z){
      let newEntity = {};
      newEntity.id = ecs.entity.nextId++;
      newEntity.x = x || 0;
      newEntity.y = y || 0;
      newEntity.z = z || 0;
      newEntity.add = {
        collision: function(h, w, x, y, t){
          newEntity.collision = ecs.collision.new(h, w, x, y, t);
          newEntity.collision.id = newEntity.id;
          newEntity.collision.parent = newEntity;
        },
        render: function(spriteSheet, xOff, yOff, sprite){
          newEntity.render = ecs.render.new(spriteSheet, xOff, yOff, sprite);
          newEntity.render.id = newEntity.id;
          newEntity.render.parent = newEntity;
        },
        animation: function(anims, frameRate, defaultAnim, startingAnim){
          newEntity.animation = ecs.animation.new(anims, frameRate, defaultAnim, startingAnim);
          newEntity.animation.id = newEntity.id;
          newEntity.animation.parent = newEntity;
        },
      };
      newEntity.destroy = function(){
        //iterate through systems and destroy all components before destroying self//!
      };
      ecs.entity.entities.push(newEntity);
      return newEntity;
    },
    find: function(id){//return index of entity.entities
      return ecs.entity.entities.findIndex(function(i){return i.id = id})
    },
    findEntity: function(id){//return entity
      return ecs.entity.entities.find(function(i){return i.id = id})
    },
    destroy: function(id){
      ecs.entity.entities.splice(ecs.entity.entities.find(id), 1);
      //iterate through system lists to remove components//!
    },
  },
}
