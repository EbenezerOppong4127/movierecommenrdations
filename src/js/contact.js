import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

// Function to initialize the mobile menu toggle functionality
function initializeMobileNavToggler() {
  const mobileNavToggler = document.querySelector('.mobile-nav-toggler');
  const closeBtn = document.querySelector('.close-btn'); // Select the close button

  if (mobileNavToggler) {
    console.log('Mobile nav toggler found. Adding click event listener.');
    mobileNavToggler.addEventListener('click', function () {
      console.log('Mobile menu toggle clicked');
      document.body.classList.add('mobile-menu-visible');
    });
  } else {
    console.error('Mobile nav toggler not found. Ensure the header is loaded.');
  }

  if (closeBtn) {
    console.log('Close button found. Adding click event listener.');
    closeBtn.addEventListener('click', function () {
      console.log('Close button clicked');
      document.body.classList.remove('mobile-menu-visible');
    });
  } else {
    console.error('Close button not found. Ensure the header is loaded.');
  }
}

// Function to check if data exists in localStorage and populate the form if it does
function populateFormData() {
  const formData = JSON.parse(localStorage.getItem('contactFormData'));

  if (formData) {
    const form = document.querySelector('.contact-form form');
    form.querySelector('input[placeholder="You Name *"]').value = formData.name || '';
    form.querySelector('input[placeholder="You  Email *"]').value = formData.email || '';
    form.querySelector('input[placeholder="Subject *"]').value = formData.subject || '';
    form.querySelector('textarea[name="message"]').value = formData.message || '';
  }
}

// Form validation function
function validateForm() {
  const form = document.querySelector('.contact-form form');
  const nameInput = form.querySelector('input[placeholder="You Name *"]');
  const emailInput = form.querySelector('input[placeholder="You  Email *"]');
  const subjectInput = form.querySelector('input[placeholder="Subject *"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let isValid = true;
  let errorMessage = '';

  // Check if fields are not empty
  if (!nameInput.value.trim()) {
    errorMessage += 'Please enter your name.\n';
    isValid = false;
  }

  if (!emailInput.value.trim()) {
    errorMessage += 'Please enter your email.\n';
    isValid = false;
  } else if (!emailRegex.test(emailInput.value.trim())) {
    errorMessage += 'Please enter a valid email.\n';
    isValid = false;
  }

  if (!subjectInput.value.trim()) {
    errorMessage += 'Please enter a subject.\n';
    isValid = false;
  }

  if (!messageInput.value.trim()) {
    errorMessage += 'Please enter your message.\n';
    isValid = false;
  }

  // Show alert if there's an error
  if (!isValid) {
    alert(errorMessage);
  }

  return isValid;
}

// Store form data in localStorage
function storeFormData() {
  const form = document.querySelector('.contact-form form');
  const name = form.querySelector('input[placeholder="You Name *"]').value;
  const email = form.querySelector('input[placeholder="You  Email *"]').value;
  const subject = form.querySelector('input[placeholder="Subject *"]').value;
  const message = form.querySelector('textarea[name="message"]').value;

  // Save form data to localStorage
  const formData = { name, email, subject, message };
  localStorage.setItem('contactFormData', JSON.stringify(formData));
  alert('Your message has been saved!');
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  if (validateForm()) {
    storeFormData();
  }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', async function () {
  await loadHeaderFooter();
  initializeMobileNavToggler();

  // Populate form with data from localStorage if it exists
  populateFormData();

  // Add event listener for form submission
  const form = document.querySelector('.contact-form form');
  form.addEventListener('submit', handleFormSubmit);
});
