
var game = new Phaser.Game(600, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('cafe', 'assets/cafe.jpg');
    game.load.image('dorm', 'assets/dorm.jpg');
    game.load.image('forest', 'assets/naokoforest.jpg');
    game.load.image('ending', 'assets/ending.jpg');
    game.load.image('ending2', 'assets/ending2.png');
    game.load.image('player', 'assets/player.png');
    game.load.image('trooper', 'assets/trooper.png');
    game.load.image('midori', 'assets/midori.png');
    game.load.image('naoko', 'assets/naoko.png');
    game.load.image('star', 'assets/star.png');
    game.load.image('black', 'assets/black.png');
    game.load.image('whitebar', 'assets/whitebar.png');
    game.load.image('white', 'assets/white.png');
    game.load.image('button', 'assets/button.png');
    game.load.spritesheet('character', 'assets/playerSP.png', 100, 200);

}

var player;
var cursors, leftButton, rightButton;
var cafe, form, forest, ending;
var midori, trooper, naoko, star, toru;
var stateLevel = 0;
var fadeB, whiteB, button;
var text; 
var style;
var lock = false;
var counter = 0;
var counter2 = 0;
var seconds;
var dcount = 0;
var length = 0;
var oktogo = true;
var d1 = ["What's up Toru?"];
var d2 = ["I had a perm this summer, and it was just awful. I was ready to kill myself. ", "I looked like a corpse on the beach with seaweed stuck to my head.", "So I decided as long as I was ready to die, I might as well cut it all off.", "At least it's cool in the summer."];
var d3 = ["All I'm left holding is a background, pure scenery, with no people at the front", "And nothing but scenery, that view of the meadow in October,", "returns again and again to me like a symbolic scene in a film"];
var d4 =  ["And though that second week in September had rolled around, there was no sign of Storm Trooper.", "....", "he never came back. I returned from lectures one day to find all his stuff gone and his name tag removed from the door. I went to the dorm Head's room and asked what had happened.", "...", "I thought about Storm Trooper every now and then, but I enjoyed living alone."];
var d5 = ["I want you always to remember me. Will you remember that I existed, and that I stood next to you here like this?"];
var d6 = ["So.. Where was I now?"];

function create() {

    game.forceSingleUpdate = true;

    game.world.setBounds(0, 0, 800, 600);

    game.add.sprite(0, 0, 'white');
    
    player = game.add.sprite(200, 450, 'character');
    player.animations.add('goSide', [1,0,2,0], 4, true);
    player.anchor.set(0.5, 0.5);

    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;

    game.camera.follow(player);
    
    style = { font: 'bold 12pt Arial', fill: 'black', align: 'left', wordWrap: true, wordWrapWidth: 500 };
    
    text = game.add.text(game.world.centerX, game.world.centerY, "", style);
    text.fixedToCamera = true;

    cursors = game.input.keyboard.createCursorKeys();
    leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);

}

function update() {

    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (leftButton.isDown && !lock)
    {
        player.body.velocity.x = -200;
        player.animations.play('goSide');
        player.scale.x = 1;
    }
    else if (rightButton.isDown && !lock)
    {
        player.body.velocity.x = 200;
        player.animations.play('goSide');
        player.scale.x = -1;
    }
    else {
    player.animations.frame = 0;
    }
    
    seconds = Math.floor(this.time.totalElapsedSeconds());
    
    if (player.x > 730 && counter < seconds)
    {
        if (oktogo) {
        nextMap();
        lock = true;
        counter = seconds+2;
        oktogo = false;
        }
    }


}

function nextMap() {

    fadeB = game.add.sprite(0, 0, 'black');
    fadeB.alpha = 0.01;
    
    game.add.tween(fadeB).to( { alpha: 1 }, 300, Phaser.Easing.Linear.None, true);
    
    game.time.events.add(Phaser.Timer.SECOND * 1, changeLevel, this);
    game.time.events.add(Phaser.Timer.SECOND * 1, tweenOut, this);

    
}

