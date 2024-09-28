'use strict';



/**
 * add Event on elements
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header & back top btn show when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 80) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

/* 
hero sessition
*/
const words = document.querySelectorAll('.words span');
let currentIndex = 0;

function changeText() {
  // Remove current class from the current text
  words[currentIndex].classList.remove('current');

  // Calculate the next index (looping back to the first item)
  currentIndex = (currentIndex + 1) % words.length;

  // Add current class to the next text
  words[currentIndex].classList.add('current');

  // Update the background and text color
  document.documentElement.style.setProperty('--color-bg', words[currentIndex].getAttribute('data-bg-color'));
  document.documentElement.style.setProperty('--color', words[currentIndex].getAttribute('data-color'));
}

// Change text every 2 seconds
setInterval(changeText, 2000);

// images slide 

const track = document.querySelector('.slider-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#prev');

let currentvalue = 0;
let autoSlideInterval;

// Function to update slide position
function updateSlidePosition() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const moveAmount = currentvalue * (slideWidth + 30); // 30px is the margin between slides
    track.style.transform = `translateX(-${moveAmount}px)`;
}

// Next button click handler
nextButton.addEventListener('click', () => {
    stopAutoSlide();
    currentvalue++;
    if (currentvalue >= slides.length) {
        currentvalue = 0;
    }
    updateSlidePosition();
});

// Previous button click handler
prevButton.addEventListener('click', () => {
    stopAutoSlide();
    currentvalue--;
    if (currentvalue < 0) {
        currentvalue = slides.length - 1;
    }
    updateSlidePosition();
});

// Automatic slide function
function autoSlide() {
    autoSlideInterval = setInterval(() => {
        currentvalue++;
        if (currentvalue >= slides.length) {
            currentvalue = 0;
        }
        updateSlidePosition();
    }, 3000); // Changes slide every 3 seconds
}

// Stop automatic slide when a button is clicked
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Start the automatic sliding
autoSlide();