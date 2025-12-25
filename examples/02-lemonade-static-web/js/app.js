/**
 * Main application module for Lemonade Stand
 *
 * Initializes the app and handles user interactions.
 * This is the entry point - it ties everything together.
 */

const App = (function() {
  /**
   * Set up event listeners for menu items
   */
  function setupMenuListeners() {
    const menuContainer = document.getElementById('menu-items');

    menuContainer.addEventListener('click', function(event) {
      // Check if clicked element is an add button
      if (event.target.classList.contains('add-to-order')) {
        const itemId = parseInt(event.target.dataset.id, 10);
        Order.addItem(itemId);
        Display.renderOrder();
      }
    });
  }

  /**
   * Set up event listeners for order items
   */
  function setupOrderListeners() {
    const orderContainer = document.getElementById('order-items');

    orderContainer.addEventListener('click', function(event) {
      const target = event.target;

      if (target.classList.contains('increase-quantity')) {
        const itemId = parseInt(target.dataset.id, 10);
        Order.addItem(itemId);
        Display.renderOrder();
      }

      if (target.classList.contains('decrease-quantity')) {
        const itemId = parseInt(target.dataset.id, 10);
        Order.removeItem(itemId);
        Display.renderOrder();
      }
    });
  }

  /**
   * Set up event listeners for action buttons
   */
  function setupActionListeners() {
    const actionsContainer = document.getElementById('order-actions');

    actionsContainer.addEventListener('click', function(event) {
      const target = event.target;

      if (target.id === 'place-order') {
        if (!Order.isEmpty()) {
          const receipt = Display.formatReceipt();
          Display.showConfirmation(receipt);
          Order.clear();
          Display.renderOrder();
        }
      }

      if (target.id === 'clear-order') {
        Order.clear();
        Display.renderOrder();
      }
    });
  }

  /**
   * Initialize the application
   */
  function init() {
    // Render initial state
    Display.renderMenu();
    Display.renderOrder();

    // Set up event listeners
    setupMenuListeners();
    setupOrderListeners();
    setupActionListeners();

    console.log('Lemonade Stand initialized!');
  }

  // Public API
  return {
    init
  };
})();

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', App.init);
