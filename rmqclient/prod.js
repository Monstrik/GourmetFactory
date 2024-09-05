import {Connection} from 'rabbitmq-client'
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Initialize:
const rabbit = new Connection('amqp://guest:guest@localhost:5672')
// const rabbit = new Connection('amqp://localhost')
rabbit.on('error', (err) => {
    // console.log('RabbitMQ connection error', err)
    console.log('RabbitMQ connection error wait for reconnect\n')
})
rabbit.on('connection', () => {
    console.log('Connection successfully (re)established\n');
    prompt();
})


// Declare a publisher
// See API docs for all options


const prompt = async () => {
    rl.question('Enter any text msg/loop/exit: \n', async (command) => {

        if (command.toLowerCase() === 'exit') {
            console.log('Exiting...');
            rl.close();
            process.exit(0);
        } else if (command.toLowerCase() === 'loop'){
            setInterval(async ()=>{
                // Publish a message to a custom exchange
                const now = new Date();
                const shortDate = now.toLocaleDateString();
                const shortTime = now.toLocaleTimeString();

                await pub.send(
                    {exchange: 'my-events', routingKey: 'users.visit'}, // metadata
                    {
                        id: 1,
                        name: 'Alan Turing',
                        msg: `${shortDate} ${shortTime}`
                    }) // message content
            },1000)
        }
            else {
            console.log(`Published: ${command}`);
            // Process other commands here

            // Publish a message to a custom exchange
            await pub.send(
                {exchange: 'my-events', routingKey: 'users.visit'}, // metadata
                {id: 1, name: 'Alan Turing', msg: command }) // message content

                // // Or publish directly to a queue
                // await pub.send('user-events', {id: 1, name: 'Alan Turing'})
            prompt(); // Call prompt again to continue the loop
        }
    });
};





// Clean up when you receive a shutdown signal
async function onShutdown() {
    // Waits for pending confirmations and closes the underlying Channel
    await pub.close()
    // Stop consuming. Wait for any pending message handlers to settle.
    await rabbit.close()
}
process.on('SIGINT', onShutdown)
process.on('SIGTERM', onShutdown)
