window.prepareDuration = 10;
window.shootDuration = 120;
window.finalDuration = 30;

/*
 * Do not change anything past this line, unless you know what you do!
 */

window.gameProcess = 0;
window.currentPhase;

function clearLight(light) {
    light.removeClass();
    light.addClass('light');
    light.find('.info').text('');
    light.find('.counter').text('');
}

function startGame(light) {
    clearLight(light);
    var timer = prepareDuration;
    playHorn();
    light.addClass('red');
    light.find('.counter').text(timer);
    currentPhase = setInterval(function() {
        if (timer > 1) {
            timer--;
            light.find('.counter').text(timer);
        } else {
            clearInterval(currentPhase);
            startMainPhase(light);
        }
    }, 1000);
}

function startMainPhase(light) {
    clearLight(light);
    var timer = shootDuration;
    playHorn();
    light.addClass('green');
    light.find('.counter').text(timer);
    currentPhase = setInterval(function() {
        if (timer > finalDuration + 1) {
            timer--;
            light.find('.counter').text(timer);
        } else {
            clearInterval(currentPhase);
            startEndPhase(light);
        }
    }, 1000);
}

function startEndPhase(light) {
    clearLight(light);
    var timer = finalDuration;
    playHorn();
    light.addClass('yellow');
    light.find('.counter').text(timer);
    currentPhase = setInterval(function() {
        if (timer > 1) {
            timer--;
            light.find('.counter').text(timer);
        } else {
            clearInterval(currentPhase);
            stopGame(light);
        }
    }, 1000);
}

function stopGame(light) {
    clearLight(light);
    light.addClass('red');
}

function playHorn(repeat) {
    var audio = document.createElement('audio');
    audio.setAttribute('src', 'mp3/air_horn.mp3');
    audio.setAttribute('autoplay', 'autoplay');
    if (repeat > 1) {
        var counter = 0;
        var playSoundInRepeat = setInterval(function() {
            if (counter === 2) {
                clearInterval(playSoundInRepeat);
            } else {
                audio.play();
            }
            counter++;
        }, 2500);
    } else {
        audio.play();
    }
}

$(document).ready(function() {
    var light = $(this).find('.light');

    $('body').keyup(function(e) {
        var pressedKey = e.which;
        $(this).find('.start').remove();

        /*
         * Emergency break by pressing [SPACE]
         */
        if (pressedKey === 32) {
            if (typeof currentPhase !== 'undefined') {
                clearInterval(currentPhase);
            }
            clearLight(light);
            playHorn(3)
            light.addClass('red');
            light.find('.info').text('STOP!');
        }

        /*
         * Start by pressing [ENTER]
         */
        if (pressedKey === 13) {
            if (gameProcess === 0) {
                console.log('no game startet!');
                if (typeof currentPhase !== 'undefined') {
                    clearInterval(currentPhase);
                }
                clearLight(light);
                startGame(light);
            } else {
                // Do nothing
            }
        }
    });

});