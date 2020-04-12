;
var engine = {
    //settings to be used if not otherwise specified
    //  this should contain no more than one level of depth
    //    to prevent issues with shallow copy
    defaultSettings: {
        debug: false,
        autogenScreen: true,
        screenUnits: "px",
        frameRate: 60,
        logText: "[ENGINE]: ",
        debugText: "[DEBUG]: ",
        errorText: "[ERROR]: "
    },
    util: {
        log: function (text) {
            console.log(engine.defaultSettings.logText + text);
        },
        debugMsg: function (text, game) {
            if (game.getSetting("debug")) {
                console.log(game.getSetting("debugText") + text);
            }
            ;
        },
        error: function (text) {
            console.log(engine.defaultSettings.errorText + text);
        },
        //generate random number between 1 and ceiling
        rnd: function (ceiling) {
            return Math.floor(Math.random() * ceiling) + 1;
        }
    },
    //New game object "constructor", container for scenes and 
    // references to engine utility functions for easy access
    newGame: function (settings) {
        engine.util.log("building new game");
        var game = {
            settings: {},
            input: engine.newInputManager(),
            scenes: [],
            screen: undefined,
            getCurrentScene: function () {
                //return latest scene in game.scenes that is active
                //!
            },
            //create new scene and link it to game
            newScene: function () {
                engine.util.debugMsg("game: building new scene", game);
                var scene = engine.newScene();
                game.addScene(scene);
                scene.setParent(game);
                return scene;
            },
            addScene: function (scene) {
                game.scenes.push(scene);
            },
            //!removeScene: function(){},//game.removeScene() //!!
            getSetting: function (prop) {
                return game.settings[prop];
            },
            //schedule main game loop to begin
            start: function () {
                engine.util.debugMsg("Starting game", game);
                game.update();
                game.update();
                //!setInterval(function(){game.update()}, game.settings.frameRate/1000);
            },
            //placeholder for main game loop
            loop: function () {
                engine.util.error("game.loop() has not been defined");
            },
            //update game state by one frame
            update: function () {
                engine.util.debugMsg("calling game.loop()", game);
                game.loop();
                for (var s in game.scenes) {
                    if (game.scenes[s].active) {
                        game.scenes[s].update();
                    }
                    ;
                }
                ;
            }
        }; //game
        //init
        //shallow copy settings and overrite specified
        Object.assign(game.settings, engine.defaultSettings);
        for (var i in settings) {
            game.settings[i] = settings[i];
        }
        ;
        //check screen
        if (game.getSetting("autogenScreen")) {
            game.screen = engine.newScreen(game);
        }
        ;
        return game;
    },
    newScreen: function (game) {
        var screen = {
            parent: game,
            element: document.createElement("canvas"),
            ctx: undefined,
            width: 0,
            height: 0,
            resize: function () {
                //update internal values
                screen.width = game.settings.width;
                screen.height = game.settings.height;
                //update element
                screen.element.style.width = screen.width.toString + game.settings.screenUnits;
                screen.element.style.height = screen.height.toString + game.settings.screenUnits;
            }
        };
        //create context
        var ctx = screen.element.getContext("2d");
        screen.ctx = ctx;
        //return screen
        return screen;
    },
    newInputManager: function () {
        var input = {
            modes: [],
            currentMode: 0,
            enabled: true,
            //disable input system globally
            disable: function () {
                input.enabled = false;
            },
            enable: function () {
                input.enabled = true;
            },
            keyDown: function (event) {
                var key = 1;
                console.log(event);
            },
            findKey: function (keycode) { },
            keyUp: function (event) { },
            newMode: function () {
                var mode = {
                    enabled: true,
                    disable: function () { mode.enabled = false; },
                    enable: function () { mode.enabled = true; },
                    keys: [],
                    pressed: [],
                    noKeyEffect: function () { },
                    newKey: function (keyCode, effect, exclusive, repeatLimit) {
                        var key = {
                            state: false,
                            key: keyCode,
                            effect: effect || function () { },
                            exclusive: exclusive || false,
                            repeatLimit: repeatLimit || 0,
                            repeatCount: 0
                        };
                        mode.keys.push(key);
                        return key;
                    },
                    noKey: function (effect) {
                        mode.noKeyEffect = effect;
                    },
                    noKeyTest: function () {
                        var noKeys = true;
                        if (mode.keys.length > 0) {
                            for (var k in mode.keys) {
                                if (mode.keys[k].state) {
                                    noKeys = false;
                                }
                                ;
                            }
                            ;
                        }
                        ;
                        if (noKeys) {
                            mode.noKeyEffect();
                        }
                        ;
                    },
                    btn: function (inp) { },
                    btnp: function (inp) { }
                };
                input.modes.push(mode);
                return mode;
            },
            setMode: function (mode) {
                //!
            },
            update: function () { }
        };
        //init
        document.body.setAttribute("onkeydown", "input.keyDown(event)");
        document.body.setAttribute("onkeyup", "input.keyUp(event)");
        //return input manager
        return input;
    },
    newScene: function () {
        var scene = {
            active: false,
            parent: {},
            entities: [],
            activate: function () {
                engine.util.debugMsg("setting scene active", scene.parent);
                scene.active = true;
            },
            deactivate: function () {
                engine.util.debugMsg("deactivating scene", scene.parent);
                scene.active = false;
            },
            setParent: function (newParent) {
                engine.util.debugMsg("setting scene parent", scene.parent);
                scene.parent = newParent;
            },
            newEntity: function (x, y, z) {
                engine.util.debugMsg("creating new entity", scene.parent);
                var entity = engine.newEntity(x, y, z);
                scene.entities.push(entity);
                entity.setParent(scene);
                return entity;
            },
            addEntity: function (entity) {
                engine.util.debugMsg("adding entity to scene", scene.parent);
                entity.setParent(scene);
                scene.entities.push(entity); //! add check for multiples first?
            },
            update: function () {
                engine.util.debugMsg("updating scene", scene.parent);
                //!iterate through active systems
                //
            }
        }; //scene
        return scene;
    },
    newEntity: function (x, y, z) {
        var entity = {
            parent: {},
            x: x || 0, y: y || 0, z: z || 0,
            setParent: function (newParent) {
                entity.parent = newParent;
            },
            add: function () {
                //find system
                //call component constructor
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
            }
        };
        return entity;
    },
    sys: {}
}; //engine
