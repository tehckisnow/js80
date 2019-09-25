//!----------------------------
//! This is f'ed up, maaaan! 

let mapObjects = [
  {
    "x":96,
    "y":48,
    "width": 16,
    "height": 16,
  },
  {
    "x":208,
    "y":48,
    "width": 16,
    "height": 16,
  },
  {
    "x":64,
    "y":304,
    "width": 16,
    "height": 16,
  },
];
//shorthand
let exit0 = mapObjects[0];
let exit1 = mapObjects[1];
let exit2 = mapObjects[2];

//copy of mget
//return an object if the passed coordinates are inside of it's dimensions
let mget = function(objects, x, y){
  for(g in objects){
    if(objects[g].x < x && objects[g].x + objects[g].width > x && objects[g].y < y && objects[g].y + objects[g].height > y){
      return objects[g];
    };
  };
  return false;  
};

//test

console.log("The exits");
console.log(exit0);
console.log(exit1);
console.log(exit2);
//output
//  prints the data for all three exits.


console.log("using mget on each exit");
//adding 1 to each dimension so that test point will be inside
console.log(mget(mapObjects, exit0.x + 1, exit0.y + 1));
console.log(mget(mapObjects, exit1.x + 1, exit1.y + 1));
console.log(mget(mapObjects, exit2.x + 1, exit2.y + 1));

//output
//  prints data for exit0, but prints "false" for exits 1 and 2!!!
//  ! wtf!?!?!?
