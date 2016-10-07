// Enemies the player must avoid
var Enemy = function( x, y ) {
    // Variables applied to each of our instances go here,
    //x and y coordinates are the coordinates on the board
    var speedGenerator = Math.random() * 1.3;
    if(speedGenerator < .5){
        speedGenerator = .2
    }
    var canvasWidth = 202, canvasHeight = 295
    this.x = x
    this.y = y

    this.xVelocity = speedGenerator;
    this.yVelocity = 0;
    this.active = true;
    this.width = 60;
    this.height = 60;
     
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

//This updates the players from left to right
Enemy.prototype.update = function(dt) {
//look into engine.js for the dt variable
    this.x += this.xVelocity * dt / 4;  
     
};

// This method draws the enemy on the screen
Enemy.prototype.render = function( x , y ) {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Player Class
var Player = function ( x, y ) {
    
    this.x = x || 200;
    this.y = y || 405;
    this.width = 60;
    this.height = 60;
    this.sprite = 'images/char-boy.png'
    
}
    
// This class requires an update(), render() and
Player.prototype.update = function () {
    

};  

Player.prototype.render = function ( x, y ) {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)


};
// a handleInput() method.
Player.prototype.handleInput = function (position) {
    if(position === 'right'){
        this.x += 100;
        if(this.x > 400){
            this.x = 400;
        }
    } else if (position === 'left'){        
        this.x -= 100; 
        if(this.x < 0){
            this.x = 0;
        }
    } else if (position === 'up') {
        this.y -= 83;  
        console.log(player.y)
        if(this.y < -10){
            this.y = -10
            if(this.y === -10){
        alert('you win!!!')
        location.reload();
        } 
        } 
    } else if (position === 'down') {
        this.y += 83;   
        if(this.y > 400){
            this.y = 400
        }      
    }
      
};

/*Collision Detection*/
function collides(a,b){
    return a.x < b.x + b.width 
    && a.x + a.width > b.x 
    && a.y < b.y + b.height 
    && a.y + b.height > b.y;
}

function checkCollisions () {
    allEnemies.forEach(function (enemy) {
        if(collides(enemy, player)){
            alert('game over!!');

            location.reload();
            subtractLives();
        }
    })
}


/*Enemy Generation*/
var allEnemies = [];
//This calls the createEnemies function every 900 milliseconds to constantly generate new enemies
window.setInterval(createEnemies, 900)
//this function createsEnemies using JS builtin JS math.random to put it in any given column
function createEnemies(){
    
    var enemyDecider = Math.random();
    var y;
    if(enemyDecider < .33 && enemyDecider > 0){
        y = 63
    allEnemies.push(new Enemy(0, y))
    } else if (enemyDecider > .33 && enemyDecider < .66){
        y =  143
        allEnemies.push(new Enemy(0, y))
    } else if (enemyDecider > .66 && enemyDecider < .99){
        y =  230
        allEnemies.push(new Enemy(0,y))
    }  

}

// Place the player object in a variable called player
var player = new Player();

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






















