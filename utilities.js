"use strict"

function getMouse(e) {
    var mouse = {};
    mouse.x = e.pageX - e.target.offsetLeft;
    mouse.y = e.pageY - e.target.offsetTop;
    return mouse;
}

function getRandom(min, max) {
  	return Math.random() * (max - min) + min;
}

function clamp(val, min, max){
	return Math.max(min, Math.min(max, val));
}