/*Create an obstacle class to create a bit more dificulty in the game */
 var Obstacle = function () {
     this.sprite = 'images/stone-block.png';
     var xLoc = Math.random();
     if(xLoc > 0 && xLoc < .25){
        xLoc = 0
     }else if (xLoc > .25 && xLoc < .5) {
        xLoc = 100
     }  else if (xLoc > .5 && xLoc < .75) {
        xLoc = 305
     } else if (xLoc > .75 && xLoc < 1) {
        xLoc = 405
     }
     
     this.x = xLoc;
     this.y = 415;
     this.yVelocity = 1;
     this.width = 80; 
     this.height = 80;

 }
  var obstacle = new Obstacle();

 Obstacle.prototype.render = function () {  
  //ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
 }



 //var obstacle = new Obstacle();
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

/*Score Detection*/
var score = 0;
function drawScore (){
    ctx.clearRect(0,0, 505, 606)
    ctx.font = "18px Really-Awesome";
    ctx.fillText("Score: "+ score, 425, 48);
    ctx.font = "25px Really-Awesome";
    ctx.fillText('Antons Frogger', 0, 45)
    ctx.font = "18px Really-Awesome";
    ctx.fillText('Get to the water 5 times without getting hit by the ladybugs!', 0, 598)
if(score === 5){
    alert('bravo, you beat this game!!')
    location.reload()
}

}

// a handleInput() method.
Player.prototype.handleInput = function (position) {
    if(position === 'right'){
        this.x += 99;
        if(this.x > 400){
            this.x = 400;
        }        
    } else if (position === 'left'){        
        this.x -= 99; 
        if(this.x < 0){
            this.x = 0;
        }
    } else if (position === 'up') {
        this.y -= 83;  
        console.log(player.y)
        if(this.y < -10){
            this.y = -10
            if(this.y < 0){
              this.y = 400;
              score++
              drawScore(score);
              //location.reload();
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
var messages = ['ouch that one hurt, try again buddy','ya dead mon, try again and get to 5!',  'splat!!!', 'bet you can\'t get to 5', 'whupah! you\'re dead, this time, watch out for the bugs']
function checkCollisions () {
    allEnemies.forEach(function (enemy) {
        
        if(collides(enemy, player)){
            var num = Math.random() 
            if(num > 0 && num < .2){
                num = 0
            }else if(num >= 0.2 && num <= .4){
                num = 1
            }else if(num >= .4 && num <= .6){
                num = 2
            } else if(num >= .6 && num <= .8){
                num = 3
            }else   if(num >= .8 && num  <= 1){
                num = 4
            }
            alert(messages[num]);

            location.reload();
            
        }
    })

    // if(collides(obstacle, player)){
    //     //alert('don\'t run into the wall')
    //     //location.reload();
    //      // if(player.x - obstacle.x < 100){
    //      // console.log('hi')
    //      // console.log(player.x)
    //      // console.log(obstacle.x)
  
    //      // player.x = player.x -100;
    //      // } else if (  player.x - obstacle.x > 0 ) {
    //      //    console.log('whatuppp')
    //      //    player.x = player.x + 100;
    //      // } 
    //    //console.log('collision')
    //    console.log(player.x + 'player')
    //           console.log(obstacle.x +' obst')

    //    if(player.x > obstacle.x){
    //     console.log('collision from right')
    //     player.x = player.x - 99
    //    } else if (player.x < obstacle.x) {
    //     console.log('collision from left')
    //     player.x = player.x - 99
    //    }
      
    // }
}


/*Enemy Generation*/
var allEnemies = [];
//This calls the createEnemies function every 900 milliseconds to constantly generate new enemies
window.setInterval(createEnemies, 900)
//this function createsEnemies using JS builtin JS math.random to put it in any given column
function createEnemies(){
    
    var enemyDecider = Math.random();
    var y;
    if(enemyDecider <= .33 && enemyDecider >= 0){
        y = 63
    allEnemies.push(new Enemy(0, y))
    } else if (enemyDecider >= .33 && enemyDecider <= .66){
        y =  143
        allEnemies.push(new Enemy(0, y))
    } else if (enemyDecider >= .66 && enemyDecider <= .99){
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















