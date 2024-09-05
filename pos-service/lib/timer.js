let intervalId;

const startNTimesPerMinute = (n, callback) => {
    console.log(`startNTimesPerMinute ${n} per minute`);
    const interval = 60000 / n; // Calculate interval in milliseconds
    intervalId = setInterval(callback, interval);
}

const stopNTimesPerMinute = () => {
    if (intervalId) {
        console.log('stopNTimesPerMinute');
        clearInterval(intervalId);
    }
}

export { startNTimesPerMinute, stopNTimesPerMinute };

