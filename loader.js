"use strict";

var app = app || {};

window.onload = function() {
    console.log("first function call");
    app.sound.init();
    app.main.sound = app.sound;
    app.gameData.init();
    app.main.gameData = app.gameData
    app.main.init();
}

window.addEventListener("keydown", function(e){
    app.main.checkKeyState(e.keyCode, true);
});

window.addEventListener("keyup", function(e){
    app.main.checkKeyState(e.keyCode, false);
});