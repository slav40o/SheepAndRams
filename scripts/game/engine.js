define(['renderer', 'scoreboard', 'dommanipulator'],
    function(Renderer, ScoreBoard, DomManipulator) {
    'use strict';
    var Engine;

    Engine = (function() {
        function Engine(gameMode, canvasId) {
            var self,
                madeGuesses,
                isStarted,
                secretNumber,
                guessesHistory,
                ramsFound = new Array(gameMode),
                maxResult = 10000,
                renderEngine = new Renderer(canvasId),
                scoreBoard = new ScoreBoard(10),
                domManipulator = new DomManipulator();

            function loadLogo(){
                renderEngine.logo();
            }

            function start(){
                isStarted = true;
                loadDefaultValues();
                renderEngine.computerMessage(gameMode);
            }

            function restart(){
                start();
            }

            function isGameStarted(){
                return isStarted;
            }

            function topScores(){
                if(scoreBoard._isShown){
                    domManipulator.hideScoreBoard();
                    scoreBoard._isShown = false;
                }
                else{
                    var scores = scoreBoard.getScores();
                    domManipulator.loadScoreBoard(scores);
                    scoreBoard._isShown = true;
                }
            }

            function processNumber(n){
                var sheep,
                    rams,
                    number = n.toString();

                if(number.length != 4 || !isFinite(number)){
                    renderEngine.enteredNumber(number);
                    renderEngine.error('Invalid number!');
                }
                else{
                    madeGuesses++;

                    if(number === secretNumber){
                        endGame();
                    }
                    else{
                        rams = countRams(number);
                        sheep = countSheep(number);
                        renderEngine.enteredNumber(number);
                        renderEngine.result(sheep, rams);
                        domManipulator.addGuess(number, sheep, rams);
                    }
                }
            }

            self = {
                start: start,
                restart: restart,
                showTopScores: topScores,
                checkNumber: processNumber,
                showLogo: loadLogo,
                isGameStarted: isGameStarted
            };

            function countSheep(number){
                var count = 0,
                    i, j,
                    currentDigit;

                for (i = 0; i < gameMode; i += 1)
                {
                    currentDigit = number[i];

                    for (j = 0; j < gameMode; j +=1 )
                    {
                        if (i == j || ramsFound[j])
                        {
                            // It is ram. Continue
                        }
                        else if (currentDigit == secretNumber[j])
                        {
                            count++;
                            break;
                        }
                    }
                }

                return count;
            }

            function countRams(number){
                var count = 0,
                    i;

                for (i = 0; i < gameMode; i += 1)
                {
                    if (number[i] == secretNumber[i])
                    {
                        count++;
                        ramsFound[i] = true;
                        continue;
                    }

                    ramsFound[i] = false;
                }

                return count;
            }

            function generateSecretNumber(gameMod){
                var digits = [],
                    currentDigit,
                    insertedNumbers = 0;

                while (insertedNumbers < gameMod)
                {
                    currentDigit = generateRandomNumber(1, 9);
                    if(insertedNumbers === 0 && currentDigit === 0){
                        continue;
                    }

                    if (!(isDigitUsed(digits, currentDigit)))
                    {
                        digits.push(currentDigit);
                        insertedNumbers++;
                    }
                }
                return digits.join('');
            }

            function isDigitUsed(digits, digit){
                var isDigitUsed = false,
                    i;

                for (i = 0; i < digits.length; i++){
                    if (digits[i] == digit)
                    {
                        isDigitUsed = true;
                        break;
                    }
                }

                return isDigitUsed;
            }

            function generateRandomNumber(from, to) {
                return Math.floor((Math.random() * to) + from);
            }

            function endGame(){
                var score = (maxResult / madeGuesses).toFixed(2),
                    name;

                renderEngine.congratulationMessage(madeGuesses, score);
                name = getPlayerName();

                isStarted = false;
                scoreBoard.saveScore({name: name, score: score})
            }

            function getPlayerName(){
                return window.prompt("Please enter your name!","winner");
            }

            function loadDefaultValues(){
                madeGuesses = 0;
                guessesHistory = [];
                secretNumber = generateSecretNumber(gameMode);
                domManipulator.clearGuesses();
            }

            return self;
        }

        return Engine;
    })();
    return Engine;
});