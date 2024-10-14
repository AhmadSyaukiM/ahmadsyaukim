window.onscroll = function() {
  stickyNavbar();
  handleScrollEffect();
};

const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li a'); // Select anchor tags directly
const navbar = document.querySelector('nav'); // Get the navbar element
const sticky = navbar.offsetTop; // Get the initial navbar position
const Home = document.querySelector('#home'); // Select using the correct ID
const aboutImage = document.querySelector('.aboutimage'); // Select the about image element
const aboutSection = document.querySelector('#about'); // Select the about section
const aboutMove = document.querySelector('.aboutmove'); // Pilih elemen aboumove
const skillSection = document.querySelector('#skillanimation');

let lastScrollTop = 0; // Keep track of the last scroll position
let scrollPosition = window.pageYOffset; // Menyimpan posisi scroll saat ini
let scrollSmoothness = 0.1; // Atur kecepatan scroll (semakin kecil semakin lambat)

// Function to add or remove the sticky class
function stickyNavbar() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
}

// Function to handle scroll effect on Home
function handleScrollEffect() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    Home.classList.add('hidden'); // Home menghilang saat scrolling ke bawah
  } else {
    // Scrolling up
    Home.classList.remove('hidden'); // Home muncul lagi saat scrolling ke atas
  }

  lastScrollTop = scrollTop; // Update last scroll position
}

// Smooth scrolling and active link change
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default anchor click behavior
    const targetId = this.getAttribute('href'); // Get the target section ID

    // Scroll to the target section smoothly
    const targetSection = document.querySelector(targetId); // Find the section
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' }); // Use smooth scrolling
    }

    // Remove 'active' class from all links
    navLinks.forEach(link => link.classList.remove('active'));

    // Add 'active' class to the clicked link
    this.classList.add('active');

    // Close the nav menu when a link is clicked (for mobile view)
    if (nav.classList.contains('nav-active')) {
      nav.classList.remove('nav-active'); // Hide the nav
      burger.classList.remove('toggle'); // Remove the burger 'X' animation
    }
  });
});

// Handle the burger click event to toggle the mobile menu and animation
burger.addEventListener('click', () => {
  // Toggle Nav
  nav.classList.toggle('nav-active');

  // Animate Links
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = '';
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
    }
  });

  // Burger Animation
  burger.classList.toggle('toggle');
});

// IntersectionObserver for aboutimage animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // If the about image enters the viewport
      aboutImage.classList.add('fade-in'); // Add the fade-in class
      aboutImage.classList.remove('fade-out'); // Remove fade-out if it's present
    } else {
      // If the about image leaves the viewport
      aboutImage.classList.remove('fade-in'); // Remove fade-in
      aboutImage.classList.add('fade-out'); // Add the fade-out class for smooth hiding
    }
  });
}, { threshold: 0.5 }); // Trigger when 50% of the about section is in view

// Start observing the about section
observer.observe(aboutSection);

// IntersectionObserver for aboutMove animation (using unique class names)
const aboutMoveObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      aboutMove.classList.add('aboutmove-slide-in'); // Add unique slide-in class
      aboutMove.classList.remove('aboutmove-slide-out'); // Remove slide-out class if present
    } else {
      aboutMove.classList.remove('aboutmove-slide-in'); // Remove slide-in class if present
      aboutMove.classList.add('aboutmove-slide-out'); // Add unique slide-out class
    }
  });
}, { threshold: 0.5 }); // Trigger when 50% of the aboutMove is in view

// Start observing the aboutMove section
aboutMoveObserver.observe(aboutMove);

const carousel = document.querySelector('.carousel');
let currentIndex = 0; // Start at the first card
const totalItems = document.querySelectorAll('.carousel-item').length;
const itemWidth = 600; // Width of each item

// Function to move the carousel automatically
function autoMoveCarousel() {
    currentIndex = (currentIndex + 1) % totalItems; // Move to the next index, wrap around
    carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`; // Move to the current index
}

// Auto-slide every 1.5 seconds (1500 milliseconds)
let autoSlide = setInterval(autoMoveCarousel, 1500);

// Reset carousel on load to show the first item
carousel.style.transform = `translateX(0)`;

// Optional: Add transition for smooth movement
carousel.style.transition = 'transform 0.5s ease-in-out'; // Add transition for smoothness

// Function to handle smooth scrolling effect
function smoothScroll() {
  const currentScroll = window.pageYOffset; 
  scrollPosition += (currentScroll - scrollPosition) * scrollSmoothness; // Interpolasi posisi scroll
  
  window.scrollTo(0, scrollPosition); // Geser ke posisi scroll yang sudah dihitung
  requestAnimationFrame(smoothScroll); // Memanggil ulang fungsi ini untuk setiap frame
}

// Jalankan smooth scrolling
smoothScroll();

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Smooth scroll effect
  });
}

