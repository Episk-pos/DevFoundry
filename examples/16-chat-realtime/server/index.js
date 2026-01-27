import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import messageRoutes from './routes/messages.js';
import { initWebSocket } from './services/websocket.js';

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/messages', messageRoutes);

// Initialize WebSocket
initWebSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Fullstack Real-time Server running on http://localhost:${PORT}`);
});
