

// Constants for size configurations
const SIZE_CONFIG = {
  'XS': '200px',
  'S': '300px',
  'M': '400px',
  'L': '500px',
  'XL': '600px',
  'XXL': '700px'
};

// Default configurations
const DEFAULT_CONFIG = {
  color: '#4a90e2',
  size: 'M'
};

// Cache DOM elements
const boxes = document.querySelectorAll('.box-container');

/**
 * Toggles the expanded state of a box and collapses others
 * @param {HTMLElement} clickedBox - The box that was clicked
 */
function toggleBox(clickedBox) {
  const allContents = document.querySelectorAll('.box-content');
  allContents.forEach(content => {
    content.classList.toggle('expanded', content.parentElement === clickedBox);
  });
}

/**
 * Updates the active state of elements in a group
 * @param {HTMLElement} clickedElement - The element that was clicked
 * @param {NodeList} group - The group of elements to update
 */
function updateActiveState(clickedElement, group) {
  group.forEach(element => {
    element.classList.toggle('active', element === clickedElement);
  });
}

/**
 * Applies a color to a box
 * @param {HTMLElement} box - The box to apply the color to
 * @param {string} color - The color to apply
 */
function applyColor(box, color) {
  box.style.backgroundColor = color;
}

/**
 * Applies a size to a box
 * @param {HTMLElement} box - The box to apply the size to
 * @param {string} size - The size to apply
 */
function applySize(box, size) {
  box.style.width = SIZE_CONFIG[size] || SIZE_CONFIG[DEFAULT_CONFIG.size];
}

/**
 * Initializes boxes with default settings
 */
function initializeBoxes() {
  boxes.forEach(box => {
    // Set default color
    applyColor(box, DEFAULT_CONFIG.color);
    
    // Set default size
    applySize(box, DEFAULT_CONFIG.size);
    
    // Set default active state for size button
    const defaultSizeBtn = box.querySelector(`.size-btn[title="${DEFAULT_CONFIG.size === 'M' ? 'Medium' : DEFAULT_CONFIG.size}"]`);
    if (defaultSizeBtn) {
      defaultSizeBtn.classList.add('active');
    }
  });
}

/**
 * Sets up event listeners for box interactions
 */
function setupEventListeners() {
  // Handle box clicks for toggling content
  boxes.forEach(box => {
    box.addEventListener('click', () => toggleBox(box));
  });

  // Handle color dot clicks
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('color-dot')) {
      e.stopPropagation();
      const box = e.target.closest('.box-container');
      const color = e.target.style.backgroundColor;
      
      applyColor(box, color);
      updateActiveState(e.target, box.querySelectorAll('.color-dot'));
    }
  });

  // Handle size button clicks
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('size-btn')) {
      e.stopPropagation();
      const box = e.target.closest('.box-container');
      const size = e.target.textContent;
      
      updateActiveState(e.target, e.target.parentElement.querySelectorAll('.size-btn'));
      applySize(box, size);
    }
  });
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    initializeBoxes();
    setupEventListeners();
  } catch (error) {
    console.error('Failed to initialize:', error);
  }
}); 