"use strict"

var app = app || {};

app.main = {
    
    // Constants
    WIDTH: 800, 
    HEIGHT: 600,
    
    // Properties of the canvas
    canvas: undefined, 
    ctx: undefined,
    animationID: 0,
    
    // States of the game
    gameState: undefined,
    STATES: {
        TITLE: 0,
        INTRO: 1, 
        PLAY: 2, 
        END: 4
    },
    
    // Images for game
    image: document.getElementById("bg-map"),
    
    // Audio
    sound : undefined,
    gameData: undefined,
    
    // Player properties
    player: undefined,
    direction: {
        up: 0, 
        down: 0, 
        left: 0,
        right: 0
    },
    
    // Enemies
    enemies: [],
    
    init: function(){
        console.log("Initialized app.main");
        
        // Set up canvas properties values
        this.canvas = document.querySelector("canvas");
        this.canvas.width = this.WIDTH;
        this.canvas.height = this.HEIGHT;
        this.ctx = this.canvas.getContext("2d");
        
        // Set starting game state
        this.gameState = this.STATES.TITLE;
        
        // Player
        this.player = this.makePlayer();
        
        // Enemies
        // this.generateRandomSpiders(20);
        
        // Bind mouse down
        this.canvas.onmousedown = this.doMousedown.bind(this);
        
        // Start game loop
        this.update();
    },
    
    update: function() {
        this.animationID = requestAnimationFrame(this.update.bind(this));
        this.drawHUD(this.ctx);
        this.sound.playAudio();
        
        var dt = this.calculateDT();
        if (this.gameState == this.STATES.PLAY){
            this.movePlayer(dt);
            this.loadLevel(this.ctx, 0);
        }
        
        
    },
    
    loadLevel: function(ctx, current) {
        var data = this.gameData.data[current];
        var imageObj = new Image();
        imageObj.src = data.levelMap;
        ctx.save();
        ctx.drawImage(imageObj, 0, 0);
        
        for (var i = 0; i < data.coins.length; i++) {
            ctx.fillStyle = "goldenrod";
            ctx.beginPath();
            ctx.arc(data.coins[i].x, data.coins[i].y, 10, Math.PI * 2, 0);
            ctx.fill();
        }
       // this.player.start( data.playerStart.x, data.playerStart.y);
        this.player.draw(ctx);
        ctx.restore();
    },
    
    makePlayer: function() {
        
        var drawPlayer = function(ctx) {
            ctx.save();
            var imgObj = new Image();
            imgObj.src = "media/georgeStandStill.png";
            ctx.drawImage(imgObj, this.x, this.y);
            ctx.restore();
        }
        
        var movePlayer = function(dt) {
            this.x += this.xSpeed * this.speed * dt;
            this.y += this.ySpeed * this.speed * dt;
        }
        
        var setPlayerStart = function(x, y) {
            this.x = x;
            this.y = y
        }
        
        var player = {};
        player.draw = drawPlayer;
        player.move = movePlayer;
        player.start = setPlayerStart;
        
        player.x = 10;
        player.y = 540;
        player.xSpeed = 0;
        player.ySpeed = 0;
        player.speed = 50;
        
        Object.seal(player);
        return player;
        
    },

    movePlayer: function(dt) {

        this.player.xSpeed = this.direction.left + this.direction.right;
        this.player.ySpeed = this.direction.up + this.direction.down;
        
        this.player.move(dt);
    },

    checkCollision: function() {
        var imgData = this.ctx.getImageData(this.player.x, this.player.y, 20, 20);
        console.log(imgData);
    },
    
    doMousedown: function(e) {
       
        if (this.gameState === this.STATES.TITLE)
            this.gameState = this.STATES.INTRO;
            
        else if (this.gameState === this.STATES.INTRO)
            this.gameState = this.STATES.PLAY;
        
        else if (this.gameState === this.STATES.END)
            this.gameState = this.STATES.TITLE;
        
        var mouse = getMouse(e);
    }, 
    
    checkKeyState: function(key, down) {
        if (down) {
            // Left
            if (key == 37 || key == 65)
                this.direction.left = -1;
            // Up
            if (key == 38 || key == 87)
                this.direction.up = -1;
            // Right
            if (key == 39 || key == 68)
                this.direction.right = 1;
            // Down 
            if (key == 40 || key == 83)
                this.direction.down = 1;
                
        } 
        else {
            // Left
            if (key == 37 || key == 65)
                this.direction.left = 0;
            // Up
            if (key == 38 || key == 87)
                this.direction.up = 0;
            // Right
            if (key == 39 || key == 68)
                this.direction.right = 0;
            // Down 
            if (key == 40 || key == 83)
                this.direction.down = 0;
        }
        
    },
    
     // Calculates time variable to be used for timed logic
	calculateDT: function(){
		var now,fps;
		now = performance.now(); 
		fps = 1000 / (now - this.lastTime);
		fps = clamp(fps, 12, 60);
		this.lastTime = now; 
		return 1/fps;
	},
    
    drawHUD: function(ctx) {
        ctx.save();
        
        if (this.gameState === this.STATES.TITLE) {
            ctx.drawImage(this.image, 0, 0);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            this.fillText(ctx, "Welcome to Last Minute", this.WIDTH/2, this.HEIGHT/2, "35pt 'Delius Unicase'", "black");
        }
        if (this.gameState === this.STATES.INTRO) {
            ctx.drawImage(this.image, 0, 0);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            this.fillText(ctx, "How to Play", this.WIDTH/2, this.HEIGHT/4, "35pt 'Delius Unicase'", "black");
            this.fillText(ctx, "Move from one end of the maze to the other.", this.WIDTH/2, this.HEIGHT/2 - 35, "20pt monospace", "black");
            this.fillText(ctx, "Collect as many of the objects as you can.", this.WIDTH/2, this.HEIGHT/2, "20pt monospace", "black");
            this.fillText(ctx, "You only have one minute for the level though!", this.WIDTH/2, this.HEIGHT/2 + 35, "20pt monospace", "black");
        }
        if (this.gameState === this.STATES.END) {
            ctx.drawImage(this.image, 0, 0);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            this.fillText(ctx, "That's it you did it!", this.WIDTH/2, this.HEIGHT/2, "35pt 'Delius Unicase'", "black");
        }
        
        ctx.restore();
    },
    
    // Draws text to screen
	fillText: function(ctx, string, x, y, css, color) {
		ctx.save();
		// https://developer.mozilla.org/en-US/docs/Web/CSS/font
		ctx.font = css;
		ctx.fillStyle = color;
		ctx.fillText(string, x, y);
		ctx.restore();
	},
    
    // Puts spiders on the screen to be squashed
    generateRandomSpiders: function(amount) {
        for(var i = 0; i < amount; i++){
            this.ctx.fillRect(20, 20, getRandom(0, this.WIDTH - 20), getRandom(0, this.HEIGHT - 20));
        }
    }
    
};