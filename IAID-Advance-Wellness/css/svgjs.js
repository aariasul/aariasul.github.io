const starRed = document.getElementById("star-red");
const starMagenta = document.getElementById("star-magenta");
const starYellow = document.getElementById("star-yellow");

let animationTimer;

/* start animation */

function startStars() {

starRed.classList.add("fade-red");
starMagenta.classList.add("fade-magenta");
starYellow.classList.add("fade-yellow");

}

/* stop animation */

function stopStars() {

starRed.classList.remove("fade-red");
starMagenta.classList.remove("fade-magenta");
starYellow.classList.remove("fade-yellow");

}

/* play animation */

function playAnimation(duration) {

clearTimeout(animationTimer);

startStars();

animationTimer = setTimeout(() => {

stopStars();

}, duration);

}

/* run on page load */

window.addEventListener("load", () => {

playAnimation(5000);

});

/* trigger on scroll */

let lastScroll = 0;

window.addEventListener("scroll", () => {

const currentScroll = window.scrollY;

if (Math.abs(currentScroll - lastScroll) > 20) {

playAnimation(3000);

lastScroll = currentScroll;

}

});