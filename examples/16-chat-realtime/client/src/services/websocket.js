const WS_URL = 'ws://localhost:3001';

export function connectWebSocket(onMessage) {
  const socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    console.log('Connected to WebSocket server');
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    onMessage(message);
  };

  socket.onclose = () => {
    console.log('Disconnected from WebSocket server. Retrying in 3s...');
    setTimeout(() => connectWebSocket(onMessage), 3000);
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  return socket;
}
