"use strict";

var app = app || {};

app.gameData = (function(){
    console.log("Game data loaded");
    
    var levels = [];
    
    function init() {

        var level1 = {
            levelMap: "media/level.jpg",
            coins: [{x: 40, y: 40}, {x: 120, y: 40}],
            playerStart: {x: 10, y: 540}
        }


        levels.push(level1);
    }

    
    return {
        init: init,
        data: levels
    };
    
}());
