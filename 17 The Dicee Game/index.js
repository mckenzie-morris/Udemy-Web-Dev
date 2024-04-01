var randomNumber1 = Math.ceil(Math.random() * 6);
var diceVar = 'dice' + randomNumber1;
document
  .querySelector('.img1')
  .setAttribute('src', './images/' + diceVar + '.png');

var randomNumber2 = Math.ceil(Math.random() * 6);
var diceVarTwo = 'dice' + randomNumber2;
document
  .querySelector('.img2')
  .setAttribute('src', './images/' + diceVarTwo + '.png');

var headerVar;
if (randomNumber1 === randomNumber2) {
  headerVar = 'Draw!';
} else if (randomNumber1 > randomNumber2) {
  headerVar = '🚩 Player 1 Wins!';
} else if (randomNumber1 < randomNumber2) {
  headerVar = 'Player 2 Wins! 🚩';
}

document.querySelector('#header').textContent = headerVar;
