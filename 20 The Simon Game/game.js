const gamePattern = [];
const userClickedPattern = [];
let gameLevel = 1;
let userClickIdx = 0;
let clickEnabled = true;
const buttonColors = ['red', 'blue', 'green', 'yellow'];

// generate a random color, push the color to the game pattern, and increment the game level
const nextColor = () => {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  buttonAnimation(randomChosenColor);
  buttonSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
  $('h1').text(`Level ${gameLevel}`);
  console.log(gamePattern);
};

// initiate the game
$(document).on('keypress', () => {
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

const gameOver = () => {
  $('h1').text('Game Over, Press Any Key to Restart');
  gameLevel = 0;
  gamePattern.length = 0;
  userClickedPattern.length = 0;
};

// check user's pattern against generated pattern
const checkFunc = (clickIdx) => {
  if (userClickedPattern[clickIdx] !== gamePattern[clickIdx]) {
    return gameOver();
  }
  userClickIdx += 1;
  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(nextColor, 1000);
    clickEnabled = false;
    const switchClickToggle = () => {
      clickEnabled = true;
    };
    setTimeout(switchClickToggle, 1100);
    gameLevel += 1;
    userClickIdx = 0;
    userClickedPattern.length = 0;
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
