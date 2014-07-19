define(['handlebars', 'jquery'], function(Handlebars, $) {
    'use strict';
    var DomManipulator;

    DomManipulator = (function() {
        Handlebars.registerHelper('plusOne', function(number) {
            return number + 1;
        });


        function DomManipulator() {
            this._guessTemplate = Handlebars.compile($('#guess-item-template').html());
            this._highScoreTemplate = Handlebars.compile($('#score-list-template').html());
            this._$highScoreContainer = $('#high-scores');
            this._$guessesContainer = $('#guess-list');
        }

        DomManipulator.prototype = {
            addGuess: function(number, sheep, rams){
                var guessElement = this._guessTemplate({number: number, sheep: sheep, rams: rams});
                this._$guessesContainer.append(guessElement);
            },

            clearGuesses: function(){
                this._$guessesContainer.html('');
            },

            loadScoreBoard: function(scores){
                this._$highScoreContainer.show();
                var scoresElement = this._highScoreTemplate({score: scores});
                this._$highScoreContainer.html('');
                this._$highScoreContainer.append(scoresElement);
            },

            hideScoreBoard: function(){
                this._$highScoreContainer.hide();
            }
        };


        return DomManipulator;
    })();
    return DomManipulator;
});