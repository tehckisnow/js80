(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("testMap1",
{ "height":20,
 "infinite":false,
 "layers":[
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73, 61, 61, 61, 98, 61, 61, 74, 73, 61, 61, 98, 61, 61, 61, 74, 0, 0, 0, 0, 85, 13, 13, 13, 13, 13, 13, 86, 85, 13, 13, 13, 13, 13, 13, 86, 0, 0, 0, 0, 85, 13, 13, 13, 13, 13, 13, 86, 85, 13, 13, 13, 13, 13, 13, 86, 0, 0, 0, 0, 85, 13, 13, 13, 13, 13, 13, 86, 85, 13, 13, 13, 13, 13, 13, 86, 0, 0, 0, 0, 85, 13, 13, 13, 13, 13, 13, 86, 85, 13, 13, 13, 13, 13, 13, 86, 0, 0, 0, 0, 85, 13, 13, 13, 13, 13, 13, 61, 61, 13, 13, 13, 13, 13, 13, 86, 0, 0, 0, 0, 85, 99, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 99, 86, 0, 0, 0, 0, 85, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 86, 0, 0, 0, 0, 85, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73, 61, 62, 61, 74, 0, 0, 0, 0, 0, 0, 73, 61, 61, 61, 74, 0, 0, 0, 0, 85, 13, 13, 13, 86, 0, 0, 0, 0, 0, 0, 85, 13, 99, 13, 86, 0, 0, 0, 0, 85, 13, 13, 13, 86, 0, 0, 0, 0, 0, 0, 85, 13, 13, 13, 86, 0, 0, 0, 0, 85, 13, 13, 13, 86, 0, 0, 0, 0, 0, 0, 85, 13, 13, 13, 86, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":20,
         "id":1,
         "name":"ground",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
         "height":20,
         "id":2,
         "name":"collision",
         "opacity":1,
         "type":"tilelayer",
         "visible":false,
         "width":20,
         "x":0,
         "y":0
        }, 
        {
         "draworder":"topdown",
         "id":3,
         "name":"interactions",
         "objects":[
                {
                 "gid":3,
                 "height":16,
                 "id":1,
                 "name":"",
                 "properties":[
                        {
                         "name":"destinationX",
                         "type":"int",
                         "value":64
                        }, 
                        {
                         "name":"destinationY",
                         "type":"int",
                         "value":288
                        }, 
                        {
                         "name":"exit",
                         "type":"int",
                         "value":0
                        }, 
                        {
                         "name":"facing",
                         "type":"string",
                         "value":"up"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":16,
                 "x":96,
                 "y":48
                }, 
                {
                 "gid":3,
                 "height":16,
                 "id":2,
                 "name":"",
                 "properties":[
                        {
                         "name":"destinationX",
                         "type":"int",
                         "value":240
                        }, 
                        {
                         "name":"destinationY",
                         "type":"int",
                         "value":288
                        }, 
                        {
                         "name":"exit",
                         "type":"int",
                         "value":0
                        }, 
                        {
                         "name":"facing",
                         "type":"string",
                         "value":"up"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":16,
                 "x":208,
                 "y":48
                }, 
                {
                 "gid":3,
                 "height":16,
                 "id":3,
                 "name":"",
                 "properties":[
                        {
                         "name":"destinationX",
                         "type":"int",
                         "value":96
                        }, 
                        {
                         "name":"destinationY",
                         "type":"int",
                         "value":64
                        }, 
                        {
                         "name":"exit",
                         "type":"int",
                         "value":0
                        }, 
                        {
                         "name":"facing",
                         "type":"string",
                         "value":"down"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":16,
                 "x":64,
                 "y":304
                }, 
                {
                 "gid":3,
                 "height":16,
                 "id":4,
                 "name":"",
                 "properties":[
                        {
                         "name":"destinationX",
                         "type":"int",
                         "value":208
                        }, 
                        {
                         "name":"destinationY",
                         "type":"int",
                         "value":64
                        }, 
                        {
                         "name":"exit",
                         "type":"int",
                         "value":0
                        }, 
                        {
                         "name":"facing",
                         "type":"string",
                         "value":"down"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":16,
                 "x":240,
                 "y":304
                }, 
                {
                 "gid":59,
                 "height":16,
                 "id":9,
                 "name":"",
                 "properties":[
                        {
                         "name":"desc",
                         "type":"string",
                         "value":"\"Just a crate.\""
                        }, 
                        {
                         "name":"effect",
                         "type":"int",
                         "value":2
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":16,
                 "x":48,
                 "y":144
                }, 
                {
                 "gid":59,
                 "height":16,
                 "id":10,
                 "name":"",
                 "properties":[
                        {
                         "name":"desc",
                         "type":"string",
                         "value":"\"Just a crate.\""
                        }, 
                        {
                         "name":"effect",
                         "type":"int",
                         "value":2
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":16,
                 "x":256,
                 "y":144
                }, 
                {
                 "gid":59,
                 "height":16,
                 "id":11,
                 "name":"",
                 "properties":[
                        {
                         "name":"desc",
                         "type":"string",
                         "value":"\"Just a crate.\""
                        }, 
                        {
                         "name":"effect",
                         "type":"int",
                         "value":2
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":16,
                 "x":240,
                 "y":256
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }],
 "nextlayerid":4,
 "nextobjectid":12,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.2.4",
 "tileheight":16,
 "tilesets":[
        {
         "columns":12,
         "firstgid":1,
         "image":"..\/assets\/rpg\/ww2tileset.png",
         "imageheight":176,
         "imagewidth":192,
         "margin":0,
         "name":"ww2tileset",
         "spacing":0,
         "tilecount":132,
         "tileheight":16,
         "tilewidth":16,
         "transparentcolor":"#003039"
        }],
 "tilewidth":16,
 "type":"map",
 "version":1.2,
 "width":20
});