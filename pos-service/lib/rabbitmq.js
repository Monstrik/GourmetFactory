import {Connection} from 'rabbitmq-client'

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
let pub;
let messageQueue = [];
let connectionIsOk = false;
const queue = 'orders';

async function connectToRabbitMQ() {
    console.log('RabbitMQ:'+ RABBITMQ_URL)
    const rabbit = new Connection(RABBITMQ_URL)

    rabbit.on('error', (err) => {
        console.error('RabbitMQ connection error', err)
        connectionIsOk = false;
        console.log('RabbitMQ no connection  wait for reconnect\n')
    })
    rabbit.on('connection', () => {
        console.log('Connection successfully (re)established\n');
        rabbit.queueDeclare({ queue: queue, durable: true });
        connectionIsOk = true;
    })

    pub = rabbit.createPublisher({
        // Enable publish confirmations, similar to consumer acknowledgements
        confirm: true,
        // Enable retries
        maxAttempts: 2,
        // Optionally ensure the existence of an exchange before we use it
        // exchanges: [{exchange: 'my-events', type: 'topic'}]
        queues: {
            queue: queue,
            durable: true
        }
    })
}


function addMessageToQueue(message) {
    messageQueue.push(message);
    console.log('Message added to local queue:', messageQueue.length);
    processMessageQueue();
}


async function processMessageQueue() {
    if (connectionIsOk) {
        console.log(`Connection ok sending ${messageQueue.length} messages`);
        while (messageQueue.length > 0) {
            const message = messageQueue.shift();
            // await pub.send({exchange: 'my-events-events', routingKey: 'users.visit'}, message)
            await pub.send(queue, message);
            console.log('Message sent:',  JSON.stringify(message).slice(0, 80));
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







//
// function stopMessageProcessing() {
//     console.log('Stopping message processing due to channel closure');
//     setTimeout(() => {
//         if (channel && channel.connection && channel.connection.connectionState !== 'closing') {
//             console.log('Resuming message processing');
//             processMessageQueue();
//         } else {
//             stopMessageProcessing(); // Recheck after a delay
//         }
//     }, RETRY_INTERVAL);
// }


export { connectToRabbitMQ, addMessageToQueue };
