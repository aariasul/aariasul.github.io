const carouselImages = document.querySelectorAll('.carousel-container img');
let currentIndex = 0;
let intervalId;

// Function to show current image and hide others
function showImage(index) {
    carouselImages.forEach((img, i) => {
        if (i === index) {
            img.style.opacity = '1';
            img.style.transform = 'translateX(0)';
        } else {
            img.style.opacity = '0';
            img.style.transform = 'translateX(100%)';
        }
    });
}

// Start the carousel autoplay
function startCarousel() {
    intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % carouselImages.length;
        showImage(currentIndex);
    }, 2000); // Change every 2 seconds
}

// Pause carousel on mouseover
document.querySelector('.carousel').addEventListener('mouseover', () => {
    clearInterval(intervalId);
});

// Resume carousel on mouseout
document.querySelector('.carousel').addEventListener('mouseout', () => {
    startCarousel();
});

// Initialize the carousel
showImage(currentIndex);
startCarousel();
