function start() {
    //teclas
    const KEY = {
        UP: [87, 38],
        DOWN: [83, 40],
        LEFT: [65, 37],
        RIGHT: [39, 68],
        SHOOT: [88, 66],
        SPACE: 32
    };

    var game = {};
    var gameDiv = $("#game");

    var points = 0;
    var rescued = 0;
    var lost = 0;

    var heart = 3; // quantidade de vidas
    var end = false;
    var canMove = true;
    var shot = true;

    var sky = $("#sky"); // céu do jogo (fundo)
    var forest = $("#forest"); //floresta do jogo (fundo)
    var ground = $("#ground"); //chão do jogo (fundo)

    var speed = 5;
    var positionY = parseInt(Math.random() * 334);

    //Variáveis de som
    var shootSound = document.getElementById("shootSound");
    var explosionSound = document.getElementById("explosionSound");
    var backgroundSound = document.getElementById("backgroundSound");
    var gameOverSound = document.getElementById("gameOverSound");
    var lostSound = document.getElementById("lostSound");
    var rescueSound = document.getElementById("rescueSound");
    var warpSound = document.getElementById("warpSound");

    backgroundSound.addEventListener("ended", function() {
            backgroundSound.currentTime = 0;
            backgroundSound.play();
        },
        false); //loop da música de background

    gameOverSound.addEventListener("ended", function() {
            gameOverSound.currentTime = 0;
            gameOverSound.play();
        },
        false);
    backgroundSound.play(); //loop da música de game over

    game.timer = setInterval(loop, 30); //set loop game
    game.press = [];

    $("#start").fadeOut();

    //Elementos da interação
    gameDiv.append("<div id='score'></div>");
    gameDiv.append("<div id='heart'></div>");

    gameDiv.append("<div id='ufo' class='ufo-animation'></div>");
    gameDiv.append("<div id='helicopter' class='helicopter-animation'></div>");
    gameDiv.append("<div id='truck'></div>");
    gameDiv.append("<div id='alien' class='alien-animation'></div>");

    /* 
     * Loop do jogo
     */
    function loop() {
        changeBackgroundPosition();
        movePlayer();
        moveTruck();
        moveHelicopter();
        moveAlien();
        collision();
        score();
        setHeart();
    }

    /* 
     * Movimentação do fundo
     */
    function changeBackgroundPosition() {
        leftSky = parseInt(sky.css("background-position"));
        sky.css("background-position-x", leftSky - 1);

        leftForest = parseInt(forest.css("background-position"));
        forest.css("background-position-x", leftForest - 2);

        leftGround = parseInt(ground.css("background-position"));
        ground.css("background-position-x", leftGround - 3);
    }

    $(document).keydown(function(e) {
        game.press[e.which] = true;
    });


    $(document).keyup(function(e) {
        game.press[e.which] = false;
    });

    /* 
     * Movimentação do jogador
     */
    function movePlayer() {
        let top = parseInt($("#ufo").css("top"));
        let left = parseInt($("#ufo").css("left"));

        if (canMove) {
            if (game.press[KEY.UP[0]] || game.press[KEY.UP[1]]) {
                if (top > 0)
                    $("#ufo").css("top", top - 5);
            }

            if (game.press[KEY.DOWN[0]] || game.press[KEY.DOWN[1]]) {
                if (top < 400)
                    $("#ufo").css("top", top + 5);
            }

            if (game.press[KEY.DOWN[0]] || game.press[KEY.DOWN[1]]) {
                if (top < 400)
                    $("#ufo").css("top", top + 5);
            }

            if (game.press[KEY.LEFT[0]] || game.press[KEY.LEFT[1]]) {
                if (left > 0)
                    $("#ufo").css("left", left - 5);
            }

            if (game.press[KEY.RIGHT[0]] || game.press[KEY.RIGHT[1]]) {
                if (left < 640)
                    $("#ufo").css("left", left + 5);
            }

            if (game.press[KEY.SHOOT[0]] || game.press[KEY.SHOOT[1]]) {
                shoot();
            }
            if (game.press[KEY.SPACE]) {
                showLaser();
            }
        }

    }

    /* 
     * Animação do laser da nave
     */
    function showLaser() {
        warpSound.play();
        canMove = false;
        $(".laser-animation").remove();

        let top = parseInt($("#ufo").css("top"))
        let positionX = parseInt($("#ufo").css("left"))
        let laserX = positionX + 10;
        let laserTop = top + 63;

        gameDiv.append("<div id='laser' class='laser-animation'></div");
        $("#laser").css("top", laserTop);
        $("#laser").css("left", laserX);
        setTimeout(function() {
            $("#laser").fadeOut();
            setTimeout(function() {
                canMove = true;
                $(".laser-animation").remove();
            }, 300);
        }, 2000);
    }

    /* 
     * Movimentação do helicoptero inimigo
     */
    function moveHelicopter() {

        let positionX = parseInt($("#helicopter").css("left"));
        $("#helicopter").css("left", positionX - speed);
        $("#helicopter").css("top", positionY);

        if (positionX <= 0) {
            positionY = parseInt(Math.random() * 350);
            $("#helicopter").css("left", 694);
            $("#helicopter").css("top", positionY);
        }
    }

    /*
     * Movimentação do caminhão inimigo
     */
    function moveTruck() {
        let positionX = parseInt($("#truck").css("left"));
        $("#truck").css("left", positionX - 4);

        if (positionX <= 0) {
            $("#truck").css("left", 750);
        }
    }

    /*
     * Movimentação do alien amigo
     */
    function moveAlien() {
        positionX = parseInt($("#alien").css("left"));
        $("#alien").css("left", positionX + 1);
        if (positionX > 920) {
            $("#alien").css("left", 0);
        }
    }

    /*
     * Função de atirar
     */
    function shoot() {
        if (shot == true) {
            shootSound.play();
            shot = false;
            let top = parseInt($("#ufo").css("top"))
            let positionX = parseInt($("#ufo").css("left"))
            let shotX = positionX + 100;
            let shotTop = top + 37;

            gameDiv.append("<div id='shot'></div");
            $("#shot").css("top", shotTop);
            $("#shot").css("left", shotX);

            var shootTime = window.setInterval(shooting, 30);
        }

        function shooting() {
            let positionX = parseInt($("#shot").css("left"));
            $("#shot").css("left", positionX + 15);

            if (positionX > 920) {
                window.clearInterval(shootTime);
                shootTime = null;
                $("#shot").remove();
                shot = true;
            }
        }
    }

    /*
     * Lógica das colisões
     */
    function collision() {
        var ufoHelicopterDamaged = ($("#ufo").collision($("#helicopter")));

        var helicopterDamaged = ($("#shot").collision($("#helicopter")));
        var saveAlien = ($("#laser").collision($("#alien")));
        var hurtAlien = ($("#truck").collision($("#alien")));
        var alienY = parseInt($("#alien").css("top"));
        var alienX = parseInt($("#alien").css("left"));

        if (ufoHelicopterDamaged.length > 0) {
            heart--;
            helicopterDamage();
        }
        if (helicopterDamaged.length > 0) {
            speed = speed + 0.3;
            helicopterDamage();
        }
        if (saveAlien.length > 0) {
            saveAlienAnimation(alienY, alienX);
            $("#alien").remove();
        }
        if (hurtAlien.length > 0 && saveAlien.length == 0) {
            alienDamage(alienX, alienY);
            $("#alien").remove();
            repositionAlien();
        }
    }

    /*
     * Animação da abdução do alien amigo
     */
    function saveAlienAnimation(alienY, alienX) {
        gameDiv.append("<div id='warp-alien' class='warp-alien-animation'></div");
        $("#warp-alien").css("top", alienY);
        $("#warp-alien").css("left", alienX);
        var laserX = parseInt($("#laser").css("left")) + 15;
        var laserY = parseInt($("#laser").css("top"));

        $("#warp-alien").animate({
            "top": laserY + "px",
            "left": laserX + "px"
        }, 1300);

        setTimeout(function() {
            $("#warp-alien").fadeOut();
            setTimeout(function() {
                $("#warp-alien").remove();
                rescueSound.play();
                rescued++;
                repositionAlien();
            }, 300);
        }, 1300);

    }

    /*
     * Reposiciona o alien amigo no jogo
     */
    function helicopterDamage() {
        points = points + 100;

        helicopterX = parseInt($("#helicopter").css("left"));
        helicopterY = parseInt($("#helicopter").css("top"));
        explodeHelicopter(helicopterX, helicopterY);

        positionY = parseInt(Math.random() * 334);
        $("#helicopter").css("left", 694);
        $("#helicopter").css("top", positionY);
    }

    /*
     * Animação de explosão do helicoptero
     */
    function explodeHelicopter(x, y) {
        explosionSound.play();
        $("#shot").css("left", 950);

        gameDiv.append("<div id='explosion' class='explosion-animation'></div");
        var explosionDiv = $(".explosion-animation");
        explosionDiv.css("top", y);
        explosionDiv.css("left", x);
        explosionDiv.animate({ opacity: 0 }, "slow");

        var explosionTime = window.setInterval(removeExplosion, 1000);

        function removeExplosion() {
            explosionDiv.remove();
            window.clearInterval(explosionTime);
            explosionTime = null;
        }

    }

    /*
     * Reposiciona o alien amigo no jogo
     */
    function repositionAlien() {
        var timeAlien = window.setInterval(reposition, 6000);

        function reposition() {
            window.clearInterval(timeAlien);
            timeAlien = null;
            if (end == false) {
                $("#alien").remove();
                gameDiv.append("<div id='alien' class='alien-animation'></div>");
            }
        }
    }

    /*
     * Função de animação e contabilização da morte do alien amigo
     */
    function alienDamage(alienX, alienY) {
        lostSound.play();
        lost++;
        gameDiv.append("<div id='hurt-alien' class='hurt-alien-animation'></div");
        $("#hurt-alien").css("top", alienY);
        $("#hurt-alien").css("left", alienX);
        var time = window.setInterval(reset, 1000);

        function reset() {
            $("#hurt-alien").remove();
            window.clearInterval(time);
            time = null;
        }
    }

    /*
     * Altera a exibição da pontuação do jogador
     */
    function score() {
        $("#score").html("<h2> Pontos: <span>" + points + "</span> Salvos: <span>" + rescued + "</span> Perdidos: <span>" + lost + "</span></h2>");

    }

    /*
     * Altera a exibição da quantidade de vida
     */
    function setHeart() {
        if (heart == 3) {
            $("#heart").css("background-image", "url(resources/images/heart-3.png)");
        } else if (heart == 2) {
            $("#heart").css("background-image", "url(resources/images/heart-2.png)");
        } else if (heart == 1) {
            $("#heart").css("background-image", "url(resources/images/heart-1.png)");
        } else if (heart == 0) {
            $("#heart").css("background-image", "url(resources/images/heart-0.png)");
            gameOver();
        }

    }

    /*
     * Pausa a execução do jogo e remove elementos visiveis, exibindo o menu de fim de jogo
     */
    function gameOver() {
        end = true;
        backgroundSound.pause();
        gameOverSound.play();

        window.clearInterval(game.timer);
        game.timer = null;

        $("#ufo").remove();
        $("#helicopter").remove();
        $("#truck").remove();
        $("#alien").remove();
        $("#heart").remove();

        gameDiv.append("<div id='end' class='content-layer'></div>");

        $("#end").html("<h1> Game Over </h1><p>Sua pontuação foi: " + points + "</p>" + "<div id='restart' onClick=restart()><h2>Jogar Novamente</h2></div>");
    }
}
$("#start").on("click", start);

/*
 * Função que reinicia o jogo
 */
function restart() {
    gameOverSound.pause();
    $("#score").remove();
    $("#end").remove();
    start();
}