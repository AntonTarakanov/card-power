export const CARD_SUITS = {
    CLUBS: 'clubs',         // ♣️Трефы.
    DIAMONDS: 'diamonds',   // ♦️Бубны — diamonds.
    HEARTS: 'hearts',       // ♥️Червы — hearts.
    SPADES: 'spades',       // ♠️ Пики — spades.
};

export const NON_STANDARD_CARDS = {
    ACE: 'Ace',     // Туз ("A")
    KING: 'King',   // Король ("K")
    QUEEN: 'Queen', // Дама ("Q")
    JACK: 'Jack',   // Валет ("J")
};

export const STANDARD_CARDS_INFO = {
    START_POSITION: 2,
    END_POSITION: 10,
};

export const NON_STANDARD_CARDS_VALUE = {
    [NON_STANDARD_CARDS.ACE]: 14,
    [NON_STANDARD_CARDS.KING]: 13,
    [NON_STANDARD_CARDS.QUEEN]: 12,
    [NON_STANDARD_CARDS.JACK]: 11,
};