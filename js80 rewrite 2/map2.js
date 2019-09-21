(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("map2",
{ "height":10,
 "infinite":false,
 "layers":[
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 13, 13, 13, 13, 13, 0, 0, 0, 0, 13, 13, 13, 13, 13, 13, 0, 0, 0, 0, 13, 13, 13, 13, 13, 13, 0, 0, 0, 0, 13, 13, 13, 13, 13, 13, 0, 0, 0, 0, 13, 13, 13, 13, 13, 13, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":10,
         "id":1,
         "name":"ground",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":10,
         "id":4,
         "name":"Tile Layer 3",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73, 61, 61, 62, 61, 74, 0, 0, 0, 0, 85, 0, 0, 0, 0, 86, 0, 0, 0, 0, 85, 0, 0, 99, 0, 86, 0, 0, 0, 0, 85, 0, 0, 0, 0, 86, 0, 0, 0, 0, 85, 0, 0, 0, 0, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":10,
         "id":2,
         "name":"collisions",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":10,
         "id":5,
         "name":"Tile Layer 4",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }, 
        {
         "draworder":"topdown",
         "id":3,
         "name":"interactions",
         "objects":[
                {
                 "gid":99,
                 "height":16,
                 "id":1,
                 "name":"",
                 "properties":[
                        {
                         "name":"destinationX",
                         "type":"int",
                         "value":9
                        }, 
                        {
                         "name":"destinationY",
                         "type":"int",
                         "value":2
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
                 "x":80,
                 "y":96
                }, 
                {
                 "gid":98,
                 "height":16,
                 "id":2,
                 "name":"",
                 "properties":[
                        {
                         "name":"destinationX",
                         "type":"int",
                         "value":144
                        }, 
                        {
                         "name":"destinationY",
                         "type":"int",
                         "value":32
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
                 "y":144
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }],
 "nextlayerid":6,
 "nextobjectid":6,
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
 "width":10
});