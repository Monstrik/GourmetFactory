import {Connection} from 'rabbitmq-client'

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
let pub;
let sub;
let messageQueue = [];
let connectionIsOk = false;
const orderQueue = 'orders';
const fridgeQueue = 'fridge';

async function connectToRabbitMQ(msgReceived) {
    console.log('RabbitMQ:'+ RABBITMQ_URL)
    const rabbit = new Connection(RABBITMQ_URL)

    rabbit.on('error', (err) => {
        console.error('RabbitMQ connection error', err)
        connectionIsOk = false;
        console.log('RabbitMQ no connection  wait for reconnect\n')
    })
    rabbit.on('connection', () => {
        console.log('Connection successfully (re)established\n');
        connectionIsOk = true;
    })


    // Consume messages from a queue:
    sub = rabbit.createConsumer({
        queue: fridgeQueue,
        queueOptions: {durable: true},

        qos: {prefetchCount: 1},
        // // Optionally ensure an exchange exists
        // exchanges: [{exchange: 'my-events', type: 'topic'}],
        // // With a "topic" exchange, messages matching this pattern are routed to the queue
        // queueBindings: [{exchange: 'my-events', routingKey: 'users.*'}],
    }, async (msg) => {
        // console.log('received message', msg)
        msgReceived(msg.body);
        // The message is automatically acknowledged (BasicAck) when this function ends.
        // If this function throws an error, then msg is rejected (BasicNack) and
        // possibly requeued or sent to a dead-letter exchange. You can also return a
        // status code from this callback to control the ack/nack behavior
        // per-message.
    })

    sub.on('error', (err) => {
        // Maybe the consumer was cancelled, or the connection was reset before a message could be acknowledged.
        console.log('consumer error (user-events)', err)
    })




    pub = rabbit.createPublisher({
        // Enable publish confirmations, similar to consumer acknowledgements
        confirm: true,
        // Enable retries
        maxAttempts: 2,
        // Optionally ensure the existence of an exchange before we use it
        // exchanges: [{exchange: 'my-events', type: 'topic'}]
        queues: {
            queue: orderQueue,
            durable: true
        }
    })

}


async function addMessageToQueue(message) {
    messageQueue.push(message);
    console.log('Message added to local queue:', messageQueue.length, JSON.stringify(message));
    await processMessageQueue();
}


async function processMessageQueue() {
    if (connectionIsOk) {
        console.log(`Connection ok sending ${messageQueue.length} messages`);
        while (messageQueue.length > 0) {
            const message = messageQueue.shift();
            // await pub.send({exchange: 'my-events-events', routingKey: 'users.visit'}, message)
            await pub.send(orderQueue, message);
        }
    }
    else {
        console.log(`No Connection. waiting...`);
    }
}

// Clean up when you receive a shutdown signal
async function onShutdown() {
    // Waits for pending confirmations and closes the underlying Channel
    await pub.close()
    // Stop consuming. Wait for any pending message handlers to settle.
    await rabbit.close()
}
process.on('SIGINT', onShutdown)
process.on('SIGTERM', onShutdown)


export { connectToRabbitMQ, addMessageToQueue };
