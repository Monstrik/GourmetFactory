import express from 'express';
import {getRandomItem} from "./lib/menu.js";
import {getRandomCustomer} from "./lib/customers.js";
import {addMessageToQueue, connectToRabbitMQ} from "./lib/rabbitmq.js";
import {startNTimesPerMinute, stopNTimesPerMinute} from "./lib/timer.js";

const app = express();
const port = 3001;
let ordersPerMinute = 12;
let orderId = 1;

app.get('/', (req, res) => {
    res.send('<hr>' +
        '<a href="/api/start">/api/start</a><br>' +
        '<a href="/api/stop">/api/stop</a><br>' +
        '<a href="/api/items/">/api/items/{number}</a><br>' +
        '<hr>');
});

app.get('/api/items/:ordersPerMinute', (req, res) => {
    if (req.params.ordersPerMinute) ordersPerMinute = parseInt(req.params.ordersPerMinute);
    stopNTimesPerMinute();
    startNTimesPerMinute(ordersPerMinute, createOrder);
    res.send(`Orders per minute set to ${ordersPerMinute}`);
});

app.get('/api/start', (req, res) => {
    stopNTimesPerMinute();
    startNTimesPerMinute(ordersPerMinute, createOrder);
    res.send(`Started...  Orders per minute set to ${ordersPerMinute}`);
});

app.get('/api/stop', (req, res) => {
    stopNTimesPerMinute();
    res.send(`Stopped`);
});


app.listen(port, () => {
    console.log(`POS Service is running on http://localhost:${port}`);
});


const createOrder = () => {
    const randomItem = getRandomItem();
    randomItem.id = orderId++;
    randomItem.delivery = getRandomCustomer();
    randomItem.created = new Date();
    console.log("New order created:");
    addMessageToQueue(randomItem)
}
await connectToRabbitMQ();


async function onShutdown() {
    console.log(`POS Service is stoped... created ${orderId - 1} orders`);
}
process.on('SIGINT', onShutdown)
process.on('SIGTERM', onShutdown)

// orders autostart
startNTimesPerMinute(ordersPerMinute, createOrder);
console.log(`Started...  Orders per minute set to ${ordersPerMinute}`)
setTimeout(stopNTimesPerMinute,60 * 60 * 1000);


