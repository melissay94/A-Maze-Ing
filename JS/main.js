// Main controller for the game - Most comes from Boomshine project

"use strict";

// Checks for if the app exists already and if not make an object literal
var app = app || {};

// App is a global object literal and everything in it is a property of main, which is a property of app

app.main = {
    
    // Constants properties
    WIDTH: 800, 
    HEIGHT: 600,
    PLAYER: Object.freeze({
        WIDTH: 20, 
        HEIGHT: 20,
        MAX_SPEED: 50, 
    }),
    direction: {
        up: 0,
        down: 0, 
        left: 0,
        right: 0,
    },
    // Properties that will be modified
    canvas: undefined,
    ctx: undefined, 
    lastTime: 0, 
    animationID : 0,
    player: undefined,
    
    level1: [
        { x: 60, y: 0, width: 20, height: 500}, 
        { x: 60, y: 500, width: 250, height: 20},
    ],
    
    // Methods
    
    // First called function
    init: function() {
      
        console.log("App.Main.Init() called");
        
        // Initialize canvas
        this.canvas = document.querySelector("#myCanvas");
        this.canvas.width = this.WIDTH;
        this.canvas.height = this.HEIGHT;
        this.ctx = this.canvas.getContext("2d");
        
        // Make Player
        this.player = this.makePlayer();
        
        // Start the game loop
        this.update();
    },
    
    // Called every frame
    update: function() {
        
        // Set up loop
        this.animationID = requestAnimationFrame(this.update.bind(this));
        
        // Calculate delta time
        var dt = this.calculateDeltaTime();
        
        // Move player
        this.movePlayer(dt, this.level1);
        
        // Redraw background first
        this.ctx.fillStyle = "aliceblue"; 
		this.ctx.fillRect(0,0,this.WIDTH,this.HEIGHT); 
        
        // Draw player
        this.ctx.fillStyle = "black";
        this.player.draw(this.ctx);
        
        this.generateMap(this.level1);
    
    },
    
    makePlayer: function() {
      
        var playerDraw = function(ctx) {
            ctx.save();
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fill();
            ctx.restore();
        }
        
        var playerMove = function(dt) {
            this.x += this.xSpeed * this.speed * dt * this.velocity;
            this.y += this.ySpeed * this.speed * dt * this.velocity;
        }
        
        var player = {};
        
        player.x = 10;
        player.y = this.canvas.height-40;
        player.width = this.PLAYER.WIDTH;
        player.height = this.PLAYER.HEIGHT;
        
        var randVect = getRandomUnitVector();
        player.xSpeed = this.direction.left + this.direction.right;
        player.ySpeed = this.direction.up + this.direction.down;
        player.speed = this.PLAYER.MAX_SPEED;
        player.velocity = 1;
        
        player.lifetime = 0;
        
        player.draw = playerDraw;
        player.move = playerMove;
        
        Object.seal(player);
        
        return player;
        
    },
    
    movePlayer: function(dt, walls) {
        
        if (this.player.velocity < 0)
            this.player.velocity = 1;
        
        this.player.ySpeed = this.direction.up + this.direction.down;
        this.player.xSpeed = this.direction.left + this.direction.right;
        
        if (this.player.x < 0) 
            this.player.x = 0;
       
        if (this.player.x > this.WIDTH - this.PLAYER.WIDTH)
            this.player.x = this.WIDTH - this.PLAYER.WIDTH;
        
        if (this.player.y < 0) 
            this.player.y = 0;
        
        if (this.player.y > this.HEIGHT - this.PLAYER.HEIGHT)
            this.player.y = this.HEIGHT - this.PLAYER.HEIGHT;
        
        for (var i = 0; i < walls.length; i++) {
            
            if (this.player.x + this.player.width > walls[i].x && this.player.x < walls[i].x + walls[i].width && this.player.y + this.player.height > walls[i].y && this.player.y < walls[i].y + walls[i].height) {
               if (this.player.x + this.player.width > walls[i].x && this.player.x < walls[i].x + walls[i].width)
                   this.player.velocity = -1;
                if (this.player.y + this.player.height > walls[i].y && this.player.y < walls[i].y + walls[i].height)
                    this.player.velocity = -1;
            }
        }
        
        this.player.move(dt);
    },
    
     // Calculates time variable to be used for timed logic
	calculateDeltaTime: function(){
		var now,fps;
		now = performance.now(); 
		fps = 1000 / (now - this.lastTime);
		fps = clamp(fps, 12, 60);
		this.lastTime = now; 
		return 1/fps;
	},
    
    // Checks for key input for movement
    keyCheck(keypressed, keyDown) {
        if (keyDown) {
            if (keypressed == 'W' || keypressed == '&')
                this.direction.up = -1;
            if (keypressed == 'S' || keypressed == '(')
                this.direction.down = 1;
            if (keypressed == 'A' || keypressed == '%')
                this.direction.left = -1;
            if (keypressed == 'D' || keypressed == "'")
                this.direction.right = 1;
        }
        else {
            if (keypressed == 'W' || keypressed == '&')
                this.direction.up = 0;
            if (keypressed == 'S' || keypressed == '(')
                this.direction.down = 0;
            if (keypressed == 'A' || keypressed == '%')
                this.direction.left = 0;
            if (keypressed == 'D' || keypressed == "'")
                this.direction.right = 0;
        }
        
    },
    
    generateMap(walls) {
        for (var i = 0; i < walls.length; i++) {
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(walls[i].x, walls[i].y, walls[i].width, walls[i].height);
        }
    },
    
    
}; // End of app.main