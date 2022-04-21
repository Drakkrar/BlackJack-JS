/**
 * (2C) = Two of Clubs (Trebloles)
 * (2D) = Two of Diamonds (Diamantes)
 * (2H) = Two of Hearts (Corazones)
 * (2S) = Two of Spades (Espadas)
 **/

(() => {
    'use strict'


    let deck            = [],
        playerDeck      = [],
        computerDeck    = [];
    const cardType        = ['C', 'D', 'H', 'S'],
          highCard        = ['A', 'J', 'Q', 'K'];
    let playerPoints    = 0,
        computerPoints  = 0;

    // Referencias HTML
    const btnNewGame  = document.querySelector('#btn-newgame'),
          btnGetCard  = document.querySelector('#btn-getcard'),
          btnStop     = document.querySelector('#btn-stop'),
          txtPlayerScore = document.querySelector('#player-score'),
          txtComputerScore = document.querySelector('#computer-score'),
          cardsPlayer = document.querySelector('#player-cards'),
          cardsComputer = document.querySelector('#computer-cards');

    // Invoca la baraja y crea la referencia a esta llenando la variable 'deck' declarada arriba.
    const doNewDeck = () => {
        if (deck.length !== 0) {
            deck = [];
        }

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
        deck = _.shuffle(deck);
    }

    // Retorna la ultima carta del arreglo y lo elimina de este.
    const getCardFromDeck = () => {
        // TODO Cambiar 'NoCard' por el manejador de errores.
        return deck.length === 0 ? 'NoCard' : deck.pop();
    }

    // Calcular el valor segun string
    const getCardValue = ( card ) => {
        const value = card.substring( 0, card.length - 1 );
        // Verifica si el valor no es un numero, si lo es:
            // Verifica si es una A, si lo es retorna 11, si no, 10.
        // Si es un numero, retorna el valor multiplicado a 1 (por que java script lo dice).
        return isNaN(value) ? ( value === 'A' ? 11 : 10 ) : value * 1;
        
    }

    // Actualiza el valor del puntaje de la computadora/jugador
    const updateScore = (participantScore, card, wichContainer) => {
        this.participantScore = participantScore + getCardValue(card);
        wichContainer.innerText = this.participantScore;
        return this.participantScore;
    }

    // Entrega una carta y actualiza el DOM.
    const giveCard = ( participantArray, card, wichContainer ) => {
        const imgCard = document.createElement('img');
        participantArray.push( card );

        imgCard.src = `./assets/deck/${ card }.png`;
        imgCard.classList.add('card');

        wichContainer.append(imgCard);
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
    } 

    // Muestra quien es el ganador. Crea un array de un objeto con dos propiedades, ordena quien es el mayor y de esta manera sabe cual es el ganador.
    const getWinner = () => {
        // Esto solo funciona si son 2 jugadores, se necesitan modificaciones para funcionar con más
        let playersScoreArr = [{ "entity": "player", "score": playerPoints }, { "entity": "computer", "score": computerPoints }];
        playerScoreArr = playersScoreArr.sort();
        return playersScoreArr[1].score === playersScoreArr[0].score ? 'draw' : playersScoreArr[1].score <= 21 ? playersScoreArr[1].entity : playersScoreArr[0].entity;
    }

    const disablePlayButtons = () => {
        if (btnGetCard.disabled && btnStop.disabled){
            btnGetCard.disabled = false;
            btnStop.disabled    = false;
        }else {
            btnGetCard.disabled = true;
            btnStop.disabled    = true;
        }
    }

    //// Eventos
    btnGetCard.addEventListener('click', () => {
        const card = getCardFromDeck();
        
        playerPoints = updateScore(playerPoints, card, txtPlayerScore);
        giveCard(playerDeck, card, cardsPlayer);
        
        
        if ( playerPoints > 21 ) {
            disablePlayButtons();
            computerDoTurn(playerPoints);
        } else if ( playerPoints === 21 ){
            disablePlayButtons();
            computerDoTurn(playerPoints);
        }
    });

    btnStop.addEventListener('click', () => {
        //TODO Agregar box de confirmacion.
        disablePlayButtons();
        computerDoTurn(playerPoints);
    });

    btnNewGame.addEventListener('click', () => {
        //TODO agregar box de confirmacion.
        doNewDeck();
        deck = _.shuffle(deck);
        disablePlayButtons();
        playerPoints = 0;
        computerPoints = 0;
        txtPlayerScore.innerText = 0;
        txtComputerScore.innerText = 0;
        
        cardsPlayer.innerHTML = '';
        cardsComputer.innerHTML = '';
    });

    doNewDeck();

})();


