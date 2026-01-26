---
sidebar_position: 4
title: "Stage 4: Fullstack App"
description: "Adding an Express backend with database persistence to the Chat App"
---

# Stage 4: Fullstack App

**Adding an Express backend with database persistence to the Chat App**

---

## Learning Objectives

By the end of this stage, you will:

- Build an Express.js API server
- Design RESTful API endpoints
- Use SQLite for data persistence
- Connect React frontend to backend API
- Understand client-server architecture
- Handle errors across the stack

**Time**: 5-6 hours (reading + building)

---

## Introduction

Through Stages 1-3, all data lived in the browser. Refresh the page in a new browser? Data is gone. Two users can't see the same orders.

Stage 4 changes everything:

- **Server** handles business logic and data
- **Database** persists orders permanently
- **API** connects frontend to backend
- **Client** becomes a thin presentation layer

This is **real web application architecture**.

---

## Architecture Overview

### Before (Client-Only)

```
┌─────────────────────────────────────────────┐
│ Browser                                     │
│ ┌─────────────────────────────────────────┐ │
│ │ React App                               │ │
│ │ • UI Components                         │ │
│ │ • Business Logic                        │ │
│ │ • Data Storage (localStorage)           │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### After (Client-Server)

```
┌─────────────────────────────────────────────┐
│ Browser                                     │
│ ┌─────────────────────────────────────────┐ │
│ │ React App                               │ │
│ │ • UI Components                         │ │
│ │ • API Calls                             │ │
│ └─────────────────────────────────────────┘ │
└────────────────────┬────────────────────────┘
                     │ HTTP (REST API)
                     ▼
┌─────────────────────────────────────────────┐
│ Server                                      │
│ ┌─────────────────────────────────────────┐ │
│ │ Express.js                              │ │
│ │ • API Routes                            │ │
│ │ • Business Logic                        │ │
│ │ • Validation                            │ │
│ └─────────────────────────────────────────┘ │
│                    │                        │
│                    ▼                        │
│ ┌─────────────────────────────────────────┐ │
│ │ SQLite Database                         │ │
│ │ • Orders                                │ │
│ │ • Menu Items (optional)                 │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

---

## Project Structure

```
lemonade-fullstack/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── api/               # NEW: API client
│   │   │   └── orders.js
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
├── server/                    # Express backend
│   ├── src/
│   │   ├── routes/
│   │   │   └── orders.js
│   │   ├── db/
│   │   │   ├── index.js
│   │   │   └── schema.sql
│   │   └── index.js
│   ├── package.json
│   └── data/                  # SQLite database file
│       └── lemonade.db
│
├── package.json               # Root package.json
└── README.md
```

---

## Part 1: Express Server Setup

### Initialize Server

```bash
mkdir -p server/src/routes server/src/db server/data
cd server
npm init -y
npm install express cors better-sqlite3
npm install -D nodemon
```

### Server Entry Point

Create `server/src/index.js`:

```javascript
const express = require('express');
const cors = require('cors');
const ordersRouter = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/orders', ordersRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### Package Scripts

Update `server/package.json`:

```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
```

---

## Part 2: Database Setup

### Schema Design

Create `server/src/db/schema.sql`:

```sql
-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    total REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    item_id TEXT NOT NULL,
    item_name TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
```

### Database Module

Create `server/src/db/index.js`:

```javascript
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Ensure data directory exists
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize database
const db = new Database(path.join(dataDir, 'lemonade.db'));

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Run schema
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema);

// Prepared statements for orders
const createOrder = db.prepare(`
  INSERT INTO orders (customer_name, customer_email, total)
  VALUES (@customerName, @customerEmail, @total)
`);

const createOrderItem = db.prepare(`
  INSERT INTO order_items (order_id, item_id, item_name, price, quantity)
  VALUES (@orderId, @itemId, @itemName, @price, @quantity)
`);

const getOrderById = db.prepare(`
  SELECT * FROM orders WHERE id = ?
`);

const getOrderItems = db.prepare(`
  SELECT * FROM order_items WHERE order_id = ?
`);

const getAllOrders = db.prepare(`
  SELECT * FROM orders ORDER BY created_at DESC LIMIT 50
`);

