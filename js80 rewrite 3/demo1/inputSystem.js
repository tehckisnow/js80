let engine = {
  input: {
    newManager: function(game){
      let inputManager = {
        modes: [],
        currentMode: '',
        enabled: true,
        disable: function(){},
        enable: function(){},
        keyDown: function(event){
          let keyIndex = inputManager.currentMode.keys.findIndex(function(element){return element.key === event.key});
          if(keyIndex !== -1){
            inputManager.currentMode.keys[keyIndex].state = true;
          };
        },
        keyUp: function(event){
          //checks all modes to prevent errors with mode-switching while a key is pressed
          for(i in inputManager.modes){
            let keyIndex = inputManager.currentMode.keys.findIndex(function(element){return element.key === event.key});
            if(keyIndex !== -1){
              let key = inputManager.currentMode.keys[keyIndex];
              key.state = false;
              key.repeatCount = 0;
              //remove from pressed
              //!

            }; 
          };

        },
        newMode: function(name){
          let newMode = {
            enabled: true,
            disable: function(){newMode.enabled = false},
            enable: function(){newMode.enabled = true},
            keys: [],
            //pressed: [],
            noKeyEffect: function(){},
            newKey: function(key, effect, repeatLimit, exclusive){
              let newKey = {
                state: false,
              };
              newKey.key = key;
              newKey.effect = effect || function(){};
              newKey.exclusive = exclusive || false;
              newKey.repeatLimit = repeatLimit || 0;
              newKey.repeatCount = 0;
              newMode.keys.push(key);
            },
            noKey: function(effect){
              newMode.noKeyEffect = effect;
            },
            noKeyTest: function(){
              let nokeys = true;
              if(newMode.keys.length > 0){
                for(i in newMode.keys){
                  if(newMode.keys[i].state){
                    nokeys = false;
                  };
                };
              };
              if(nokeys){
                newMode.noKeyEffect();
              };
            },
            btn: function(inp){
              return newMode.keys.find(function(element){return element.key === inp}).state || false;
            },
            btnp: function(inp){
              let key = newMode.keys.find(function(element){return element.key === inp});
              if(key && key.state){
                //!!!!!!

                key.pressed = true;
                return true;
              }else{
                return false;
              };
            },
          };
          newMode.name = name;
          inputManager.modes.push(newMode);
          //! if no modes have yet beenspecified, set active

          return newMode;
        },
        setMode: function(mode){
          inputManager.modeToSet = mode;
        },
        update: function(){
          engine.input.update(inputManager);
        },
      };
      document.body.setAttribute("onkeydown", "inputManager.keyDown(event)");
      document.body.setAttribute("onkeyup", "inputManager.keyUp(event)");
      return inputManager;
    },

    update: function(inputManager){
      //!
      
    },//input.update()

  },//input
};

let man = engine.input.newManager();
let mode1 = man.newMode('name');
man.setMode(mode1);
mode1.newKey('g', function(){console.log('g')});

man.update();