import express from 'express';
import {addMessageToQueue, connectToRabbitMQ} from "./lib/rabbitmq.js";

const app = express();
const port = 3002;



app.listen(port, () => {
    console.log(`Kitchen service running on port ${port}`);
});

const orderReceived = (order)=> {
    console.log('Received order:', order);
    // Simulate order preparation
    setTimeout(() => {
        const kitchenEvent = {...order, prepared: new Date()};
        addMessageToQueue(kitchenEvent);
        console.log('Order prepared:', kitchenEvent);
    }, order.prepTime * 1000); // Simulate preparation time
}

await connectToRabbitMQ(orderReceived);