const updateOrderStatus = db.prepare(`
  UPDATE orders SET status = ? WHERE id = ?
`);

// Transaction for creating order with items
const insertOrder = db.transaction((orderData) => {
  const { customerName, customerEmail, total, items } = orderData;

  // Insert order
  const result = createOrder.run({ customerName, customerEmail, total });
  const orderId = result.lastInsertRowid;

  // Insert items
  for (const item of items) {
    createOrderItem.run({
      orderId,
      itemId: item.itemId,
      itemName: item.itemName,
      price: item.price,
      quantity: item.quantity
    });
  }

  return orderId;
});

module.exports = {
  db,
  insertOrder,
  getOrderById,
  getOrderItems,
  getAllOrders,
  updateOrderStatus
};
```

---

## Part 3: API Routes

### REST API Design

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/orders | List recent orders |
| GET | /api/orders/:id | Get order details |
| POST | /api/orders | Create new order |
| PATCH | /api/orders/:id | Update order status |

### Orders Router

Create `server/src/routes/orders.js`:

```javascript
const express = require('express');
const {
  insertOrder,
  getOrderById,
  getOrderItems,
  getAllOrders,
  updateOrderStatus
} = require('../db');

const router = express.Router();

// Menu items (could also be in database)
const menuItems = [
  { id: 'classic', name: 'Classic Lemonade', price: 2.50 },
  { id: 'strawberry', name: 'Strawberry Lemonade', price: 3.50 },
  { id: 'mint', name: 'Mint Lemonade', price: 3.00 }
];

