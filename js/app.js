// Enemies our player must avoid
var Enemy = function( x, y ) {
    // Variables applied to each of our instances go here,
    //x and y coordinates are the coordinates on the board
    var canvasWidth = 202, canvasHeight = 295
    this.x = x
    this.y = y//canvasHeight / 3 + Math.random() * canvasHeight / 2
    this.xVelocity = 1;
    this.yVelocity = 0;
    this.active = true;
     

    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // this.x += ;
    this.x += this.xVelocity * dt / 4;

    this.y += this.yVelocity;
    
     
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(x , y ) {
    // ctx.drawImage(Resources.get(this.sprite), 11, 62);
  
   //this is to draw the image. x and y will be constantly changing
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // a handleInput() method.
    // ctx.drawImage(Resources.get(this.sprite), 11, 228);

};



// Now write your own player class
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png'

}
    
// This class requires an update(), render() and
Player.prototype.update = function () {


};  

Player.prototype.render = function ( x, y ) {
    this.x = x || 200;
    this.y = y || 400;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)


};
// a handleInput() method.
Player.prototype.handleInput = function (position) {
    if(position === 'right'){
        player.x += 5;
        console.log('right')
    } else if (position === 'left'){        
        player.x -= 5;
        console.log('left')
    } else if (position === 'up') {
        player.y += 5;
        console.log('up')
    } else if (position === 'down') {
        player.y -= 5;
        console.log('down')
    }

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
//Here, I created 3 enemy objects that will move across the screen
// var allEnemies = [
// new Enemy(0,63),
// new Enemy(0,143),
// new Enemy(0,230)
// ];
var allEnemies = [];

window.setInterval(createEnemies, 900)

function createEnemies(){
var enemyDecider = Math.random();
var loc;
if(enemyDecider < .33 && enemyDecider > 0){
loc = 63
allEnemies.push(new Enemy(0,loc))
} else if (enemyDecider > .33 && enemyDecider < .66){
    loc =  143
    allEnemies.push(new Enemy(0,loc))
} else if (enemyDecider > .66 && enemyDecider < .99){
    loc =  230
    allEnemies.push(new Enemy(0,loc))
}  

}


// Place the player object in a variable called player
var player = new Player();



console.log(allEnemies)
var playerPosX = 5;
var playerPosY = 10;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
