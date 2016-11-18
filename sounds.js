"use strict"
// As always, check for existing copy before creating new object literal
var app = app || {};

// Sound code from Boomshine
app.sound = (function(){
    console.log("Sound module loaded");
	var bgAudio = undefined;
	var effectAudio = undefined;
	var currentEffect = 0;
	var currentDirection = 1;

    function init(){
		bgAudio = document.querySelector("#bgAudio");
		bgAudio.volume = 0.25;
	}
    
    // Starts Background audio
    function playAudio() {
        bgAudio.play();
    }
    
    // Stops and resets background audio
    function stopAudio(){
		bgAudio.pause();
		bgAudio.currentTime = 0;
	}
    
    // Plays the sound effect that goes with the trigger
    function playEffect(trigger){
		effectAudio.play();
        
        // Going through a door
        // Finding treasure
        // Hitting a monster
	}
    
    // Export the public interface of the module
    return {
        init: init, 
        playAudio: playAudio, 
        stopAudio: stopAudio, 
        playEffect: playEffect
    };
}());