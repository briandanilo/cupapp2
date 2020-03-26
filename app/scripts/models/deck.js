let StartingDeck = [];

const Suits = {
  0: {suit: 'Hearts', suitShort: 'H', suitDisplay: '♥', suitColor: 'red'},
  1: {suit: 'Diamonds', suitShort: 'D', suitDisplay: '♦️', suitColor: 'red'},
  2: {suit: 'Clubs', suitShort: 'C', suitDisplay: '♣️', suitColor: 'black'},
  3: {suit: 'Spades', suitShort: 'S', suitDisplay: '♠', suitColor: 'black'},
};

const Ranks = {
  0: {rank: '2'},
  1: {rank: '3'},
  2: {rank: '4'},
  3: {rank: '5'},
  4: {rank: '6'},
  5: {rank: '7'},
  6: {rank: '8'},
  7: {rank: '9'},
  8: {rank: '10'},
  9: {rank: 'J'},
  10: {rank: 'Q'},
  11: {rank: 'K'},
  12: {rank: 'A'}
};

for (let rank = 0; rank < 13; rank++) {
  for (let suit = 0; suit < 4; suit++){
    StartingDeck.push({ suit, rank});
  }
}


export {StartingDeck, Suits, Ranks};