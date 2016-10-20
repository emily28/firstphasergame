/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});
var platforms;
var player;
var cursors;
var stars;
var score = 0;
var scoreText;

function collectStar(player, star) {
    // Removes the star from the screen
    star.kill();
    score += 5;
}

function preload() {

    game.load.image('sky', 'assets/moonbackground.png');
    game.load.image('platform', 'assets/mainground.png');
    game.load.image('ground', 'assets/myground.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/ghost3.png', 33, 48);

}

function create() {

    // We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sky');


    // Platform groups contain the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    // We will enable physics for any object that is created in this group.
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    // Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    // This stops it from falling away when you jump on it.
    ground.body.immovable = true;

    ledge = platforms.create(-50, 300, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(450, 425, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(275, 150, 'ground');
    ledge.body.immovable = true;
    
    // Start of testing
    
    // Platform groups contain the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    // We will enable physics for any object that is created in this group.
    platforms.enableBody = true;

    // Here we create the ground.
    var platform = platforms.create(0, game.world.height - 64, 'platform');

    // Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platform.scale.setTo(2, 2);
    
    // This stops it from falling away when you jump on it.
    platform.body.immovable = true;

    var ledge = platforms.create(-50, 300, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(450, 425, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(275, 150, 'ground');
    ledge.body.immovable = true;
    
    // End of testing


    // The player and its settings
    player = game.add.sprite(14, game.world.height - 112, 'dude');

    // We need to enable physics on the player
    game.physics.arcade.enable(player);

    // Player physics property. Give the little guy a slight bounce.
    player.body.bounce.y = 1;
    player.body.gravity.y = 5;
    player.body.collideWorldBounds = true;

    // Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 7, true);
    player.animations.add('right', [8, 9, 10, 11], 7, true);
    
    // figure this out
    player.animations.add('stand', [4, 5, 6, 7], 7, true);


    cursors = game.input.keyboard.createCursorKeys();


    stars = game.add.group();

    stars.enableBody = true;

    // Here we'll create 12 of them evenly spaced apart
    for (var i = 1; i < 5; i++) {
        // Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 265, 'star');

        // Let gravity do its thing
        star.body.gravity.y - 6;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    for (i = 4.15; i < 10.15; i++) {
        // Create a star inside of the 'stars' group
        star = stars.create(i * 70, 115, 'star');

        // Let gravity do its thing
        star.body.gravity.y - 6;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    for (i = 6.75; i < 12.75; i++) {
        // Create a star inside of the 'stars' group
        star = stars.create(i * 70, 390, 'star');

        // Let gravity do its thing
        star.body.gravity.y = 3;
        star.body.bounce.y = 0.3 + Math.random() * 0.1;
    }
    scoreText = game.add.text(16, 16, 'score: 0', {
        fontSize: '32px',
        fill: '#000'
    });

}

function update() {



    // Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);


    // Reset the player velocity
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        // Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        // Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else {
        // Stand still
        player.animations.play('stand');
    }


    // Allow the plater to jump if they are touching the ground
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -350;
    }
    
    game.physics.arcade.collide(stars, platforms);

    // Do I put this here?
    game.physics.arcade.overlap(player, stars, collectStar, null, this);



    scoreText.text = "Score: " + score;


}