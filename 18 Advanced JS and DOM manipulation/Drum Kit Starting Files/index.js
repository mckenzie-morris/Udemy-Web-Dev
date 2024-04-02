var buttonsArr = document.querySelectorAll('.drum');

for (let i = 0; i < buttonsArr.length; i += 1) {
  buttonsArr[i].addEventListener('click', function () {
    var whichButton = this.textContent;
    makeSound(whichButton);
  });
}

document.addEventListener('keydown', function (event) {
  var whichKey = event.key;
  makeSound(whichKey);
});

function makeSound(key) {
  switch (key) {
    case 'w':
      var crashSound = new Audio('./sounds/crash.mp3');
      crashSound.play();
      break;
    case 'a':
      var kickSound = new Audio('./sounds/kick-bass.mp3');
      kickSound.play();
      break;
    case 's':
      var snareSound = new Audio('./sounds/snare.mp3');
      snareSound.play();
      break;
    case 'd':
      var tomOneSound = new Audio('./sounds/tom-1.mp3');
      tomOneSound.play();
      break;
    case 'j':
      var tomTwoSound = new Audio('./sounds/tom-2.mp3');
      tomTwoSound.play();
      break;
    case 'k':
      var tomThreeSound = new Audio('./sounds/tom-3.mp3');
      tomThreeSound.play();
      break;
    case 'l':
      var tomFourSound = new Audio('./sounds/tom-4.mp3');
      tomFourSound.play();
      break;
  }
}
