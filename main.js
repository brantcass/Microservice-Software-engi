const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const timerDisplay = document.getElementById('timerDisplay');

startBtn.addEventListener('click', async () => {
    try {
        await axios.get('http://localhost:3001/start');
        timerDisplay.textContent = 'Timer started for workout.';
    } catch (error) {
        console.error('Error sending request', error.message);
        timerDisplay.textContent = 'Failed to start timer!';
    }
});

stopBtn.addEventListener('click', async () => {
    try {
        await axios.get('http://localhost:3001/stop');
        timerDisplay.textContent = 'Timer stopped.';
    } catch (error) {
        console.error('Error sending request', error.message);
        timerDisplay.textContent = 'Failed to stop timer!';
    }
});
