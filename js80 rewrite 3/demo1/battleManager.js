//TODO:
//how should battleManager.checkBattle get encounters list and encounter rate?
//how to set encounters and stepCount upon changing map?
////    increment stepCount instead of decrement?
//battleManager.newEncounter
let battleManager = {
	//encounters: [],
	stepCount: 0,

  checkBattle: function(map){
    //check for battle
    battleManager.stepCount++;
		if(battleManager.stepCount > map.encounterRate){

      //determine encounter
			let encArr = [];
			for(i in map.encounters){
				let e = map.encounters[i].frequency
				while(e > 0){
					encArr.push(map.encounters[i]);
					e--;
				};
			};
			let encounter = encArr[engine.roll(encArr.length)];
			
			//call battle
			battleManager.battle(encounter);
		};
	},

  battle: function(encounter){
		//pause current scene and load new one?
		
		
	},

};//battleManager

