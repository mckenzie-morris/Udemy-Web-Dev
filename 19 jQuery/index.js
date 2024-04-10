// invoke jQuery with $() or jQuery()

// retrieve the value for the given CSS property by passing in a single arg to the CSS method
$('h1').css('color');

// change the value for the given CSS property by passing in two args to the CSS method (the property, the value)
$('h1').css('color', 'green');

// Best practice is to keep seperate styles (CSS) from behavior (JavaScript). One way (see: styles.css)
$('h2').addClass('big-title');

// Add multiple classes in the same line of code:
$('h3').addClass('big-title  margin-50');

// Check if an element has a particular class (will return false in below example):
$('h1').hasClass('big-title');

// Using jQuery to select an element will select ALL elements that match the given selector. Below will change ALL buttons:
$('button').text("Don't click");

// Can also affect HTML using jQuery's html method (keep in mind seperation of concerns principle, though) AND select by id:
$('#last').html('<em>DO click<em>');

// retrieve the classes of an element:
$('h3').attr('class');

// Add and set an attribute of an element:
$('a').attr('href', 'https://www.yahoo.com/');

// Add an event listener with jQuery:
$('h2').click(() => {
  alert('Clickaroo!');
});

// Add an event listener (keypress) to the input element, and console.log the the key that was pressed. Note: The input parameter name is arbitrary
$('input').keypress((event) => {
  console.log(event.key);
});

// Same as above, but now any keypress will be logged so long as the webpage is the active page. 'body' instead of document will produce the same result
$(document).keypress((event) => {
  console.log(event.key);
});

// Challenge: whenever a key is pressed, show it in the h4 element
$('body').keypress((keyPressEvent) => {
  $('h4').text(keyPressEvent.key);
});

// The following three code blocks demonstrate the .on method, a streamlined event handling method
$('h5').on('mouseover', () => {
  $('h5').css('color', 'aquamarine');
});

$('h5').on('mouseleave', () => {
  $('h5').css('color', 'red');
});

$('h5').on('click', () => {
  $('h5').css('color', 'yellowgreen');
});

// Add an html element before a given element
$('h1').before('<p>A paragraph added before a given element</p>');

// Add an html element after a given element
$('h1').after('<p>A paragraph added after a given element</p>');

// Prepend an html element to a given element (nests the element into the given element, placed before)
$('h1').prepend('<p>A paragraph prepended to a given element</p>');

// Append an html element to a given element (nests the element into the given element, placed after)
$('h1').append('<p>A paragraph appended to a given element</p>');

// jQuery has animations available. code below will add a button after the h3 element (with a corresponding id attribute), and fade-out, then fade-in the h3 with each click
$('h2').after('<button id="fadeButton">Fade In/Fade Out</button>');

$('#fadeButton').on('click', () => {
  $('h2').fadeToggle();
});

// The animate method allows you to define custom CSS. the property must be wrapped in curl braces, and can ONLY be a property with numeric/'unit' values
$('h3').after('<button id="fadeButtonTwo">Increase opacity animation</button>');

// opacity is reduced to .25, margin is increased by 20%, and both are done over a 3000ms interval
$('#fadeButtonTwo').on('click', () => {
  $('h3').animate({ opacity: 0.25, margin: '20%' }, 3000);
});

$('#fadeButtonTwo').after(
  '<button id="chainedMethodsButton">chained Methods Button</button>'
);

// Multiple methods can be chained together, and will execute sequentially
// The h3 will slide up, then slide down, then opacity is increased to full and margin is decreased to 0% simultaneously
$('#chainedMethodsButton').on('click', () => {
  $('h3').slideUp().slideDown().animate({ opacity: 1, margin: '0%' });
});
