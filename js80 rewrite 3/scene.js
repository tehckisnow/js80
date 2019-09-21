let scenes = {
  new: function(game){
    let newScene = {
      parent: game,
      active: false,
      setActive: function(){
        console.log("setting scene active.");
        if(newScene.parent.scenes.active.indexOf(newScene) < 0){
          newScene.parent.scenes.active.push(newScene);
          newScene.active = true;
          let index = newScene.parent.scenes.inactive.indexOf(newScene);
          index > -1 ? newScene.parent.scenes.inactive.splice(index, 1) : 1;
        };
      },
      setInactive: function(){
        if(newScene.parent.scenes.inactive.indexOf(newScene) < 0){
          newScene.parent.scenes.inactive.push(newScene);
          newScene.active = false;
          let index = newScene.parent.scenes.active.indexOf(newScene);
          index > -1 ? newScene.parent.scenes.active.splice(index, 1) : 1;
        };
      },

      //entities
      entities: [],
      nextId: 0,
      newEntity: function(...args){
        let entity = engine.entities.new(newScene, ...args);
        entity.id = newScene.nextId++;
        newScene.entities.push(entity);
        return entity;
      },
      // /entity
      
      //entityManager //???
      //assetsManager
      //collisionManager
      //animationManager
      //timerManager
      //behaviorManager
      //eventsManager
      //renderManager
      render: {
        entities: [],
        update: function(){
          engine.render.update(newScene.parent, newScene.render.entitiesToRender);
        },
      },
      //uiManager
        //textbox
        //menu
      //effectsManager
      //cameraManager
      //saveManager
      //audioManager
      //update()

      //should themes go in assets or textbox or menu?
    };
    game.scenes.inactive.push(newScene);
    return newScene;
  },
};//scenes