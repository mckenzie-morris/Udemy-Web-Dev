// invoke jQuery with $() or jQuery()
$('h1').css('color', 'red');
$('button').click(function () {
  $('h1').css('color', 'purple');
});
$('input').keypress(function (event) {
  console.log(event.key);
});
