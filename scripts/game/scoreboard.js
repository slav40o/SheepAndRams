define([], function() {
    'use strict';
    var ScoreBoard;

    ScoreBoard = (function() {
        function ScoreBoard(scoreCount) {
            var scores = localStorage.getItem('sheepRamsScores');

            if(!scores){
                this._scores = [];
            }
            else{
                this._scores = JSON.parse(scores);
            }

            this._count = scoreCount;
            this._isShown = false;
        }

        function sortScores(){
            this._scores = this._scores.sort(function (score1, score2){
                return score1 - score2;
            });
            return this._scores;
        }

        ScoreBoard.prototype = {
            saveScore: function(score){
                this._scores.push(score);
                if(this._scores.length > this._count){
                    sortScores.call(this);
                    this._scores.splice(this._count);
                }

                localStorage.setItem('sheepRamsScores', JSON.stringify(this._scores))
            },

            getScores: function(){
                if(this._scores.length > this._count){
                    return sortScores.call(this).splice(this._count);
                }

                return  sortScores.call(this);
            }
        };

        return ScoreBoard;
    })();
    return ScoreBoard;
});