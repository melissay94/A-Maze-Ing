"use strict"

function getRandom(min, max) {
  	return Math.random() * (max - min) + min;
}

function clamp(val, min, max){
	return Math.max(min, Math.min(max, val));
}

function getRandomUnitVector(){
	var x = getRandom(-1,1);
	var y = getRandom(-1,1);
	var length = Math.sqrt(x*x + y*y);
	if(length == 0){ // very unlikely
		x=1; // point right
		y=0;
		length = 1;
	} else{
		x /= length;
		y /= length;
	}
	
	return {x:x, y:y};
}