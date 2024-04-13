const gamePattern = [];
const userClickedPattern = [];
const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gameLevel = 1;
let userClickIdx = 0;
let clickEnabled = true;

// generate a random color, push the color to the game pattern, and increment the game level
const nextColor = () => {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  buttonAnimation(randomChosenColor);
  buttonSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
  $('h1').text(`Level ${gameLevel}`);
  console.log(`gamePattern: ${gamePattern}`);
};

// reset the game or initiate the game
$(document).on('keypress', () => {
  if ($('h1').text() === 'Game Over, Press Any Key to Restart') {
    gameLevel += 1;
  }
  if (!gamePattern.length) {
    nextColor();
  }
});

// event handler for button click
$('.btn').on('click', (clickEvent) => {
  if (gamePattern.length && clickEnabled === true) {
    const userChosenColor = clickEvent.target.id;
    buttonClickedAnimation(userChosenColor);
    buttonSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    checkFunc(userClickIdx);
  }
});

// if user's sequence is incorrect, change header, reset game level, clear game pattern and user's pattern
const gameOver = () => {
  $('h1').text('Game Over, Press Any Key to Restart');
  gameLevel = 0;
  gamePattern.length = 0;
  userClickedPattern.length = 0;
  $('body').addClass('game-over');
  setTimeout(() => {
    $('body').removeClass('game-over');
  }, 200);
  const gameOverSound = new Audio('./sounds/wrong.mp3');
  gameOverSound.play();
};

// if user's sequence is correct, increment game level, reset click index, and clear user's pattern
const userSequenceCorrect = () => {
  setTimeout(nextColor, 1000);
  clickEnabled = false;
  setTimeout(() => {
    clickEnabled = true;
  }, 1500);
  gameLevel += 1;
  userClickIdx = 0;
  userClickedPattern.length = 0;
};

// check user's pattern against generated pattern
const checkFunc = (clickIdx) => {
  if (userClickedPattern[clickIdx] !== gamePattern[clickIdx]) {
    return gameOver();
  }
  userClickIdx += 1;
  if (userClickedPattern.length === gamePattern.length) {
    return userSequenceCorrect();
  }
};

// computer button animation function
const buttonAnimation = (whichColor) => {
  $(`#${whichColor}`).fadeOut().fadeIn();
};

// user button clicked animation
const buttonClickedAnimation = (whichColor) => {
  $(`#${whichColor}`).addClass('pressed');
  setTimeout(() => {
    $(`#${whichColor}`).removeClass('pressed');
  }, 100);
};

// button sound function
const buttonSound = (whichColor) => {
  const colorSound = new Audio(`./sounds/${whichColor}.mp3`);
  colorSound.play();
};
