/**
 * (2C) = Two of Clubs (Trebloles)
 * (2D) = Two of Diamonds (Diamantes)
 * (2H) = Two of Hearts (Corazones)
 * (2S) = Two of Spades (Espadas)
 **/

let deck            = [];
let playerDeck      = [];
let computerDeck    = [];
let cardType        = ['C', 'D', 'H', 'S'];
let highCard        = ['A', 'J', 'Q', 'K'];
let playerPoints    = 0;
let computerPoints  = 0;
let isHumanPlaying  = true;

const btnNewGame  = document.querySelector('#btn-newgame');
const btnGetCard  = document.querySelector('#btn-getcard');
const btnStop     = document.querySelector('#btn-stop');
const txtPlayerScore = document.querySelector('#player-score');
const txtComputerScore = document.querySelector('#computer-score');
const cardsPlayer = document.querySelector('#player-cards');
const cardsComputer = document.querySelector('#computer-cards');

// Invoca la baraja y crea la referencia a esta llenando la variable 'deck' declarada arriba.
const doNewDeck = () => {
    
    for( let i = 2; i <= 10; i++ ) {
        for ( let type of cardType ) {
            deck.push( i + type);
        }
    }

    for ( let high of highCard) {
        for (let type of cardType ) {
            deck.push( high + type )
        }
    }
}

// Retorna la ultima carta del arreglo y lo elimina de este.
const getCardFromDeck = () => {
    // TODO Cambiar 'NoCard' por el manejador de errores.
    return deck.length === 0 ? 'NoCard' : deck.pop();;
}

// Calcular el valor segun string
const getCardValue = ( card ) => {
    const value = card.substring( 0, card.length - 1 );
    // Verifica si el valor no es un numero, si lo es:
        // Verifica si es una A, si lo es retorna 11, si no, 10.
    // Si es un numero, retorna el valor multiplicado a 1 (por que java script lo dice).
    return isNaN(value) ? ( value === 'A' ? 11 : 10 ) : value * 1;
    
}

const giveCard = ( participantArray, card, wichContainer ) => {
    const imgCard = document.createElement('img');
    participantArray.push( card );

    imgCard.src = `./assets/deck/${ card }.png`;
    imgCard.classList.add('card');

    wichContainer.append(imgCard);
}
const updateScore = (participantScore, card, wichContainer) => {
    this.participantScore = participantScore + getCardValue(card);
    wichContainer.innerText = this.participantScore;
    return this.participantScore;
}


// Turno de la computadora
const computerDoTurn = ( minPoints ) => {
    let whoWin;
    do {
        const card = getCardFromDeck();
        computerPoints = updateScore(computerPoints, card, txtComputerScore);
        giveCard(computerDeck, card, cardsComputer)

    } while ( (computerPoints < minPoints) && (minPoints <= 21) );
    whoWin = getWinner();
    console.log(whoWin);
} 

const playGame = () => {
    // doNewDeck();
    // deck = _.shuffle(deck);
    

    for (let i = 0; i < 2; i++) {


    }

}
doNewDeck();
deck = _.shuffle(deck);

const getWinner = () => {
    // Esto solo funciona si son 2 jugadores, se necesitan modificaciones para funcionar con más
    let playersScoreArr = [{ "entity": "player", "score": playerPoints }, { "entity": "computer", "score": computerPoints }];
    playerScoreArr = playersScoreArr.sort();
    console.table(playersScoreArr)
    return playersScoreArr[1].score === playersScoreArr[0].score ? 'draw' : playersScoreArr[1].score <= 21 ? playersScoreArr[1].entity : playersScoreArr[0].entity;
}

//// Eventos
btnGetCard.addEventListener('click', () => {
    const card = getCardFromDeck();

    playerPoints = updateScore(playerPoints, card, txtPlayerScore);
    // playerPoints +=  getCardValue(card);
    // txtPlayerScore.innerText = playerPoints;
    console.log(playerPoints, card);

    // cardsPlayer.append(imgCard);

    giveCard(playerDeck, card, cardsPlayer);


    if ( playerPoints > 21 ) {
        console.warn(' Ya perdiste.')
        btnGetCard.disabled = true;
        btnStop.disabled    = true;
        isHumanPlaying = false;                 /// Pensado para despues.
        computerDoTurn(playerPoints);
    } else if ( playerPoints === 21 ){
        console.warn('Llegaste a 21.')
        btnGetCard.disabled = true;
        btnStop.disabled    = true;
        isHumanPlaying = false;                 /// Pensado para despues.
        computerDoTurn(playerPoints);
    }
});

btnStop.addEventListener('click', () => {
    //TODO Agregar box de confirmacion.
    btnGetCard.disabled = true;
    btnStop.disabled    = true;
    isHumanPlaying      = false;                 /// Pensado para despues.
    computerDoTurn(playerPoints);
});
