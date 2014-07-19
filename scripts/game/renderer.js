define([], function() {
    'use strict';
    var Renderer;

    Renderer = (function() {
        function Renderer(canvasId) {
            var canvas = document.getElementById(canvasId);
            this._ctx = canvas.getContext("2d");
            this._width = this._ctx.canvas.width;
            this._height = this._ctx.canvas.height;
        }

        function drawText(text, color, size, isBold, y){
            var textLength, x;
            this._ctx.fillStyle = color;

            if(isBold){
                this._ctx.font = 'bold ' +  size + 'px Consolas';
            }
            else{
                this._ctx.font = size + 'px Consolas';
            }

            textLength = this._ctx.measureText(text).width;
            x = this._width / 2 - textLength / 2;
            this._ctx.fillText(text, x, y);
        }

        Renderer.prototype = {
            logo: function(){
                var logo = 'Sheep and Rams';

                this._ctx.clearRect(0, 0, this._width, this._height);
                drawText.call(this, logo, 'green', 56, true, 80);
            },

            computerMessage: function(gameMod){
                this._ctx.clearRect(0, 90, this._width, this._height);
                var message = 'Guess my ' + gameMod + ' digit number.';
                drawText.call(this, message, 'black', 26, false, 150);
            },

            result: function(sheep, rams){
                var result = 'Sheep: ' + sheep + '; Rams: ' + rams,
                    message = 'Wrong number!';
                this._ctx.clearRect(0, 220, this._width, this._height);
                drawText.call(this, message, 'orange', 30, false, 250);
                drawText.call(this, result, 'yellowgreen', 26, false, 300);
            },

            error: function(message){
                this._ctx.clearRect(0, 220, this._width, this._height);
                drawText.call(this, message, 'red', 30, true, 250);
            },

            enteredNumber: function(number){
                this._ctx.clearRect(0, 170, this._width, this._height);
                drawText.call(this, number, 'orange', 36, true, 200);
            },

            congratulationMessage: function(guessesCount, score){
                var text = 'You guessed my secret number in ' + guessesCount + ' attempts.',
                    message = 'Congratulations!';
                this._ctx.clearRect(0, 170, this._width, this._height);
                drawText.call(this, message, 'orange', 40, true, 200);
                drawText.call(this, text, 'yellowgreen', 26, true, 250);
            }
        };

        return Renderer;
    })();
    return Renderer;
});