/**
 * Display module for Lemonade Stand
 *
 * Handles all DOM updates and rendering.
 * In the browser, this creates a global `Display` object.
 */

const Display = (function() {
  /**
   * Render the menu items to the DOM
   */
  function renderMenu() {
    const container = document.getElementById('menu-items');
    const items = Menu.getAllItems();

    container.innerHTML = items.map(item => `
      <div class="menu-item" data-id="${item.id}">
        <div class="menu-item-info">
          <h3>${item.name}</h3>
          <p class="description">${item.description}</p>
          <p class="price">$${item.price.toFixed(2)}</p>
        </div>
        <button class="add-to-order" data-id="${item.id}" aria-label="Add ${item.name} to order">+</button>
      </div>
    `).join('');
  }

  /**
   * Render the current order to the DOM
   */
  function renderOrder() {
    const container = document.getElementById('order-items');
    const summaryContainer = document.getElementById('order-summary');
    const actionsContainer = document.getElementById('order-actions');
    const items = Order.getItems();

    if (items.length === 0) {
      container.innerHTML = '<p class="empty-order">No items yet. Add something from the menu!</p>';
      summaryContainer.classList.add('hidden');
      actionsContainer.classList.add('hidden');
      return;
    }

    // Render order items
    container.innerHTML = items.map(item => `
      <div class="order-item" data-id="${item.id}">
        <div class="order-item-details">
          <span class="order-item-name">${item.name}</span>
          <span class="order-item-price">$${item.price.toFixed(2)} each</span>
        </div>
        <div class="order-item-controls">
          <button class="decrease-quantity" data-id="${item.id}" aria-label="Remove one ${item.name}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="increase-quantity" data-id="${item.id}" aria-label="Add one ${item.name}">+</button>
        </div>
        <span class="order-item-subtotal">$${item.subtotal.toFixed(2)}</span>
      </div>
    `).join('');

    // Render summary
    const totals = Order.calculateTotal();

    let summaryHTML = `
      <div class="summary-line">
        <span>Subtotal</span>
        <span>$${totals.subtotal.toFixed(2)}</span>
      </div>
    `;

    if (totals.discountApplied) {
      summaryHTML += `
        <div class="summary-line discount">
          <span>Discount (${totals.discountPercent}% off)</span>
          <span>-$${totals.discount.toFixed(2)}</span>
        </div>
      `;
    } else if (totals.subtotal > 0) {
      const remaining = totals.discountThreshold - totals.subtotal;
      summaryHTML += `
        <div class="summary-line" style="color: #999; font-size: 0.9rem;">
          <span>Add $${remaining.toFixed(2)} more for ${totals.discountPercent}% off!</span>
        </div>
      `;
    }

    summaryHTML += `
      <div class="summary-line total">
        <span>Total</span>
        <span>$${totals.total.toFixed(2)}</span>
      </div>
    `;

    summaryContainer.innerHTML = summaryHTML;
    summaryContainer.classList.remove('hidden');
    actionsContainer.classList.remove('hidden');
  }

  /**
   * Show a confirmation message
   * @param {string} message - The message to show
   */
  function showConfirmation(message) {
    alert(message);
  }

  /**
   * Format a receipt for display
   * @returns {string} - Formatted receipt text
   */
  function formatReceipt() {
    const items = Order.getItems();
    const totals = Order.calculateTotal();
    const orderNumber = Date.now().toString().slice(-6);

    let receipt = `=== ORDER #${orderNumber} ===\n\n`;

    items.forEach(item => {
      receipt += `${item.name} x${item.quantity}: $${item.subtotal.toFixed(2)}\n`;
    });

    receipt += `\n`;
    receipt += `Subtotal: $${totals.subtotal.toFixed(2)}\n`;

    if (totals.discountApplied) {
      receipt += `Discount (${totals.discountPercent}%): -$${totals.discount.toFixed(2)}\n`;
    }

    receipt += `Total: $${totals.total.toFixed(2)}\n`;
    receipt += `\nThank you for your order!`;

    return receipt;
  }

  // Public API
  return {
    renderMenu,
    renderOrder,
    showConfirmation,
    formatReceipt
  };
})();
