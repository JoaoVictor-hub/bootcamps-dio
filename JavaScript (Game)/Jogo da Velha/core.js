var player, winner = null;
var selectedPlayer = document.getElementById('player-selected');
var selectedWinner = document.getElementById('winner-selected');

changePlayer('X');

function choiceSquare(id) {
    if (winner !== null) {
        return;
    }

    var square = document.getElementById(id);
    if (square.innerHTML !== '-') {
        return;
    }

    square.innerHTML = player;
    square.style.color = '#fff';

    if (player === 'X') {
        player = 'O';
    } else {
        player = 'X';
    }

    changePlayer(player);
    verifyWinner();
}

function changePlayer(valor) {
    player = valor;
    selectedPlayer.innerHTML = player;
}

function verifyWinner() {
    var square1 = document.getElementById(1);
    var square2 = document.getElementById(2);
    var square3 = document.getElementById(3);
    var square4 = document.getElementById(4);
    var square5 = document.getElementById(5);
    var square6 = document.getElementById(6);
    var square7 = document.getElementById(7);
    var square8 = document.getElementById(8);
    var square9 = document.getElementById(9);

    if (verifySeq(square1, square2, square3)) {
        changeSquareColor(square1, square2, square3);
        changeWinner(square1);
        return;
    }

    if (verifySeq(square4, square5, square6)) {
        changeSquareColor(square4, square5, square6);
        changeWinner(square4);
        return;
    }

    if (verifySeq(square7, square8, square9)) {
        changeSquareColor(square7, square8, square9);
        changeWinner(square7);
        return;
    }

    if (verifySeq(square1, square4, square7)) {
        changeSquareColor(square1, square4, square7);
        changeWinner(square1);
        return;
    }

    if (verifySeq(square2, square5, square8)) {
        changeSquareColor(square2, square5, square8);
        changeWinner(square2);
        return;
    }

    if (verifySeq(square3, square6, square9)) {
        changeSquareColor(square3, square6, square9);
        changeWinner(square3);
        return;
    }

    if (verifySeq(square1, square5, square9)) {
        changeSquareColor(square1, square5, square9);
        changeWinner(square1);
        return;
    }

    if (verifySeq(square3, square5, square7)) {
        changeSquareColor(square3, square5, square7);
        changeWinner(square3);
    }
}

function changeWinner(square) {
    winner = square.innerHTML;
    selectedWinner.innerHTML = winner;
}

function changeSquareColor(square1, square2, square3) {
    square1.style.background = '#62d56f';
    square2.style.background = '#62d56f';
    square3.style.background = '#62d56f';
}

function verifySeq(square1, square2, square3) {
    var eq = false;

    if (square1.innerHTML !== '-' && square1.innerHTML === square2.innerHTML && square2.innerHTML === square3.innerHTML) {
        eq = true;
    }

    return eq;
}

function restart() {
    winner = null;
    selectedWinner.innerHTML = '';

    for (var i = 1; i <= 9; i++) {
        var square = document.getElementById(i);
        square.style.background = '#37322f';
        square.style.color = '#37322f';
        square.innerHTML = '-';
    }

    changePlayer('X');
}