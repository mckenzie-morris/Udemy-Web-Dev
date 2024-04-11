const gamePattern = [];
const userClickedPattern = [];
const buttonColors = ['red', 'blue', 'green', 'yellow'];

const nextSequence = () => {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  return randomChosenColor;
};

$(document).on('keypress', () => {
  if (!gamePattern.length) {
    const output = nextSequence();
    gamePattern.push(output);
    buttonAnimation(output);
    buttonSound(output);
  }
});

$('.btn').on('click', (clickEvent) => {
  const userChosenColor = clickEvent.target.id;
  buttonClickedAnimation(userChosenColor);
  buttonSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
});

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
