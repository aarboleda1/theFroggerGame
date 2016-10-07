// Enemies the player must avoid
var Enemy = function( x, y ) {
    // Variables applied to each of our instances go here,
    //x and y coordinates are the coordinates on the board

    var canvasWidth = 202, canvasHeight = 295
    this.x = x
    this.y = y
    this.xVelocity = 1;
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

    this.x += this.xVelocity * dt / 4;  
     
};

// This method draws the enemy on the screen
Enemy.prototype.render = function( x , y ) {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


// Player Class
var Player = function (x, y) {
    this.x = x || 200;
    this.y = y || 405;
    console.log(this.y)
    this.width = 60;
    this.height = 60;
    this.sprite = 'images/char-boy.png'
     if(this.y === -93){
        setTimeout(alert('you win'), 3000)
    } 
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
        player.x += 100;
        if(player.x > 400){
            player.x = 400;
        }
    } else if (position === 'left'){        
        player.x -= 100; 
        if(player.x < 0){
            player.x = 0;
        }
    } else if (position === 'up') {
        player.y -= 83;  
        console.log(player.y)
        if(player.y < -10){
            player.y = -10
        } 
    } else if (position === 'down') {
        player.y += 83;   
        if(player.y > 400){
            player.y = 400
        }      
    }
      
};

/*Collision Detection*/
function collides(a,b){
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + b.height > b.y;
}

function checkCollisions () {
    allEnemies.forEach(function (enemy) {
        if(collides(enemy, player)){
            alert('game over!!')
            location.reload();
        }
    })
}


/*Enemy Generation*/
var allEnemies = [];
//This calls the createEnemies function every 900 milliseconds to constantly generate new enemies
window.setInterval(createEnemies, 1000)
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



console.log(player)
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
