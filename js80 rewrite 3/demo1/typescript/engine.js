//engine object
//holds engine methods, constructors, and systems
var engine = {
    //settings used if not specified in settings object(see engine.newGame())
    defaultSettings: {
        //default settings
        debug: false,
        newCanvas: true,
        appendCanvasAutomatically: true,
        width: 400,
        height: 360,
        defaultEntity: {
            x: 0, y: 0, z: 0
        },
        systemsOrder: ['input', 'animation', 'render']
    },
    //create a new game object
    //game object holds scenes, the html canvas element, and references to engine methods for ease of use
    newGame: function (settings) {
        //create game object
        var game = {
            settings: {},
            canvas: {},
            scenes: [],
            setCanvas: function (canvas) {
                this.canvas = canvas;
            },
            newScene: function () {
                var scene = engine.newScene(game);
                this.scenes.push(scene);
            },
            update: function () { }
        };
        //populate settings
        //  first default
        for (var s in engine.defaultSettings) {
            game.settings[s] = engine.defaultSettings[s];
        }
        ;
        //  then specified, if necessary
        if (settings) {
            for (var ss in settings) {
                game.settings[ss] = settings[ss];
            }
            ;
        }
        ;
        //create canvas, if necessary
        if (game.settings.newCanvas) {
            //!TS doesn't allow this
            game.setCanvas(engine.newCanvas(game));
        }
        ;
        //return game object
        return game;
    },
    newCanvas: function (game) {
        //optionally supply parent element as a property to append canvas to
        //create HTML canvas element
        var canvas = document.createElement('canvas');
        //set canvas dimensions
        //!
        //append to html page
        if (game.settings.appendCanvasAutomatically) {
            document.body.appendChild(canvas);
        }
        ;
        //add reference to canvas object to game object
        game.canvas = canvas;
        //! the above line will break things if multiple canvases are used
    },
    newScene: function (game) {
        var scene = {
            game: game,
            entities: [],
            newEntity: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var entity = engine.newEntity.apply(engine, args);
                this.entities.push(entity);
            },
            update: function (systemsOrder) {
                // iterate systems here
                //! take active systems order list?
            }
        };
        return scene;
    },
    //create new entity
    newEntity: function (x, y, z) {
        var entity = {
            x: x,
            y: y,
            z: z,
            //set entity's absolute position (globally)
            setPos: function (x, y, z) {
                this.x = x;
                this.y = y;
                this.z = z;
            },
            //change entity position relative to current position
            modPos: function (x, y, z) {
                this.x += x;
                this.y += y;
                this.z += z;
            },
            //get entity's position information
            getPos: function () {
                return [
                    this.x,
                    this.y,
                    this.z,
                ];
            },
            //add a new type component to entity
            addComponent: function (name) {
                var _a;
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var component = (_a = engine[name]).newComponent.apply(_a, args);
                component.parent = this;
                this[name] = component;
            }
        };
        //return entity
        return entity;
    },
    //write message to browser console for debugging
    log: function (text) {
        console.log('Engine: ' + text);
    },
    //write message to browser console for debugging
    error: function (text) {
        console.log('Engine: ERROR -' + text);
    },
    //render system
    render: {
        newComponent: function () { },
        newCamera: function () { },
        rect: function (target) { },
        rectb: function (target) { },
        sprite: function (target) { },
        text: function (target) { },
        update: function (scene) {
            if (scene.game.settings.debug) {
                engine.log('calling engine.render.update()');
            }
            ;
            for (var entity in scene) {
                if (scene[entity].render) {
                    scene[entity].render.update();
                }
                ;
            }
            ;
            if (scene.game.settings.debug) {
                engine.log('engine.render.update() complete');
            }
            ;
        }
    },
    //animation system
    animation: {
        newComponent: function () { },
        newAnimation: function () { },
        update: function (scene) {
            if (scene.game.settings.debug) {
                engine.log('calling engine.animation.update()');
            }
            ;
            for (var entity in scene) {
                if (scene[entity].animation) {
                    scene[entity].animation.update();
                }
                ;
            }
            ;
            if (scene.game.settings.debug) {
                engine.log('engine.animation.update() complete');
            }
            ;
        }
    },
    //collision system
    collision: {
        newComponent: function () { },
        checkCollision: function () { },
        //update is here to prevent errors; collision system is querried using a method above instead of calling engine.collision.update()
        update: function (scene) {
            if (scene.game.settings.debug) {
                engine.log('engine.collision.update()');
            }
            ;
        }
    },
    //input system
    input: {
        //create new input component
        newComponent: function () {
        },
        //update input system
        update: function (scene) {
            if (scene.game.settings.debug) {
                engine.log('calling engine.input.update()');
            }
            ;
            //check game.input
            //!
            if (scene.game.settings.debug) {
                engine.log('engine.input.update() complete');
            }
            ;
        }
    }
}; //engine