// GET /api/orders - List orders
router.get('/', (req, res) => {
  try {
    const orders = getAllOrders.all();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /api/orders/:id - Get single order
router.get('/:id', (req, res) => {
  try {
    const order = getOrderById.get(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const items = getOrderItems.all(order.id);
    res.json({ ...order, items });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// POST /api/orders - Create order
router.post('/', (req, res) => {
  try {
    const { customerName, customerEmail, items } = req.body;

    // Validation
    if (!customerName || !customerEmail || !items?.length) {
      return res.status(400).json({
        error: 'Missing required fields: customerName, customerEmail, items'
      });
    }

    // Validate and enrich items
    const enrichedItems = items.map(item => {
      const menuItem = menuItems.find(m => m.id === item.itemId);
      if (!menuItem) {
        throw new Error(`Invalid item: ${item.itemId}`);
      }
      return {
        itemId: item.itemId,
        itemName: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity
      };
    });

    // Calculate total
    const total = enrichedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Insert order
    const orderId = insertOrder({
      customerName,
      customerEmail,
      total,
      items: enrichedItems
    });

    // Return created order
    const order = getOrderById.get(orderId);
    const orderItems = getOrderItems.all(orderId);

    res.status(201).json({
      ...order,
      items: orderItems
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ error: error.message });
  }
});

// PATCH /api/orders/:id - Update order status
router.patch('/:id', (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'preparing', 'ready', 'completed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const order = getOrderById.get(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    updateOrderStatus.run(status, req.params.id);

    const updated = getOrderById.get(req.params.id);
    res.json(updated);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

module.exports = router;
```

---

## Part 4: Frontend API Client

### API Module

Create `client/src/api/orders.js`:

```javascript
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export async function createOrder(orderData) {
  const response = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create order');
  }

  return response.json();
}

export async function getOrder(orderId) {
  const response = await fetch(`${API_BASE}/orders/${orderId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch order');
  }

  return response.json();
}

export async function getOrders() {
  const response = await fetch(`${API_BASE}/orders`);

  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }

  return response.json();
}
```

### Updated Context

Update the OrderContext to use the API:

```jsx
// In OrderContext.jsx - update completeOrder

const completeOrder = async () => {
  const { customerName, customerEmail, items } = order;

  try {
    const result = await createOrder({
      customerName,
      customerEmail,
      items: items.map(item => ({
        itemId: item.itemId,
        quantity: item.quantity
      }))
    });

    return result;
  } catch (error) {
    showNotification('error', error.message);
    throw error;
  }
};
```

### Updated CheckoutForm

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  setIsSubmitting(true);
  setCustomerInfo(formData.name, formData.email);

  try {
    // Now actually calls the API
    const result = await completeOrder();
    navigate(`/confirmation/${result.id}`);
  } catch (error) {
    // Error already shown via notification
    setIsSubmitting(false);
  }
};
```

### Updated Confirmation Page

```jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOrder } from '../api/orders';

export default function ConfirmationPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const data = await getOrder(orderId);
        setOrder(data);
      } catch (err) {
        setError('Could not load order details');
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!order) return <div className="error">Order not found</div>;

  return (
    <main className="confirmation-page">
      <div className="confirmation-content">
        <div className="success-icon">✓</div>
        <h1>Order Confirmed!</h1>
        <p>Thank you, {order.customer_name}!</p>
        <p className="order-number">Order #{order.id}</p>

        <div className="order-summary-final">
          {order.items.map(item => (
            <div key={item.id} className="summary-item">
              {item.item_name} × {item.quantity}
            </div>
          ))}
          <div className="summary-total">
            Total: ${order.total.toFixed(2)}
          </div>
        </div>

        <Link to="/" className="primary">Start New Order</Link>
      </div>
    </main>
  );
}
```

---

## Part 5: Development Workflow

### Running Both Servers

Option 1: Two terminals
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

Option 2: Concurrently (add to root package.json)
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev --prefix server\" \"npm run dev --prefix client\""
  }
}
```

### Vite Proxy (Optional)

Configure `client/vite.config.js` to proxy API requests:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
});
```

Then remove the base URL from API calls.

---

## Part 6: Error Handling

### Server-Side Errors

```javascript
// In routes/orders.js
router.post('/', async (req, res, next) => {
  try {
    // ... order creation logic
  } catch (error) {
    next(error); // Pass to error handler
  }
});

// In index.js - error handler middleware
app.use((err, req, res, next) => {
  console.error(err);

  // Don't leak internal errors to client
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500
    ? 'Internal server error'
    : err.message;

  res.status(statusCode).json({ error: message });
});
```

### Client-Side Error Handling

```jsx
// In API client
export async function createOrder(orderData) {
  try {
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || `HTTP ${response.status}`);
    }

    return response.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      // Network error
      throw new Error('Unable to connect to server');
    }
    throw error;
  }
}
```

---

## Exercise 1: Add Menu Endpoint

Create an API endpoint to fetch menu items:

1. Add `GET /api/menu` route
2. Move menu data to server
3. Update frontend to fetch menu on load

<details>
<summary>Solution</summary>

```javascript
// server/src/routes/menu.js
const express = require('express');
const router = express.Router();

const menuItems = [
  { id: 'classic', name: 'Classic Lemonade', description: 'Fresh squeezed', price: 2.50, emoji: '🍋' },
  { id: 'strawberry', name: 'Strawberry Lemonade', description: 'With fresh strawberries', price: 3.50, emoji: '🍓' },
  { id: 'mint', name: 'Mint Lemonade', description: 'Cool and refreshing', price: 3.00, emoji: '🌿' }
];

router.get('/', (req, res) => {
  res.json(menuItems);
});

module.exports = router;
```

</details>

---

## Exercise 2: Add Order History Page

Create a page showing recent orders:

1. Add `OrderHistoryPage` component
2. Add route `/orders`
3. Fetch and display recent orders
4. Link to order details

---

## Exercise 3: Input Validation

Add proper server-side validation:

1. Validate email format
2. Validate name length
3. Validate item quantities (positive integers)
4. Return helpful error messages

---

## Exercise 4: Loading States

Add loading states to the frontend:

1. Show spinner while fetching menu
2. Show spinner while submitting order
3. Handle slow network gracefully
4. Add retry button on failure

---

## Key Takeaways

1. **Separation of concerns** — Client handles UI, server handles data

2. **REST conventions** — GET reads, POST creates, PATCH updates

3. **Database transactions** — Atomic operations for data integrity

4. **Error handling everywhere** — Server, client, and network

5. **Environment variables** — Configure without code changes

6. **SQLite for simplicity** — No server setup, file-based storage

---

## What's Next

**[Stage 5: Deployed App](deployed-app)**

You'll learn:
- Deploying to production hosting
- Environment configuration
- CI/CD pipelines
- Production considerations

---

**You've completed Stage 4!** You now have a real fullstack application with persistent data. Stage 5 puts it on the internet.
