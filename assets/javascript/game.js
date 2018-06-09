// Game object
let game = {
    // Set variables
    wins: 0,
    losses: 0,
    yourScore: 0,
    randomScore: 0,
    rupees: {
        value: [],
        greenRupee: 0,
        yellowRupee: 0,
        redRupee: 0,
        silverRupee: 0,
    },

    // Generate a random score user need to reach
    generateScore: function () {
        this.randomScore = Math.floor(Math.random() * 101) + 19;
        console.log('Get this score ' + this.randomScore); // Delete later
    },

    // Generate a random value for each rupee
    generateRupeeValue: function() {
        this.rupees.value = [];
        for (i = 0; i < 4; i++) {
            let randomValue = Math.floor(Math.random() * 12) + 1;
            // No duplicate rupee values
            while (this.rupees.value.indexOf(randomValue) !== -1) {
                randomValue = Math.floor(Math.random() * 12) + 1;
            }
            this.rupees.value[i] = randomValue;
        }
        this.rupees.greenRupee = this.rupees.value[0];
        this.rupees.yellowRupee = this.rupees.value[1];
        this.rupees.redRupee = this.rupees.value[2];
        this.rupees.silverRupee = this.rupees.value[3];
        console.log(this.rupees.value); // Delete later
    },
}

// On browser load
$(document).ready(function() {
    startGame();
    updateStatus();
});

// Setting game and resetting values
function startGame() {
    game.generateScore();
    game.generateRupeeValue();
    game.yourScore = 0;
}

// Check score
function scoreChecker() {
    if (game.yourScore === game.randomScore) {
        let sound = document.getElementById('winSound');
        sound.play();
        game.wins++;
        alert('You Won!');
        startGame();
    }

    if (game.yourScore > game.randomScore) {
        let sound = document.getElementById('lostSound');
        sound.play();
        game.losses++;
        alert('...Sorry, you lost...');
        startGame();
    }
}

// Update score, points, wins and losses
function updateStatus() {
    $('#collect').html(game.randomScore);
    $('#yourScore').html(game.yourScore);
    $('#wins').html(game.wins);
    $('#losses').html(game.losses);
}

// When rupees are clicked
$('.rupee').on('click', function(e) {
    let target = $(e.target);
    if (target.is('.green')) {
        let sound = document.getElementById('pickGreen');
        sound.play();
        game.yourScore += game.rupees.greenRupee;
        console.log('Added ' + game.rupees.greenRupee); // Delete later
    }

    if (target.is('.red')) {
        let sound = document.getElementById('pickRed');
        sound.play();
        game.yourScore += game.rupees.redRupee;
        console.log('Added ' + game.rupees.redRupee); // Delete later
    }

    if (target.is('.yellow')) {
        let sound = document.getElementById('pickYellow');
        sound.play();
        game.yourScore += game.rupees.yellowRupee;
        console.log('Added ' + game.rupees.yellowRupee); // Delete later
    }

    if (target.is('.silver')) {
        let sound = document.getElementById('pickSilver');
        sound.play();
        game.yourScore += game.rupees.silverRupee;
        console.log('Added ' + game.rupees.silverRupee); // Delete later
    }
    scoreChecker();
    updateStatus();
});