import express from 'express';
import {addMessageToQueue, connectToRabbitMQ} from "./lib/rabbitmq.js";

const app = express();
const port = 3002;
let orderInline = 0



app.listen(port, () => {
    console.log(`Kitchen service running on port ${port}`);
});

const orderReceived = (order)=> {
    console.log('Order Received:', order.id, order.delivery.name, order.name, order.created);
    orderInline++;
    // Simulate order preparation
    setTimeout(() => {
        const pOrder = {...order, prepared: new Date()};
        addMessageToQueue(pOrder);
        orderInline--;
        console.log('Order prepared:', pOrder.id, pOrder.delivery.name, pOrder.name, pOrder.created, pOrder.prepared);
        if (orderInline > 0) console.log('Orders in line:', orderInline);

    }, order.prepTime * 1000); // Simulate preparation time
}


await connectToRabbitMQ(orderReceived);

async function onShutdown() {
    console.log(`Kitchen Service is stoped... orderInline ${orderInline - 1}`);
}
process.on('SIGINT', onShutdown)
process.on('SIGTERM', onShutdown)