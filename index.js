'use strict'

const prompt = require('prompt-sync')({ sigint: true });
const util = require('util');



const colors = {
    'r': 'red',
    'b': 'blue',
    'g': 'green',
    'y': 'yellow',
    'k': 'black',
    'w': 'white'
};


var guesses = [];


main(process.argv);


function main(args) {
    mastermind();
}


function mastermind() {
    let keys = Object.keys(colors);
    while (true) {
        let solution = [];
        for (let i = 0; i < 4; i++) {
            solution.push(keys[random()]);
        }
        console.log('The bot has a solution, let\'s see if you can figure it out.');
        console.log();

        let correctPosition = 0;
        let correctColor = 0;
        guesses = [];

        for (let attempt = 0; attempt < 10; attempt++) {

            correctPosition = 0;
            correctColor = 0;

            // let s = getColors(solution);
            // console.log(s);

            const guess = getGuess();
            let solution2 = [...solution];

            // Look for any correct color and position
            for (let i in guess) {
                if (guess[i] === solution2[i]) {
                    correctPosition++;
                    solution2[i] = ' ';
                }
            }

            // Now look for just the correct color
            for (let i in guess) {
                for (let j in solution2) {
                    if (guess[i] === solution2[j]) {
                        solution2[j] = ' ';
                        correctColor++;
                    }
                }
            }

            guesses.push({
                attempt: attempt + 1,
                guess: guess,
                position: correctPosition,
                color: correctColor
            });

            console.log();
            for (let g of guesses) {
                let s = "(" + g.attempt + ") ";
                s += getColors(g.guess);
                s += "   " + g.position + " POS    " + g.color + " COL";
                console.log(s);
                console.log();
            }

            if (correctPosition === 4) {
                break;
            }
        }

        if (correctPosition === 4) {
            console.log('Congratulations, you got it!');
        } else {
            console.log('Sorry, this was the bots solution:');
            let s = getColors(solution);
            console.log(s);
        }

        console.log();
        console.log();
    }
}


function getColors(guess) {
    let BgRed = "\x1b[41m";
    let BgGreen = "\x1b[42m";
    let BgYellow = "\x1b[43m";
    let BgBlue = "\x1b[44m";
    let BgBlack = "\x1b[40m";
    let BgWhite = "\x1b[47m";
    let Reset = "\x1b[0m";

    let s = '';
    for (let ch of guess) {
        switch (ch) {
        case 'r':
            s += BgRed + "  " + Reset + " ";
            break;
        case 'g':
            s += BgGreen + "  " + Reset + " ";
            break;
        case 'y':
            s += BgYellow + "  " + Reset + " ";
            break;
        case 'b':
            s += BgBlue + "  " + Reset + " ";
            break;
        case 'k':
            s += BgBlack + "  " + Reset + " ";
            break;
        case 'w':
            s += BgWhite + "  " + Reset + " ";
            break;
        }
    }

    return s;
}


function getGuess() {
    while (true) {
        const guess = prompt('Your guess [rbgykw]? ');

        if (guess.length !== 4) {
            console.log('Your guess must be four characters (for example rbgy, wwkk, rgwk) (use k for black)');
            continue;
        }

        let valid = true;
        for (let i in guess) {
            let ch = guess[i];
            switch (ch) {
            case 'r':
            case 'b':
            case 'g':
            case 'y':
            case 'k':
            case 'w':
                continue;
            default:
                console.log('The letter \'' + ch + '\' at position ' + (parseInt(i) + 1) + ' is not valid.  Use the letters r, b, g, y, k (black), or w.');
                valid = false;
                break;
            }
        }

        if (valid) {
            return guess;
        }
    }
}


function random() {
    return Math.floor(Math.random() * Math.floor(5));
}
