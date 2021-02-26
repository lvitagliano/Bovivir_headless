const visa = '/images/visa.png';
const amex = '/images/amex.png';
const master = '/images/master.png';
const cabal = '/images/cabal.png';
const naranja = '/images/naranja.png';
const nativa = '/images/nativa.png';
const defaultImage = '/images/default.png';

const cardTypesMock = [
  {
    type: 'amex',
    startPattern: /^3[47]/,
    image: amex,
    guid: '9a71cefd-3fb9-e111-ab17-00155d066504',
    length: 15
  },
  {
    type: 'nativa',
    startPattern: /^5465{0-9}{0,}$/,
    image: nativa,
    guid: 'b471cefd-3fb9-e111-ab17-00155d066504',
    length: 16
  },
  {
    type: 'mastercard',
    startPattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
    image: master,
    guid: '9c71cefd-3fb9-e111-ab17-00155d066504',
    length: 16
  },
  {
    type: 'visa',
    startPattern: /^4/,
    image: visa,
    guid: '9e71cefd-3fb9-e111-ab17-00155d066504',
    length: 16
  },
  {
    type: 'naranja',
    startPattern: /^5895[0-9]{0,}$/,
    image: naranja,
    guid: '9871cefd-3fb9-e111-ab17-00155d066504',
    length: 16
  },
  {
    type: 'cabal',
    startPattern: /^5896[0-9]{0,}$/,
    image: cabal,
    guid: 'a271cefd-3fb9-e111-ab17-00155d066504',
    length: 16
  }
];

const defaultCard = {
  type: 'default',
  image: defaultImage,
  guid: '',
  length: 16
};

const getCardTypeByValue = value => {
  const cardTypesFilter = cardTypesMock.filter(cardType =>
    cardType.startPattern.test(value)
  );

  return cardTypesFilter.length > 0 ? cardTypesFilter[0] : defaultCard;
};

const isAcceptedCardMock = (card, acceptedCards) =>
  card.type !== defaultCard.type &&
  acceptedCards.some(acceptedCard => acceptedCard.issuerId === card.guid);

export { getCardTypeByValue, isAcceptedCardMock, defaultCard };
