// Used the keyControls script from boomshine as base 

"use strict";

var keys = {};

// Keeps track of which keys are down - key daemon
keys.keydown = [];

// Event listeners
window.addEventListener("keydown", function(e){
   
    keys.keydown[e.keyCode] = true;
    
    app.main.keyCheck(String.fromCharCode(e.keyCode), true);

});

window.addEventListener("keyup", function(e) {
   
    keys.keydown[e.keyCode] = false;
    
    app.main.keyCheck(String.fromCharCode(e.keyCode), false);
});