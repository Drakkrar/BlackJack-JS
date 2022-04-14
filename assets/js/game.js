/**
 * (2C) = Two of Clubs (Trebloles)
 * (2D) = Two of Diamonds (Diamantes)
 * (2H) = Two of Hearts (Corazones)
 * (2S) = Two of Spades (Espadas)
 **/

let deck = [];
let cardType = ['C', 'D', 'H', 'S'];
let highCard = ['A', 'J', 'Q', 'K'];

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
const giveCard = () => {
    let takeCard;
    // TODO Cambiar 'NoCard' por el manejador de errores.
    takeCard = deck.length === 0 ? 'NoCard' : deck.pop();
    return takeCard;
}

const getCardValue = ( card ) => {
    const value = card.substring( 0, card.length - 1 );
    // Verifica si el valor no es un numero, si lo es:
        // Verifica si es una A, si lo es retorna 11, si no, 10.
    // Si es un numero, retorna el valor multiplicado a 1 (por que java script lo dice).
    return isNaN(value) ? ( value === 'A' ? 11 : 10 ) : value * 1;
    
}

doNewDeck();

