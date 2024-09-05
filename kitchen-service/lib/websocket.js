const WebSocket = require('ws');

function setupWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Client connected');

        ws.on('message', (message) => {
            console.log('Received:', message);
        });

        setInterval(() => {
            const event = { type: 'order', data: { id: Date.now(), item: 'Pizza', quantity: 1 } };
            ws.send(JSON.stringify(event));
        }, 60000 / ordersPerMinute);
    });
}

module.exports = { setupWebSocket };
