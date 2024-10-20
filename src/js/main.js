import { loadHeaderFooter  } from './utils.mjs';

loadHeaderFooter();


// Function to initialize the mobile menu toggle functionality
function initializeMobileNavToggler() {
  const mobileNavToggler = document.querySelector('.mobile-nav-toggler');
  const closeBtn = document.querySelector('.close-btn'); // Select the close button

  if (mobileNavToggler) {
    console.log('Mobile nav toggler found. Adding click event listener.');
    mobileNavToggler.addEventListener('click', function () {
      console.log('Mobile menu toggle clicked');

      // Toggle the 'mobile-menu-visible' class on the <body> element
      document.body.classList.add('mobile-menu-visible');
    });
  } else {
    console.error('Mobile nav toggler not found. Ensure the header is loaded.');
  }

  if (closeBtn) {
    console.log('Close button found. Adding click event listener.');
    closeBtn.addEventListener('click', function () {
      console.log('Close button clicked');

      // Remove the 'mobile-menu-visible' class from the <body> element
      document.body.classList.remove('mobile-menu-visible');
    });
  } else {
    console.error('Close button not found. Ensure the header is loaded.');
  }
}

// Ensure the DOM is loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', async function () {
  // Wait for header/footer to be loaded dynamically
  await loadHeaderFooter();

  // After header/footer is loaded, initialize the mobile nav toggler functionality
  initializeMobileNavToggler();

});



// Function to detect if the user is on a mobile device
function isMobileDevice() {
  return window.innerWidth <= 768; // Adjust the width as per your mobile breakpoint
}

// Function to load navigation dynamically


// Ensure the DOM is loaded before attaching event listeners