function changeLevel() {
    
        switch(stateLevel) {
        case 0:
            game.add.sprite(0, 0, 'dorm');
            trooper = game.add.sprite(game.world.centerX, game.world.centerY, 'trooper');
            trooper.inputEnabled = true;
            trooper.events.onInputDown.add(nextUp, this);
            break;
        case 1:
            trooper.destroy();
            dcount = 0;
            game.add.sprite(0, 0, 'cafe');
            midori = game.add.sprite(550, 350, 'midori');
            midori.inputEnabled = true;
            midori.events.onInputDown.add(nextUp, this);
            break;
        case 2:
            midori.destroy();
            game.add.sprite(0, 0, 'forest');
            dcount = 0;
            naoko = game.add.sprite(650, 350, 'naoko');
            naoko.inputEnabled = true;
            naoko.events.onInputDown.add(nextUp, this);
            break;
        case 3:
            naoko.destroy();
            dcount = 0;
            game.add.sprite(0, 0, 'dorm');
            trooper = game.add.sprite(game.world.centerX, game.world.centerY, 'trooper');
            trooper.alpha = 0.3
            trooper.inputEnabled = true;
            trooper.events.onInputDown.add(nextUp, this);
            break;
        case 4:
            trooper.destroy();
            dcount = 0;
            game.add.sprite(0, 0, 'forest');
            star = game.add.sprite(game.world.centerX, game.world.centerY, 'star');
            star.alpha = 0.3
            star.inputEnabled = true;
            star.events.onInputDown.add(nextUp, this);
            break;
        case 5:
            star.destroy();
            game.add.sprite(0, 0, 'ending');
            dcount = 0;
            toru = game.add.sprite(650, 350, 'player');
            toru.inputEnabled = true;
            toru.events.onInputDown.add(nextUp, this);
            var style2 = { font: 'bold 12pt Arial', fill: 'black', align: 'left', wordWrap: true, wordWrapWidth: 500 };
            var text2 = game.add.text(630, 320, "Where are you now?", style2);
            break;
        case 6:
            toru.destroy();
            game.add.sprite(0, 0, 'ending2');
            break;
    }
    
    stateLevel++;
     
    player.x = 100;
    player.bringToTop();
    
}

function tweenOut() {
    fadeB.destroy();
    fadeB = game.add.sprite(0, 0, 'black');
    fadeB.alpha = 1;
    game.add.tween(fadeB).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, true);
    lock = false;
}

function nextUp() {
    whiteB = game.add.sprite(0, 0, 'whitebar');
    whiteB.fixedToCamera =true;
    button = game.add.sprite(450, 110, 'button');
    button.inputEnabled = true;
    button.fixedToCamera = true;
    whiteB.fixedToCamera = true;
    text = game.add.text(50, 10, "......", style);
    text.fixedToCamera = true;
    button.events.onInputDown.add(progress, this);
}

function progress() {
    text.destroy();
    switch(stateLevel) {
        case 1:
            length = d1.length;
            text = game.add.text(50, 10, d1[dcount], style);
            break;
        case 2:
            length = d2.length;
            text = game.add.text(50, 10, d2[dcount], style);
            break;
        case 3:
            length = d3.length;
            text = game.add.text(50, 10, d3[dcount], style);
            break;
        case 4:
            length = d4.length;
            text = game.add.text(50, 10, d4[dcount], style);
            break;
        case 5:
            length = d5.length;
            text = game.add.text(50, 10, d5[dcount], style);
            break;
        case 6:
            length = d6.length;
            text = game.add.text(50, 10, d6[dcount], style);
            break;
    }
    text.fixedToCamera = true;
    dcount++;
    if (dcount > length) {
        whiteB.destroy();
        button.destroy();
        oktogo = true;
    }
    
}

function render() {

    game.debug.cameraInfo(game.camera, 500, 32);
    game.debug.spriteCoords(player, 32, 32);

    game.debug.rectangle({x:400+game.camera.x,y:0+game.camera.y,width:1,height:600});
    game.debug.rectangle({x:0+game.camera.x,y:300+game.camera.y,width:800,height:1});

}
