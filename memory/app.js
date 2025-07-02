const cardArray = [
    { name: 'cheeseburger', img: 'images/cheeseburger.png' },
    { name: 'fries', img: 'images/fries.png' },
    { name: 'hotdog', img: 'images/hotdog.png' },
    { name: 'ice-cream', img: 'images/ice-cream.png' },
    { name: 'milkshake', img: 'images/milkshake.png' },
    { name: 'pizza', img: 'images/pizza.png' },
    { name: 'cheeseburger', img: 'images/cheeseburger.png' },
    { name: 'fries', img: 'images/fries.png' },
    { name: 'hotdog', img: 'images/hotdog.png' },
    { name: 'ice-cream', img: 'images/ice-cream.png' },
    { name: 'milkshake', img: 'images/milkshake.png' },
    { name: 'pizza', img: 'images/pizza.png' }
];

cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');
const messageDisplay = document.querySelector('#message');
const timerDisplay = document.querySelector('#timer');

let cardChosen = [];
let cardChosenIds = [];
const cardWon = [];
let timeLeft = 60;
let countdown;

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        gridDisplay.append(card);
    }
}

function startTimer() {
    timerDisplay.textContent = `${timeLeft}s`;
    countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            endGame(false);
        }
    }, 1000);
}

function checkMatch() {
    const cards = document.querySelectorAll('#grid img');
    const [optionOneId, optionTwoId] = cardChosenIds;

    if (optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.png');
    } else if (cardChosen[0] === cardChosen[1]) {
        cards[optionOneId].setAttribute('src', 'images/white.png');
        cards[optionTwoId].setAttribute('src', 'images/white.png');
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardWon.push(cardChosen);
    } else {
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
    }

    cardChosen = [];
    cardChosenIds = [];

    resultDisplay.textContent = cardWon.length;

    if (cardWon.length === cardArray.length / 2) {
        clearInterval(countdown);
        endGame(true);
    }
}

function flipCard() {
    const cardId = this.getAttribute('data-id');
    if (cardChosenIds.includes(cardId)) return;
    if (cardChosen.length >= 2) return;

    cardChosen.push(cardArray[cardId].name);
    cardChosenIds.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);

    if (cardChosen.length === 2) {
        setTimeout(checkMatch, 800);
    }
}

function endGame(won) {
    const cards = document.querySelectorAll('#grid img');
    cards.forEach(card => card.removeEventListener('click', flipCard));

    if (won) {
        messageDisplay.textContent = '🎉 You win! All matches found!';
    } else {
        messageDisplay.textContent = '⏰ Game Over! Time ran out.';
    }

    messageDisplay.style.opacity = '1';
}

createBoard();
startTimer();
