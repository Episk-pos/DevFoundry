import { WebSocketServer } from 'ws';

let wss;

export function initWebSocket(server) {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('close', () => console.log('Client disconnected'));
    
    // Welcome message
    ws.send(JSON.stringify({ type: 'system', content: 'Connected to real-time chat' }));
  });

  return wss;
}

/**
 * Broadcasts a message to all connected clients.
 */
export function broadcast(data) {
  if (!wss) return;

  const payload = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // 1 = OPEN
      client.send(payload);
    }
  });
}
