// Get the hamburger button and menu elements
var hamburger = document.querySelector('.hamburger');
var menu = document.querySelector('.nav-itemList');

// Add a click event listener to the hamburger button
hamburger.addEventListener('click', function() {
  // Toggle the 'menu-open' class on the menu element
  menu.classList.toggle('menu-open');
});

