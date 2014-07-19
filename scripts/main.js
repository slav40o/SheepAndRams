(function(){
    require.config({
        paths: {
            'underscore': 'libs/underscore',
            'jquery': 'libs/jquery-2.1.1.min',
            'engine': 'game/engine',
            'renderer': 'game/renderer',
            'scoreboard': 'game/scoreboard',
            'handlebars': 'libs/handlebars-v1.3.0',
            'dommanipulator': 'game/dom-manipulator'
        },
        'shim': {
            'handlebars': {
                'exports': 'Handlebars'
            }
        }
    });

    require(['engine', 'jquery'], function(Engine, $){
        var engine = new Engine(4, 'game-canvas');
        addListeners();
        engine.showLogo();

        function addListeners(){
            $('#game-menu').on('click','.menu-btn', function(e){
                var targetId = $(this).attr('id');
                if(targetId == 'play-btn' || targetId == 'restart-btn'){
                    engine.start();
                }
                else if(targetId == 'top-scores-btn'){
                    engine.showTopScores();
                }
            });

            $('#number-input').on('click','.menu-btn', function(e){
                if(engine.isGameStarted()){
                    var element = $(this).prev();
                    engine.checkNumber(element.val());
                    element.val('');
                }
                else{
                    alert('Please click on Play button to start the game.')
                }
            });
        }
    });
}());