// Fetch the template HTML from the given file path
export async function loadTemplate(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Error fetching template from ${filePath}`);
    const html = await response.text();
    return html;
  } catch (error) {
    console.error(`Error loading template: ${error.message}`);
    return ''; // Return empty string to avoid further errors if the fetch fails
  }
}

// Insert the template into the specified DOM element
export function renderWithTemplate(template, element) {
  if (element) {
    element.innerHTML = template;
  } else {
    console.error('Target element not found for rendering template');
  }
}

// Function to load and render the header, main content, and footer
// Function to load and render the header, navigation, main content, and footer
export async function loadHeaderFooter() {
  // Fetch and render the <head> content (optional)
  const headElement = document.head;
  if (headElement) {
    const headTemplate = await loadTemplate('/components/head.html');
    renderWithTemplate(headTemplate, headElement);
  }

  // Fetch and render the header
  const headerElement = document.querySelector('#main-header');
  if (headerElement) {
    const headerTemplate = await loadTemplate('/components/header.html');
    renderWithTemplate(headerTemplate, headerElement);
  }

  // Fetch and render the navigation
  const navElement = document.querySelector('#desk-nav');
  if (navElement) {
    const navTemplate = await loadTemplate('/components/nav.html');
    renderWithTemplate(navTemplate, navElement);
  }

  // Fetch and render the main content
  const mainContentElement = document.querySelector('#main-content');
  if (mainContentElement) {
    const mainContentTemplate = await loadTemplate('/components/main_content.html');
    renderWithTemplate(mainContentTemplate, mainContentElement);
  }

  // Fetch and render the footer
  const footerElement = document.querySelector('#main-footer');
  if (footerElement) {
    const footerTemplate = await loadTemplate('/components/footer.html');
    renderWithTemplate(footerTemplate, footerElement);
  }

  async function loadNavigation() {
    // const deskNavElement = document.querySelector('#desk-nav');
    const mobileNavElement = document.querySelector('#mobile-nav');

    const navTemplate = await loadTemplate('/components/nav.html');

    if (isMobileDevice() && mobileNavElement) {
      console.log('Loading navigation for mobile');
      renderWithTemplate(navTemplate, mobileNavElement); // Load into mobile nav
    } else if (!isMobileDevice() && deskNavElement) {
      console.log('Loading navigation for desktop');
      renderWithTemplate(navTemplate, deskNavElement); // Load into desktop nav
    } else {
      console.error('Navigation elements not found');
    }
  }
}
