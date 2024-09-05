// const amqp = require('amqplib/callback_api');
//
// let channel = null;
// const orderQueue = 'orders';
// const fridgeQueue = 'fridge';
//
//
// const rabbitmqUrl = 'amqp://rabbitmq';
// const retryInterval = 5000; // Retry interval in milliseconds
//
// function connectRabbitMQ(orderReceived) {
//     amqp.connect(rabbitmqUrl, (error0, connection) => {
//         if (error0) {
//             console.error('Failed to connect to RabbitMQ, retrying in 5 seconds...', error0);
//             setTimeout(connectRabbitMQ, retryInterval);
//             return;
//         }
//         connection.createChannel((error1, ch) => {
//             if (error1) {
//                 console.error('Failed to create RabbitMQ channel, retrying in 5 seconds...', error1);
//                 setTimeout(connectRabbitMQ, retryInterval);
//                 return;
//             }
//             channel = ch;
//             channel.assertQueue(orderQueue, {durable: false});
//             channel.assertQueue(fridgeQueue, {durable: false});
//             console.log('Connected to RabbitMQ and channel created');
//
//             // Consume messages from the 'orders' queue
//             channel.consume(orderQueue, (msg) => {
//                 const order = JSON.parse(msg.content.toString());
//                 orderReceived(order);
//             }, { noAck: true });
//         });
//
//         connection.on('error', (err) => {
//             console.error('RabbitMQ connection error:', err);
//             setTimeout(connectRabbitMQ, retryInterval);
//         });
//
//         connection.on('close', () => {
//             console.error('RabbitMQ connection closed, retrying in 5 seconds...');
//             channel = null; // Reset channel to null
//             setTimeout(connectRabbitMQ, retryInterval);
//         });
//
//     });
// }
//
// function sendToQueue(queue, order) {
//     if (channel) {
//         try {
//             channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)));
//             console.log(" [x] Sent %s", order);
//         } catch (error) {
//             console.error("Failed to send message, retrying in 5 seconds...", error);
//             setTimeout(() => sendToQueue(order), retryInterval);
//         }
//     } else {
//         console.error("Channel is not initialized. Retrying in 5 seconds...");
//         setTimeout(() => sendToQueue(order), retryInterval);
//     }
// }
//
// module.exports = { connectRabbitMQ, sendToQueue };
//
// // const amqp = require('amqplib/callback_api');
// //
// // // RabbitMQ setup
// // const rabbitmqUrl = 'amqp://rabbitmq';
// // let channel = null;
// //
// // function connectRabbitMQ(orderReceived) {
// //     amqp.connect(rabbitmqUrl, (error0, connection) => {
// //         if (error0) {
// //             throw error0;
// //         }
// //         connection.createChannel((error1, ch) => {
// //             if (error1) {
// //                 throw error1;
// //             }
// //             channel = ch;
// //             channel.assertQueue('orders', { durable: false });
// //             channel.assertQueue('fridge', { durable: false });
// //
// //
// //             // Consume messages from the 'orders' queue
// //             channel.consume('orders', (msg) => {
// //                 const order = JSON.parse(msg.content.toString());
// //                 orderReceived(order);
// //             }, { noAck: true });
// //         });
// //     });
// // }
// //
// // function sendToQueue(queue,order) {
// //     if (channel) {
// //         channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)));
// //         console.log(" [x] Sent %s", order);
// //     } else {
// //         console.error("Channel is not initialized. Call connectRabbitMQ first.");
// //     }
// // }
// //
// // module.exports = { connectRabbitMQ, sendToQueue };
// //
// //
// //
